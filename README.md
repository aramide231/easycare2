# EasyCare frontend

## Local staff sign-in

Start the Laravel backend in the sibling `backend` directory with `dev.cmd start`, then run `npm run dev` here and open the printed URL. The tracked development API base is `/api/v1`; Vite proxies it to the local backend on port 8000. Production hosting must route `/api/v1` to Laravel on the hospital server.

Create staff accounts through `dev.cmd artisan staff:create --role=admin` in the backend directory, using your own privately prompted password. No account or password is seeded. Public account requests and recovery are handled by the hospital administrator until the administration workflows are built.

Sign-in uses HTTP-only Laravel session cookies, CSRF protection and an in-memory identity store. Reload checks the server session; private routes require server-returned roles. Logout invalidates the server session before reloading sign-in. Local browser storage is not trusted as authentication. Clinical and patient screens still contain demonstration data and await their backend implementation.

The production build passes. The full repository TypeScript check has outstanding errors outside the changed authentication files; see the backend development notes for verification details.

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
