# EasyCare frontend

## Local staff sign-in

Start the Laravel backend in the sibling `backend` directory with `dev.cmd start`, then run `npm run dev` here and open the printed URL. The tracked development API base is `/api/v1`; Vite proxies it to the local backend on port 8000. Production hosting must route `/api/v1` to Laravel on the hospital server.

Create the first administrator through `dev.cmd artisan staff:create --role=admin` in the backend directory, using your own privately prompted password after running migrations and `db:seed`. No account or password is seeded. Authorized administrators manage staff at `/admin/users`: create/edit profiles, assign departments and roles, activate/deactivate accounts and issue one-use recovery codes. Saves require the administrator's current password. Version conflicts require reloading the latest record.

New accounts choose their first password through `/forgot-password`, using a code issued after administrator identity verification. Codes expire after 15 minutes, work once and are displayed only at issuance. Recovery works through the local server without an email provider. For sole-administrator recovery, the trusted server console provides `dev.cmd artisan staff:recover their-username`. The hospital must approve the identity-verification procedure before production use. Recovery revokes existing sessions; disabled accounts remain disabled.

Sign-in uses HTTP-only Laravel session cookies, CSRF protection and an in-memory identity store. Reload checks the server session; private routes require server-returned roles, and administration requires `staff.manage`. Profile/module menus provide a staff-administration entry when permitted. Logout invalidates the server session before reloading sign-in. Local browser storage is not trusted as authentication. Clinical and patient screens still contain demonstration data and await their backend implementation.

Profiles display the current server staff record. Browser-only profile/password edits are removed; profile or access changes go through staff administration. Account, role, permission and department changes clear private forms, patient caches, pending requests and session-owned document URLs. Routine refreshes preserve same-account drafts. Other tabs recheck the server after sign-in, sign-out or recovery, and old browser-history patient state is discarded before rendering. Known legacy private storage keys are removed while unrelated preferences remain. Clinical screens still require their own backend workflows and patient isolation.

Run `npm test` for eleven session-isolation regression checks using Node's test runner and the installed TypeScript compiler. The checks include late old-account responses, stale `401` failures, writes waiting for CSRF, disabled storage, private caches and object-URL revocation. No additional packages are required. These tests run separately from the full repository type check.

Task 12 verification: eleven frontend tests and twenty-five browser checks pass, including multi-tab account changes, history isolation, expiry and staff administration/recovery. The production build passes. The full repository TypeScript check reports 125 remaining errors outside changed files; see the backend development notes for details.

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
