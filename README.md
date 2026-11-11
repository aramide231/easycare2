# EasyCare frontend

The read-only audit viewer is available at `/admin/audit` to staff with `audit.view`. It filters staff/security activity by action, outcome, source, actor/record IDs and UTC dates. Pagination retains the current history boundary; Refresh includes new activity. Reviewers can access this screen without staff-management permission. Run the backend migrations and seeder for the independent audit grant baseline before using it. Audit history does not display submitted credentials or personal profile values.

Private files are available at `/admin/files` to staff with `files.view_own`; uploading also requires `files.upload`. Each account sees only its own uploads, including administrators. The library accepts PDF/JPEG/PNG up to 10 MiB, shows scan status honestly, and downloads through an authenticated, integrity-checked endpoint. Files remain on the hospital server outside public storage. Run the backend migrations and seeder first. Current uploads are not virus-scanned; patient attachments and clinical access rules belong to their later workflows.

## Local staff sign-in

Start the Laravel backend in the sibling `backend` directory with `dev.cmd start`, then run `npm run dev` here and open the printed URL. The tracked development API base is `/api/v1`; Vite proxies it to the local backend on port 8000. Production hosting must route `/api/v1` to Laravel on the hospital server.

Create the first administrator through `dev.cmd artisan staff:create --role=admin` in the backend directory, using your own privately prompted password after running migrations and `db:seed`. No account or password is seeded. Authorized administrators manage staff at `/admin/users`: create/edit profiles, assign departments and roles, activate/deactivate accounts and issue one-use recovery codes. Saves require the administrator's current password. Version conflicts require reloading the latest record.

New accounts choose their first password through `/forgot-password`, using a code issued after administrator identity verification. Codes expire after 15 minutes, work once and are displayed only at issuance. Recovery works through the local server without an email provider. For sole-administrator recovery, the trusted server console provides `dev.cmd artisan staff:recover their-username`. The hospital must approve the identity-verification procedure before production use. Recovery revokes existing sessions; disabled accounts remain disabled.

Sign-in uses HTTP-only Laravel session cookies, CSRF protection and an in-memory identity store. Reload checks the server session; private routes require server-returned roles, and staff management requires `staff.manage` and audit review requires `audit.view`. Profile/module menus provide a staff-administration entry when permitted. Logout invalidates the server session before reloading sign-in. Local browser storage is not trusted as authentication. Clinical and patient screens still contain demonstration data and await their backend implementation.

Profiles display the current server staff record. Browser-only profile/password edits are removed; profile or access changes go through staff administration. Account, role, permission and department changes clear private forms, patient caches, pending requests and session-owned document URLs. Routine refreshes preserve same-account drafts. Other tabs recheck the server after sign-in, sign-out or recovery, and old browser-history patient state is discarded before rendering. Known legacy private storage keys are removed while unrelated preferences remain. Clinical screens still require their own backend workflows and patient isolation.

Run `npm test` for twenty-six frontend regression checks using Node's test runner and the installed TypeScript compiler. The checks include late old-account responses, stale `401` failures, writes waiting for CSRF, disabled storage, private caches object-URL revocation, and separate audit/staff-management access. No additional packages are required. Run `npm run typecheck` for the full repository TypeScript check. `npm run build` runs that check before creating production assets; strict checks remain enabled. Compiler caches stay in ignored `node_modules/.tmp/`.

Task 12 verification: eleven frontend tests and twenty-five browser checks pass, including multi-tab account changes, history isolation, expiry and staff administration/recovery. The production build passes.

Task 13 verification: twelve frontend tests and thirty-nine browser checks pass, including the audit viewer, reviewer-only access and permission revocation. The production build passes.

Task 14 verification: seventeen frontend tests and fifty-two browser checks pass, including real private-file uploads/downloads, byte comparison, ownership, read-only roles, permission revocation and mobile layouts. The production build passes.

TypeScript follow-up: all 125 previously reported errors have been resolved. Fixes cover stale copied-screen imports, navigation icon props, form component contracts, React effect cleanup, nullable medication prices, typed report rows and mock record IDs. Legacy registration-step URLs enter the state-owning registration wizard, and requisition calendars now filter the records. No new packages or relaxed compiler flags are required. Verification: zero TypeScript errors, twenty-one regression tests, fifteen browser checks with no page errors, and a passing production build.

## React + TypeScript + Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```


## Transaction-safe submissions

Staff saves, recovery-code issuance and private uploads send an `Idempotency-Key` for one intended submission. A lost connection, timeout, unreadable success response or server failure keeps the attempt in memory. Staff fields or the selected upload stay fixed while the user explicitly retries; the same key confirms a previously committed result without creating it again. Reauthentication passwords may be reentered without changing that identity. Responses must identify a valid saved resource before the UI reports success. No business write is automatically retried.

Recovery issuance returns its secret only once; a retry reports that it was already issued rather than redisplaying or replacing it. Reload the staff record and verify identity before deliberately issuing a replacement. Stale-version conflicts still require reloading the saved record.

Requests and CSRF bootstrap have a 30-second deadline. A timeout or browser cancellation cannot undo a server commit. Server `Retry-After` guidance appears in errors. A full page reload or access boundary clears pending keys and selections; inspect the saved staff/file list before starting another submission. Keys, files and drafts are never persisted in browser storage. New files/forms get new keys, so intentional duplicate-content uploads remain possible.

Run `npm test` for twenty-six frontend checks, including lost-response key preservation, access boundaries, multipart bytes, no automatic replay, malformed confirmations and retry guidance. Run `npm run build` for strict TypeScript checks followed by the production build. See the backend's [transaction and retry contract](https://github.com/TechProoo/easy_care_backend/blob/main/docs/LOCAL_DEVELOPMENT.md#transaction-and-retry-rules) for status codes, database guarantees and the limits of filesystem cleanup.
