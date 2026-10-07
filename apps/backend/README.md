# Express.js + CommonJS / ESM

This template provides a minimal setup for building REST APIs with **Express.js**. It supports two module systems — pick one and use it consistently:

- **Option 1 — CommonJS** (`require` / `module.exports`) — the default in this template
- **Option 2 — ESM** (ES modules, `import` / `export`) — see the conversion guide below

It includes a simple project structure, hot reloading, and ESLint support for a smooth development experience.

Currently, the template includes:

- **Express.js** for building fast and lightweight web servers
- **CommonJS** (`require`/`module.exports`) for module management
- **Nodemon** for automatic server restarts during development
- **ESLint** for maintaining consistent code quality
- **dotenv** for managing environment variables

## Development

Start the development server with hot reloading:

```bash
npm run dev
```

Start the server:

```bash
npm start
```

## Expanding the ESLint Configuration

If you are building a production application, consider adding stricter ESLint rules and integrating tools such as:

- **Prettier** for consistent code formatting
- **Jest** or **Mocha** for testing
- **Swagger/OpenAPI** for API documentation
- **Helmet** for security headers
- **CORS** for cross-origin resource sharing
- **Morgan** for HTTP request logging

---------------------

## Option 2 — ESM (ES Modules)

The same setup works with native ES modules. To convert the backend from CommonJS to ESM, follow these steps:

1. **Enable ESM in `backend/package.json`** — add (or change) the top-level field:

```json
   {
     "type": "module"
   }
```

2. **Replace all `require()` calls with `import`:**

```js
   // CommonJS
   const express = require('express');
   const app = express();

   // ESM
   import express from 'express';
   const app = express();
```

3. **Replace `module.exports` with `export`:**

```js
   // CommonJS
   module.exports = app;

   // ESM
   export default app;
```

4. **Replace `__dirname`** — it doesn't exist in ESM. Use this helper at the top of files that need it:

```js
   import { fileURLToPath } from 'url';
   import path from 'path';

   const __dirname = path.dirname(fileURLToPath(import.meta.url));
```

5. **Update ESLint** — in the ESLint config, set the parser options for modules:

```json
   {
     "parserOptions": {
       "ecmaVersion": 2022,
       "sourceType": "module"
     }
   }
```

6. **Nodemon, dotenv, and `npm run dev` / `npm start` work the same** — no changes needed to scripts or tooling.

> **Pick one module system per project.** Don't mix `require` and `import` in the same file, and make sure all team members use the same setting.

---------------------
