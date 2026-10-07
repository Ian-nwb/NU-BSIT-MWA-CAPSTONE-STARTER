# NU CCIT Capstone Starter

A structured monorepo template for National University CCIT capstone projects.
MERN stack with a layered MVC architecture, Dockerized MongoDB, a full testing suite, and an optional Flutter mobile client.

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Flutter](https://img.shields.io/badge/Flutter-02569B?logo=flutter&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Novelty](#novelty)
- [Prerequisites](#prerequisites)
- [VS Code Setup](#vs-code-setup)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Architecture](#architecture)
- [Useful Commands](#useful-commands)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Tech Stack

| Layer          | Technology                                |
| -------------- | ----------------------------------------- |
| Database       | MongoDB (Docker) + Mongo Express (Docker) |
| Backend        | Node.js / Bun, Express.js REST API        |
| Frontend       | React + Vite                              |
| Mobile (opt.)  | Flutter (Dart)                            |
| Testing        | Jest, Supertest, Newman, Playwright, k6   |
| Infrastructure | Docker, Docker Compose                    |
| CI/CD          | GitHub Actions                            |

---

## Project Structure

```
NU-CCIT-Capstone-Starter/
│
├── .github/
│   ├── workflows/              # CI/CD: lint, test, build, deploy
│   ├── ISSUE_TEMPLATE/         # Bug report / feature request templates
│   └── pull_request_template.md
│
├── .vscode/                    # Shared editor config
│   ├── extensions.json         # Recommended extensions
│   ├── settings.json           # Format on save, ESLint, Prettier
│   ├── launch.json             # Debug configs (backend, Jest, Chrome)
│   └── tasks.json              # Tasks: Docker up/down, run tests
│
├── backend/                    # Express.js REST API
│   ├── src/
│   │   ├── config/             # env, db connection, constants
│   │   ├── routes/             # Endpoint definitions
│   │   ├── controllers/        # Request/response handling
│   │   ├── services/           # Business logic
│   │   ├── models/             # Mongoose schemas
│   │   ├── middlewares/        # Auth, validation, error handler
│   │   ├── validators/         # Request schemas (Zod / Joi)
│   │   ├── utils/              # Helpers
│   │   ├── app.js              # Express app (exported for tests)
│   │   └── server.js           # Entry point
│   ├── seeds/                  # Database seed data
│   └── .env.example
│
├── frontend/                   # React + Vite web client
│   ├── src/
│   │   ├── api/                # API client layer
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── utils/
│   └── .env.example
│
├── mobile/                     # Flutter app (optional)
│   └── Dockerfile              # Flutter web build served by Nginx
│
├── tests/                      # All cross-cutting tests
│   ├── unit/                   # Jest: services, utils, validators
│   ├── integration/            # Jest + Supertest: routes + DB
│   ├── api/                    # Newman: Postman collections
│   │   ├── collections/
│   │   └── environments/
│   ├── functional/             # Feature-level flow tests
│   ├── e2e/                    # Playwright: full browser flows
│   ├── load/                   # k6: performance / stress tests
│   ├── security/               # Auth, injection, OWASP checks
│   ├── fixtures/               # Test data, mock files
│   ├── helpers/                # Test DB setup/teardown, factories
│   └── reports/                # Generated coverage + HTML reports (gitignored)
│
├── infra/                      # Docker & deployment
│   ├── docker-compose.yml      # MongoDB, Mongo Express, backend, frontend, mobile (web)
│   ├── docker-compose.test.yml # Isolated DB for test runs
│   ├── mongo-init/             # Init scripts (users, indexes)
│   └── nginx/                  # Reverse proxy config (optional)
│
├── scripts/                    # Dev scripts: setup, seed, backup, reset-db
│
├── docs/                       # Technical documentation
│   ├── api/                    # OpenAPI / Swagger spec
│   ├── architecture/           # Diagrams, ERD, system design
│   └── decisions/              # Architecture Decision Records (ADRs)
│
├── guides/                     # Setup and usage guides for team members
├── manuscript/                 # Capstone paper (chapters, references)
├── novelty/                    # What sets the system apart from others
│
├── .editorconfig
├── .gitignore
├── .prettierrc
├── CONTRIBUTING.md
├── LICENSE
├── package.json
└── README.md
```

### Folder reference

| Folder          | Purpose                                                              |
| --------------- | -------------------------------------------------------------------- |
| `.vscode/`      | Shared VS Code settings, extensions, debug and task configs          |
| `backend/`      | REST API in layered MVC                                              |
| `frontend/`     | React web client                                                     |
| `mobile/`       | Flutter client (optional)                                            |
| `tests/`        | Unit, integration, API, functional, E2E, load, and security tests    |
| `infra/`        | Docker Compose files and deployment config                           |
| `scripts/`      | Automation for setup, seeding, backups                               |
| `docs/`         | API spec, diagrams, ADRs                                             |
| `guides/`       | Onboarding and how-to guides                                         |
| `manuscript/`   | Capstone paper                                                       |
| `novelty/`      | Evidence of what makes the system different from existing solutions  |

---

## Novelty

The `novelty/` folder documents what separates this system from existing ones. Use it to keep your defense material in one place:

- **Problem gap**: what current systems fail to do
- **Comparison matrix**: your system vs. existing systems, feature by feature
- **Unique contribution**: the algorithm, workflow, or approach that is new
- **Evidence**: benchmarks, test results, user feedback supporting the claim
- **Related literature**: papers and systems reviewed

Suggested files:

```
novelty/
├── README.md                 # One-page summary of the novelty
├── comparison-matrix.md      # Feature comparison table
├── related-systems.md        # Existing systems reviewed
└── evidence/                 # Benchmarks, screenshots, survey results
```

---

## Prerequisites

Install these before anything else.

| Tool                      | Purpose                          | Download                                              |
| ------------------------- | -------------------------------- | ----------------------------------------------------- |
| **Git**                   | Version control                  | https://git-scm.com/downloads                         |
| **Node.js** (LTS)         | JS runtime, npm                  | https://nodejs.org/en/download                        |
| **Bun**                   | Fast JS runtime / package manager| https://bun.sh/docs/installation                      |
| **Docker Desktop**        | Containers (MongoDB)             | https://www.docker.com/products/docker-desktop/       |
| **Docker Engine** (Linux) | Containers without Desktop       | https://docs.docker.com/engine/install/               |
| **Docker Compose**        | Multi-container orchestration    | https://docs.docker.com/compose/install/              |
| **MongoDB Compass**       | GUI for MongoDB (optional)       | https://www.mongodb.com/try/download/compass          |
| **VS Code**               | Editor (recommended)             | https://code.visualstudio.com/download                |
| **Postman**               | API testing (optional)           | https://www.postman.com/downloads/                    |
| **Newman**                | Run Postman collections in CLI   | https://www.npmjs.com/package/newman                  |
| **Playwright**            | E2E browser testing              | https://playwright.dev/docs/intro                     |
| **k6**                    | Load testing                     | https://grafana.com/docs/k6/latest/set-up/install-k6/ |

### Flutter (mobile only)

| Tool                    | Download                                                   |
| ----------------------- | ---------------------------------------------------------- |
| **Flutter SDK** (all OS)| https://docs.flutter.dev/get-started/install               |
| Flutter on Windows      | https://docs.flutter.dev/get-started/install/windows       |
| Flutter on macOS        | https://docs.flutter.dev/get-started/install/macos         |
| Flutter on Linux        | https://docs.flutter.dev/get-started/install/linux         |
| **Android Studio**      | https://developer.android.com/studio                       |
| Flutter VS Code extension | https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter |

> **Windows users:** Docker Desktop requires WSL 2. Install it here: https://learn.microsoft.com/windows/wsl/install

### Verify installations

```bash
git --version
node --version
npm --version
bun --version
docker --version
docker compose version
flutter --version        # mobile only
```

---

## VS Code Setup

The `.vscode/` folder is committed so the whole team shares the same editor config.

1. Open the repo root in VS Code: `code .`
2. Click **Install** when prompted for recommended extensions (or open the Extensions panel and filter by `@recommended`).
3. Settings apply automatically: format on save, ESLint auto-fix, Prettier.

| File              | What it does                                                  |
| ----------------- | ------------------------------------------------------------- |
| `extensions.json` | Recommends ESLint, Prettier, Docker, MongoDB, Dart/Flutter, Playwright, Jest, Thunder Client, GitLens, EditorConfig |
| `settings.json`   | Format on save, ESLint fix on save, Prettier as default formatter, hides `node_modules` |
| `launch.json`     | Debug the backend, debug the current Jest file, launch Chrome against the frontend |
| `tasks.json`      | Run Docker up/down and each test suite from **Terminal → Run Task** |

Debug: press `F5` and pick a configuration.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ian-nwb/NU-CCIT-Capstone-Starter.git
cd NU-CCIT-Capstone-Starter
```

### 2. Install root dependencies

```bash
bun install              # or: npm install
```

### 3. Start MongoDB (Docker)

MongoDB runs in a container. Nothing needs to be installed locally.

```bash
cd infra
docker compose up -d
```

| Service       | Default URL / Port          |
| ------------- | --------------------------- |
| MongoDB       | `mongodb://localhost:27018` |
| Mongo Express | http://localhost:8085 (`admin` / `pass`) |

```bash
docker ps                # confirm containers are running
```

### 3b. Run everything in Docker (alternative)

One command starts MongoDB, Mongo Express, the backend, and the frontend:

```bash
cd infra
docker compose up -d
```

| Service       | URL                                 | Container            |
| ------------- | ----------------------------------- | -------------------- |
| Frontend      | http://localhost:5173               | `capstone_web`       |
| Backend API   | http://localhost:5000               | `capstone_api`       |
| MongoDB       | `mongodb://localhost:27018`         | `capstone_db`        |
| Mongo Express | http://localhost:8085               | `capstone_gui`       |
| Mobile (web)  | http://localhost:8080 (profile)     | `capstone_mobile_web`|

Include the Flutter web build:

```bash
docker compose --profile mobile up -d --build
```

> Inside Docker, the backend reaches MongoDB at `mongodb://mongodb:27017/capstone_db` (service name + internal port). From your host, use `localhost:27018`.
> Android/iOS builds can't run in Docker. Run those with `flutter run` locally.

### 4. Set up the backend

```bash
cd backend
cp .env.example .env     # then edit values
bun install              # or: npm install
bun run dev              # or: npm run dev
```

### 5. Set up the frontend

```bash
cd frontend
cp .env.example .env     # then edit values
bun install              # or: npm install
bun run dev              # or: npm run dev
```

The Vite dev server defaults to http://localhost:5173.

### 6. (Optional) Run the mobile app

```bash
cd mobile
flutter pub get
flutter doctor           # check your setup
flutter run
```

---

## Environment Variables

### `backend/.env`

```env
PORT=5000
NODE_ENV=development

# MongoDB (Docker)
MONGO_URI=mongodb://localhost:27018/capstone_db
MONGO_URI_TEST=mongodb://localhost:27019/capstone_test

# Auth
JWT_SECRET=change_me
JWT_EXPIRES_IN=7d

# CORS
CLIENT_URL=http://localhost:5173
```

### `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

> If your MongoDB container has authentication enabled, use:
> `mongodb://<user>:<password>@localhost:27018/capstone_db?authSource=admin`
>
> Never commit `.env` files.

---

## Running the Project

Open three terminals:

| Terminal | Directory   | Command                |
| -------- | ----------- | ---------------------- |
| 1        | `infra/`    | `docker compose up -d` |
| 2        | `backend/`  | `bun run dev`          |
| 3        | `frontend/` | `bun run dev`          |

Then open http://localhost:5173.

---

## Testing

All tests live in `tests/`. Start the test database first:

```bash
docker compose -f infra/docker-compose.test.yml up -d
```

| Type            | Tools                | Folder               | Command                  |
| --------------- | -------------------- | -------------------- | ------------------------ |
| **Unit**        | Jest                 | `tests/unit/`        | `bun run test:unit`      |
| **Integration** | Jest + Supertest     | `tests/integration/` | `bun run test:integration` |
| **API**         | Newman (Postman)     | `tests/api/`         | `bun run test:api`       |
| **Functional**  | Jest + Supertest     | `tests/functional/`  | `bun run test:functional`|
| **E2E**         | Playwright           | `tests/e2e/`         | `bun run test:e2e`       |
| **Load**        | k6                   | `tests/load/`        | `bun run test:load`      |
| **Security**    | Jest / OWASP ZAP     | `tests/security/`    | `bun run test:security`  |
| **All**         |                      |                      | `bun run test`           |
| **Coverage**    | Jest                 |                      | `bun run test:coverage`  |

Reports are written to `tests/reports/`.

### Suggested root `package.json` scripts

```json
{
  "scripts": {
    "test": "bun run test:unit && bun run test:integration && bun run test:api && bun run test:e2e",
    "test:unit": "jest --config tests/jest.config.js tests/unit",
    "test:integration": "jest --config tests/jest.config.js tests/integration --runInBand",
    "test:functional": "jest --config tests/jest.config.js tests/functional --runInBand",
    "test:api": "newman run tests/api/collections/api.postman_collection.json -e tests/api/environments/local.json",
    "test:e2e": "playwright test --config tests/e2e/playwright.config.js",
    "test:load": "k6 run tests/load/smoke.js",
    "test:security": "jest --config tests/jest.config.js tests/security",
    "test:coverage": "jest --config tests/jest.config.js --coverage"
  }
}
```

### Testing pyramid

```
        /  E2E  \          few, slow, high confidence
       / Functional \
      /  Integration  \
     /      Unit        \  many, fast, isolated
```

---

## Architecture

The backend follows a layered MVC architecture:

```
Request → Route → Controller → Service → Model (Mongoose) → MongoDB
                     ↑             ↑
                 Validators     Business logic
```

| Layer           | Responsibility                         |
| --------------- | -------------------------------------- |
| **Routes**      | Map endpoints to controllers           |
| **Controllers** | Handle request/response, call services |
| **Services**    | Business logic                         |
| **Models**      | Mongoose schemas and DB access         |
| **Validators**  | Request schema validation              |
| **Middlewares** | Auth, validation, error handling       |

`app.js` exports the Express app separately from `server.js`, so Supertest can run against it without opening a port.

---

## Useful Commands

### Docker

```bash
docker compose up -d                  # start services
docker compose down                   # stop services
docker compose down -v                # stop and delete volumes (wipes DB data)
docker compose logs -f                # follow logs
docker compose restart                # restart services
docker exec -it <container> mongosh   # open Mongo shell
```

### Backend / Frontend

```bash
bun install                           # install dependencies
bun run dev                           # dev server
bun run build                         # production build
bun run lint                          # lint
```

---

## Troubleshooting

| Problem                               | Fix                                                                  |
| ------------------------------------- | -------------------------------------------------------------------- |
| `Cannot connect to the Docker daemon` | Start Docker Desktop or run `sudo systemctl start docker`            |
| Port `27018` already in use           | Stop whatever uses it or change the host port in the compose file    |
| Port `8085` / `5000` / `5173` in use  | Change the port in `.env` or the compose file                        |
| `MongoServerSelectionError`           | Confirm the container is up (`docker ps`) and `MONGO_URI` is correct |
| CORS errors in browser                | Check `CLIENT_URL` in `backend/.env`                                 |
| Tests hit the dev database            | Check `MONGO_URI_TEST` and that the test container is running        |
| `flutter doctor` shows issues         | Follow its prompts; accept Android licenses with `flutter doctor --android-licenses` |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

1. Create a branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m "feat: add your feature"`
3. Run tests: `bun run test`
4. Push: `git push origin feature/your-feature`
5. Open a pull request

---

## Authors

Ian-nwb — https://github.com/Ian-nwb

## License

See [LICENSE](LICENSE).
