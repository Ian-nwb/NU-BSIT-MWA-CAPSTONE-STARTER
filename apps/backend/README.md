# Express.js + CommonJS

This template provides a minimal setup for building REST APIs with **Express.js** using the **CommonJS** module system. It includes a simple project structure, hot reloading, and ESLint support for a smooth development experience.

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
```
