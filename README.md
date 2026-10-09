# NU BSIT-MWA Capstone Starter

A structured monorepo template for National University BSIT-MWA capstone projects.
MERN stack + Flutter mobile client, with a layered MVC architecture, MongoDB Atlas (recommended for deployment), an optional Python + FastAPI service, and a full testing suite.

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Flutter](https://img.shields.io/badge/Flutter-02569B?logo=flutter&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Novelty](#novelty)
- [Prerequisites](#prerequisites)
- [Quick Start: Clone and Run](#quick-start-clone-and-run)
- [VS Code Setup](#vs-code-setup)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Docker Commands](#docker-commands)
- [Optional: Python + FastAPI Service](#optional-python--fastapi-service)
- [Testing](#testing)
- [Architecture](#architecture)
- [Deployment](#deployment)
- [Useful Commands](#useful-commands)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Database | **MongoDB Atlas** (recommended for deployment). Docker + Mongo Express for local dev |
| Backend | Node.js / Bun, Express.js REST API |
| Frontend | React + Vite |
| Mobile | Flutter (Dart) |
| Package manager | **Bun or npm**. Every command in this guide is shown for both |
| Testing | Jest, Supertest, Newman, Playwright, k6 |
| Infrastructure | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Optional services | Firebase (Auth, FCM, Firestore, Storage); Python + FastAPI (AI/ML microservice) |

> **Bun or npm?** Pick one and stick with it as a team. Bun is faster; npm ships with Node.js and works everywhere. Both read the same `package.json`. Do not mix them in the same clone: each creates its own lockfile (`bun.lock` vs `package-lock.json`), and committing both causes merge conflicts.

---

## Project Structure

```
NU-BSIT-MWA-Capstone-Starter/
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
├── mobile/                     # Flutter app
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
│   ├── docker-compose.yml      # MongoDB, Mongo Express, backend, frontend, mobile (web), python-service
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
├── novelty/                    # Your novelty. Rename it to fit (e.g. ai/, blockchain/, iot/)
│   ├── README.md               # One-page summary of the novelty
│   ├── comparison-matrix.md
│   ├── related-systems.md
│   ├── evidence/
│   └── python-service/         # OPTIONAL: Python + FastAPI service (if your novelty needs it)
│       ├── app/
│       │   ├── main.py         # FastAPI app + routes registration
│       │   ├── routers/        # Endpoint groups
│       │   ├── schemas/        # Pydantic request/response models
│       │   ├── services/       # Model inference / business logic
│       │   └── core/           # Config, settings
│       ├── tests/              # pytest
│       ├── requirements.txt
│       ├── Dockerfile
│       └── .env.example
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

| Folder | Purpose |
| --- | --- |
| `.vscode/` | Shared VS Code settings, extensions, debug and task configs |
| `backend/` | REST API in layered MVC |
| `frontend/` | React web client |
| `mobile/` | Flutter client |
| `tests/` | Unit, integration, API, functional, E2E, load, and security tests |
| `infra/` | Docker Compose files and deployment config |
| `scripts/` | Automation for setup, seeding, backups |
| `docs/` | API spec, diagrams, ADRs |
| `guides/` | Onboarding and how-to guides |
| `manuscript/` | Capstone paper |
| `novelty/` | Evidence of what makes the system different from existing solutions. Renamable; can also hold your novelty's code, such as the optional Python + FastAPI service |

---

## Novelty

The `novelty/` folder documents what separates this system from existing ones. Use it to keep your defense material in one place.

**Your novelty does not have to be a brand-new invention.** It can be any tech-related differentiator that is unique to your system compared to existing solutions. Here are accepted novelty categories and examples:

| Category | Examples |
| --- | --- |
| **AI / ML** | Model training, inference pipeline, dataset processing, recommendation engines, LLM-powered features (e.g. Gemini/OpenAI API integration), small language models (SLM) running on-device or self-hosted, natural language search, document classification (a good fit for the optional [Python + FastAPI service](#optional-python--fastapi-service)) |
| **Blockchain** | Smart contracts, on-chain logic, wallet integration, NFT-based certificates/records, decentralized identity, supply-chain traceability ledgers |
| **Automation** | n8n workflow automation, RPA scripts, scheduled jobs, auto-generated reports, email/SMS notification pipelines, CI/CD-triggered data tasks |
| **Systems** | Go or Rust microservices, low-level optimization, custom caching layers, message queues (Kafka/RabbitMQ), load balancers, gRPC services |
| **Accessibility** | OCR, text-to-speech, voice commands, screen-reader support, sign-language recognition, high-contrast/dyslexia-friendly UI modes, closed captioning |
| **IoT / Hardware** | Sensor integration, Raspberry Pi/Arduino/ESP32 nodes, real-time telemetry, NFC/RFID access systems, smart home automation, environmental monitoring (temp/humidity/air quality), GPS tracking devices |
| **Computer Vision** | Object/face detection, image classification, video analytics, license plate recognition, defect/quality inspection, pose estimation, barcode/QR scanning |
| **NLP** | Chatbots, sentiment analysis, text summarization, language translation, resume/document parsing, spam/toxicity detection, voice-to-text transcription |
| **AR / VR** | Immersive overlays, 3D visualization, spatial interaction, virtual try-on, AR wayfinding/indoor navigation, VR training simulations |
| **Predictive Analytics** | Forecasting models, anomaly detection, risk scoring, demand/inventory prediction, churn prediction, predictive maintenance |
| **Real-time Systems** | Live dashboards, WebSocket/streaming data, push notifications, live chat/collaboration, real-time location tracking, live auction/bidding systems |
| **Offline-first** | Local-first sync, conflict resolution, works without internet, local caching with background sync, offline maps/data entry for field work |
| **Gamification** | Points/badges/leaderboards, adaptive difficulty, engagement mechanics, streaks/daily challenges, redeemable rewards systems |
| **Security / Crypto** | End-to-end encryption, biometric auth, anomaly-based fraud detection, two-factor authentication, intrusion detection (IDS/IPS), secure file sharing |
| **Data Visualization** | Interactive charts/graphs, geospatial/heat maps, admin analytics dashboards, drill-down reporting tools |
| **Multi-tenancy / SaaS** | Organization-based data isolation, subscription/billing integration, role-based workspace permissions, usage metering |
| **Digital Twins** | Virtual replicas of physical assets/processes, simulation-based monitoring, what-if scenario testing |
| **Other** | Anything not covered above. Bring your own idea |

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

| Tool | Purpose | Download |
| --- | --- | --- |
| **Git** | Version control | [https://git-scm.com/downloads](https://git-scm.com/downloads) |
| **Node.js** (LTS) | JS runtime. **Includes npm** | [https://nodejs.org/en/download](https://nodejs.org/en/download) |
| **Bun** (optional if you use npm) | Fast JS runtime / package manager | [https://bun.sh/docs/installation](https://bun.sh/docs/installation) |
| **Docker Desktop** | Containers (MongoDB) | [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/) |
| **Docker Engine** (Linux) | Containers without Desktop | [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/) |
| **Docker Compose** | Multi-container orchestration | [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/) |
| **MongoDB Compass** | GUI for MongoDB (dev only) | [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass) |
| **MongoDB Atlas** | Managed MongoDB, recommended for deployment | [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas) |
| **VS Code** | Editor (recommended) | [https://code.visualstudio.com/download](https://code.visualstudio.com/download) |
| **Postman** | API testing (optional) | [https://www.postman.com/downloads/](https://www.postman.com/downloads/) |
| **Newman** | Run Postman collections in CLI | [https://www.npmjs.com/package/newman](https://www.npmjs.com/package/newman) |
| **Playwright** | E2E browser testing | [https://playwright.dev/docs/intro](https://playwright.dev/docs/intro) |
| **k6** | Load testing | [https://grafana.com/docs/k6/latest/set-up/install-k6/](https://grafana.com/docs/k6/latest/set-up/install-k6/) |

> You only need **one** of Bun or npm. If you skip Bun, Node.js (which includes npm) is enough.

### Python (optional)

Only needed if your capstone includes the [Python + FastAPI service](#optional-python--fastapi-service).

| Tool | Purpose | Download |
| --- | --- | --- |
| **Python 3.10+** | Runtime for the FastAPI service | [https://www.python.org/downloads/](https://www.python.org/downloads/) |
| **pip** | Python package manager (bundled with Python) | [https://pip.pypa.io/en/stable/installation/](https://pip.pypa.io/en/stable/installation/) |
| **FastAPI** | Python web framework (installed per project via pip) | [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/) |
| **Uvicorn** | ASGI server that runs FastAPI (installed via pip) | [https://www.uvicorn.org/](https://www.uvicorn.org/) |

### Firebase CLI (optional)

Only needed if your capstone uses Firebase. The CLI manages projects, emulators, and deployments; FlutterFire CLI wires Firebase into the Flutter app.

| Tool | Purpose | Install |
| --- | --- | --- |
| **Firebase CLI** | Manage Firebase from the terminal | [https://firebase.google.com/docs/cli](https://firebase.google.com/docs/cli) |
| **FlutterFire CLI** | Wire Firebase into the Flutter app | [https://firebase.flutter.dev/docs/cli/](https://firebase.flutter.dev/docs/cli/) |

```bash
# macOS / Linux
curl -sL https://firebase.tools | bash

# Windows (PowerShell)
irm https://firebase.tools | iex

# Or via Bun
bun install -g firebase-tools

# Or via npm
npm install -g firebase-tools

# FlutterFire CLI (both)
dart pub global activate flutterfire_cli
```

Verify installations:

```bash
firebase --version
flutterfire --version
```

Then log in and connect the project:

```bash
firebase login
firebase projects:list
flutterfire configure        # run inside mobile/
```

### Flutter (mobile)

The Flutter client is a required part of this project. Every team member doing mobile work needs the Flutter toolchain.

| Tool | Download |
| --- | --- |
| **Flutter SDK** (all OS) | [https://docs.flutter.dev/get-started/install](https://docs.flutter.dev/get-started/install) |
| Flutter on Windows | [https://docs.flutter.dev/get-started/install/windows](https://docs.flutter.dev/get-started/install/windows) |
| Flutter on macOS | [https://docs.flutter.dev/get-started/install/macos](https://docs.flutter.dev/get-started/install/macos) |
| Flutter on Linux | [https://docs.flutter.dev/get-started/install/linux](https://docs.flutter.dev/get-started/install/linux) |
| **Android Studio** | [https://developer.android.com/studio](https://developer.android.com/studio) |
| Flutter VS Code extension | [https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter) |

> **Windows users:** Docker Desktop requires WSL 2. Install it here: [https://learn.microsoft.com/windows/wsl/install](https://learn.microsoft.com/windows/wsl/install)

### Verify installations

```bash
git --version
node --version
npm --version             # always present with Node.js
bun --version             # only if you chose Bun
docker --version
docker compose version
flutter --version
python --version          # optional: only if using the FastAPI service (use python3 on macOS/Linux)
firebase --version        # optional: only if using Firebase
```

---

## Quick Start: Clone and Run

The shortest path from zero to a running app. Every JavaScript command is shown for **Bun** and **npm**: use one column consistently.

| Task | Bun | npm |
| --- | --- | --- |
| Install dependencies | `bun install` | `npm install` |
| Run a script (dev server) | `bun run dev` | `npm run dev` |
| Run any script | `bun run <script>` | `npm run <script>` |
| Add a package | `bun add <pkg>` | `npm install <pkg>` |
| Add a dev package | `bun add -d <pkg>` | `npm install -D <pkg>` |
| Install globally | `bun install -g <pkg>` | `npm install -g <pkg>` |
| Run a one-off binary | `bunx <pkg>` | `npx <pkg>` |

### 1. Clone the repository

```bash
git clone https://github.com/Ian-nwb/NU-BSIT-MWA-Capstone-Starter.git
cd NU-BSIT-MWA-Capstone-Starter
```

To start your own project from this template instead of contributing to it, create your own repo and point the clone at it:

```bash
git clone https://github.com/Ian-nwb/NU-BSIT-MWA-Capstone-Starter.git my-capstone
cd my-capstone
git remote set-url origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### 2. Install dependencies

Run this in the root, `backend/`, and `frontend/`:

```bash
# Bun
bun install
cd backend && bun install && cd ..
cd frontend && bun install && cd ..
```

```bash
# npm
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 3. Create your environment files

```bash
# macOS / Linux / Git Bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

```powershell
# Windows PowerShell
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env
```

Open each `.env` and fill in the values (see [Environment Variables](#environment-variables)). At minimum, change `JWT_SECRET`.

### 4. Start MongoDB

```bash
cd infra
docker compose up -d
cd ..
```

Check it is running with `docker ps`. To use MongoDB Atlas instead, skip this step and set `MONGO_URI` in `backend/.env` to your Atlas SRV string.

### 5. Run the backend and frontend

Open two terminals.

**Terminal 1: backend**

```bash
cd backend

# Bun
bun run dev

# npm
npm run dev
```

**Terminal 2: frontend**

```bash
cd frontend

# Bun
bun run dev

# npm
npm run dev
```

### 6. Open the app

| What | URL |
| --- | --- |
| Web app | [http://localhost:5173](http://localhost:5173) |
| Backend API | [http://localhost:5000](http://localhost:5000) |
| Mongo Express | [http://localhost:8085](http://localhost:8085) (`admin` / `pass`) |

### 7. Optional extras

- **Mobile app:** `cd mobile && flutter pub get && flutter run`
- **Python + FastAPI service:** see [Optional: Python + FastAPI Service](#optional-python--fastapi-service)
- **Everything in Docker, one command:** `cd infra && docker compose up -d --build`
- **Docker cheat sheet (logs, shell access, restart):** see [Docker Commands](#docker-commands)

### Quick Start checklist

- [ ] Git, Node.js (and Bun if you chose it), and Docker installed
- [ ] Repo cloned, dependencies installed in root, `backend/`, `frontend/`
- [ ] `.env` files created in `backend/` and `frontend/`
- [ ] MongoDB container running (or Atlas URI set)
- [ ] Backend on `:5000`, frontend on `:5173`

---

## VS Code Setup

The `.vscode/` folder is committed so the whole team shares the same editor config.

1. Open the repo root in VS Code: `code .`
2. Click **Install** when prompted for recommended extensions (or open the Extensions panel and filter by `@recommended`).
3. Settings apply automatically: format on save, ESLint auto-fix, Prettier.

| File | What it does |
| --- | --- |
| `extensions.json` | Recommends ESLint, Prettier, Docker, MongoDB, Dart/Flutter, Python, Playwright, Jest, Thunder Client, GitLens, EditorConfig |
| `settings.json` | Format on save, ESLint fix on save, Prettier as default formatter, hides `node_modules` |
| `launch.json` | Debug the backend, debug the current Jest file, launch Chrome against the frontend, debug the Flutter app |
| `tasks.json` | Run Docker up/down and each test suite from **Terminal → Run Task** |

Debug: press `F5` and pick a configuration.

---

## Getting Started

This is the detailed version of the [Quick Start](#quick-start-clone-and-run).

### 1. Clone the repository

```bash
git clone https://github.com/Ian-nwb/NU-BSIT-MWA-Capstone-Starter.git
cd NU-BSIT-MWA-Capstone-Starter
```

### 2. Install root dependencies

```bash
# Bun
bun install

# npm
npm install
```

### 3. Start MongoDB (Docker)

MongoDB runs in a container. Nothing needs to be installed locally.

```bash
cd infra
docker compose up -d
```

| Service | Default URL / Port |
| --- | --- |
| MongoDB | `mongodb://localhost:27018` |
| Mongo Express | [http://localhost:8085](http://localhost:8085) (`admin` / `pass`) |

```bash
docker ps                # confirm containers are running
```

> **Dev only:** the Dockerized MongoDB and Mongo Express are for local development.
> **For deployment, use [MongoDB Atlas](https://www.mongodb.com/atlas)**. The free M0 tier is enough for capstone demos.

### 3b. Run everything in Docker (alternative)

One command starts MongoDB, Mongo Express, the backend, and the frontend:

```bash
cd infra
docker compose up -d
```

| Service | URL | Container |
| --- | --- | --- |
| Frontend | [http://localhost:5173](http://localhost:5173) | `capstone_web` |
| Backend API | [http://localhost:5000](http://localhost:5000) | `capstone_api` |
| MongoDB | `mongodb://localhost:27018` | `capstone_db` |
| Mongo Express | [http://localhost:8085](http://localhost:8085) | `capstone_gui` |
| Mobile (web) | [http://localhost:8080](http://localhost:8080) | `capstone_mobile_web` |
| Python service (optional) | [http://localhost:8000](http://localhost:8000) | `capstone_python` |

Include the Flutter web build:

```bash
docker compose up -d --build
```

> Inside Docker, the backend reaches MongoDB at `mongodb://mongodb:27017/capstone_db` (service name + internal port). From your host, use `localhost:27018`.
> The Flutter **web** build can run in Docker, but Android/iOS builds cannot. Run those with `flutter run` locally.
> Logs, shell access, restarts: see [Docker Commands](#docker-commands).

### 4. Set up the backend

```bash
cd backend
cp .env.example .env     # then edit values

# Bun
bun install
bun run dev

# npm
npm install
npm run dev
```

### 5. Set up the frontend

```bash
cd frontend
cp .env.example .env     # then edit values

# Bun
bun install
bun run dev

# npm
npm install
npm run dev
```

The Vite dev server defaults to [http://localhost:5173](http://localhost:5173).

### 6. Set up the mobile app

```bash
cd mobile
flutter pub get
flutter doctor           # check your setup
flutter run              # pick an Android emulator, iOS simulator, or browser
```

The Flutter app is a required client in this project. Every team member should be able to build and run it.

### 7. Set up the Python + FastAPI service (optional)

See [Optional: Python + FastAPI Service](#optional-python--fastapi-service).

---

## Environment Variables

### `backend/.env`

```env
PORT=5000
NODE_ENV=development

# MongoDB (Docker, local development)
MONGO_URI=mongodb://localhost:27018/capstone_db
MONGO_URI_TEST=mongodb://localhost:27019/capstone_test

# MongoDB Atlas (deployment: get the SRV string from your Atlas cluster)
# MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/capstone_db

# Auth
JWT_SECRET=change_me
JWT_EXPIRES_IN=7d

# CORS
CLIENT_URL=http://localhost:5173
MOBILE_URL=http://localhost:8080

# Optional: Python + FastAPI service
# PYTHON_SERVICE_URL=http://localhost:8000
```

### `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

### `mobile/.env`

```env
API_URL=http://localhost:5000/api
```

### `novelty/python-service/.env` (optional)

```env
PORT=8000
BACKEND_URL=http://localhost:5000
MODEL_PATH=./models/model.pkl
```

> If your MongoDB container has authentication enabled, use:
> `mongodb://<user>:<password>@localhost:27018/capstone_db?authSource=admin`
>
> Never commit `.env` files.

> **MongoDB Compass and Mongo Express are dev tools only.** In production, connect the backend to MongoDB Atlas by setting `MONGO_URI` to your Atlas SRV connection string. No code changes are needed.

### Firebase (optional add-on)

If your capstone needs Firebase (push notifications (FCM), file storage, extra auth providers, or Firestore for non-core data) you don't add a `firebase/` folder to the repo. Firebase is a cloud service, so you only add config and SDK setup:

```bash
# backend
cd backend
bun add firebase-admin         # Bun
npm install firebase-admin     # npm

# frontend
cd frontend
bun add firebase               # Bun
npm install firebase           # npm

# mobile (uses the FlutterFire CLI)
dart pub global activate flutterfire_cli
flutterfire configure
```

Where the config lives:

| Layer | Setup |
| --- | --- |
| Backend | `backend/src/config/firebase.js`, initialized from a service account key stored in `.env` |
| Frontend | `frontend/src/config/firebase.js`, initialized from `VITE_FIREBASE_*` env vars |
| Mobile | `mobile/lib/firebase_options.dart`, generated by `flutterfire configure` |

Add these to `.env` files (never commit them):

```env
# backend/.env
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account", ...}   # or path to the JSON file
FIREBASE_PROJECT_ID=your-project-id

# frontend/.env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
```

Document any Firebase usage in `docs/decisions/` as an ADR (why Firebase, what it's used for, and why it doesn't replace MongoDB as the primary database).

---

## Running the Project

Open four terminals (five if you use the Python service):

| Terminal | Directory | Bun | npm |
| --- | --- | --- | --- |
| 1 | `infra/` | `docker compose up -d` | `docker compose up -d` |
| 2 | `backend/` | `bun run dev` | `npm run dev` |
| 3 | `frontend/` | `bun run dev` | `npm run dev` |
| 4 | `mobile/` | `flutter run` | `flutter run` |
| 5 (optional) | `novelty/python-service/` | `uvicorn app.main:app --reload --port 8000` | `uvicorn app.main:app --reload --port 8000` |

Then open [http://localhost:5173](http://localhost:5173) (web) and launch the Flutter app on your device or emulator.

---

## Docker Commands

Run these from the `infra/` folder (where `docker-compose.yml` lives), or from the root with `-f infra/docker-compose.yml`.

### Compose service names

Most commands take a **service name** (from `docker-compose.yml`). `docker exec` and `docker logs` take the **container name** instead.

| What | Service name | Container name | URL / Port |
| --- | --- | --- | --- |
| MongoDB | `mongodb` | `capstone_db` | `localhost:27018` |
| Mongo Express | `mongo-express` | `capstone_gui` | [http://localhost:8085](http://localhost:8085) |
| Backend (Express) | `backend` | `capstone_api` | [http://localhost:5000](http://localhost:5000) |
| Frontend (Vite) | `frontend` | `capstone_web` | [http://localhost:5173](http://localhost:5173) |
| Mobile (Flutter web) | `mobile` | `capstone_mobile_web` | [http://localhost:8080](http://localhost:8080) |
| Python service (optional) | `python_service` | `capstone_python` | [http://localhost:8000](http://localhost:8000) |

### Start and stop

| Task | Command |
| --- | --- |
| Start everything (background) | `docker compose up -d` |
| Start and rebuild images | `docker compose up -d --build` |
| Start only some services | `docker compose up -d mongodb mongo-express` |
| Start in the foreground (see logs live, Ctrl+C stops) | `docker compose up` |
| Stop everything (keeps containers) | `docker compose stop` |
| Start stopped containers again | `docker compose start` |
| Stop and remove containers + network | `docker compose down` |
| Stop and also delete volumes | `docker compose down -v` |
| Restart everything | `docker compose restart` |
| Restart one service | `docker compose restart backend` |
| Stop one service | `docker compose stop frontend` |

> `docker compose down -v` deletes named volumes. This project stores MongoDB data in the bind mount `infra/mongodb_data/`, so to wipe the database you must also delete that folder.

### Check status

```bash
docker compose ps                     # services in this project and their status
docker ps                             # all running containers
docker ps -a                          # including stopped ones
docker stats                          # live CPU / memory per container (Ctrl+C to exit)
docker compose config                 # print the final merged compose file (catches typos)
```

### View logs

| Task | Command |
| --- | --- |
| All services | `docker compose logs` |
| Follow all services live | `docker compose logs -f` |
| One service | `docker compose logs backend` |
| Follow one service | `docker compose logs -f backend` |
| Last 100 lines, then follow | `docker compose logs -f --tail=100 backend` |
| Several services | `docker compose logs -f backend frontend` |
| With timestamps | `docker compose logs -f -t backend` |
| By container name | `docker logs -f capstone_api` |

### Access a container (shell)

Open an interactive shell inside a running container:

```bash
docker compose exec backend sh              # backend (Express)
docker compose exec frontend sh             # frontend (Vite)
docker compose exec mongodb bash            # MongoDB container
docker compose exec python_service bash     # Python service (optional)
docker compose exec mobile sh               # Flutter web / Nginx
```

The same thing using container names:

```bash
docker exec -it capstone_api sh
docker exec -it capstone_web sh
docker exec -it capstone_db bash
```

Type `exit` to leave the shell.

### Run a command inside a container

You do not need a shell to run a single command:

| Task | Bun | npm |
| --- | --- | --- |
| Install a package in the backend container | `docker compose exec backend bun add <pkg>` | `docker compose exec backend npm install <pkg>` |
| Install a package in the frontend container | `docker compose exec frontend bun add <pkg>` | `docker compose exec frontend npm install <pkg>` |
| Run a backend script (e.g. seed) | `docker compose exec backend bun run seed` | `docker compose exec backend npm run seed` |
| Run backend lint | `docker compose exec backend bun run lint` | `docker compose exec backend npm run lint` |
| Reinstall dependencies | `docker compose exec backend bun install` | `docker compose exec backend npm install` |

```bash
docker compose exec python_service pytest              # run Python tests (optional service)
docker compose exec backend env                        # print environment variables
docker compose exec backend ls -la /app                # list files inside the container
```

> The compose file runs the backend and frontend on the `oven/bun` image, so `bun` commands work inside them out of the box. If your team uses npm, change `image: oven/bun:1` to `image: node:22-alpine` and the `command:` lines to use `npm install && npm run dev` (frontend: `npm run dev -- --host 0.0.0.0`). Then use the npm column above.

### MongoDB shell and backups

```bash
# Open the Mongo shell on the capstone database
docker compose exec mongodb mongosh capstone_db

# Inside mongosh
show collections
db.users.find().limit(5)
exit
```

Back up and restore the database:

```bash
# Backup: dump to a compressed archive, then copy it to your machine
docker compose exec mongodb mongodump --db capstone_db --archive=/tmp/capstone.archive --gzip
docker cp capstone_db:/tmp/capstone.archive ./capstone.archive

# Restore: copy the archive in, then restore it
docker cp ./capstone.archive capstone_db:/tmp/capstone.archive
docker compose exec mongodb mongorestore --archive=/tmp/capstone.archive --gzip --drop
```

Because the data is a bind mount at `infra/mongodb_data/`, you can also back up by stopping the stack (`docker compose down`) and copying that folder.

### Rebuild and refresh

| Situation | Command |
| --- | --- |
| Changed a `Dockerfile` or build context | `docker compose up -d --build` |
| Rebuild one service | `docker compose build backend` then `docker compose up -d backend` |
| Rebuild from scratch (ignore cache) | `docker compose build --no-cache` |
| Changed a `.env` file | `docker compose up -d --force-recreate backend` |
| Pull newer base images | `docker compose pull` |
| Recreate all containers | `docker compose up -d --force-recreate` |

> `docker compose restart` does **not** reload `.env` or `env_file` changes. Use `--force-recreate` after editing environment variables.

### Clean up

```bash
docker compose down --rmi local        # remove containers + images built by this project
docker image prune                     # remove dangling images
docker container prune                 # remove all stopped containers
docker volume ls                       # list volumes
docker volume prune                    # remove unused volumes (careful)
docker system df                       # see how much disk Docker is using
docker system prune -a                 # remove ALL unused images/containers/networks (careful)
```

### Test database (separate stack)

```bash
docker compose -f infra/docker-compose.test.yml up -d       # start the isolated test DB
docker compose -f infra/docker-compose.test.yml down        # stop it
docker compose -f infra/docker-compose.test.yml down -v     # stop it and wipe its data
```

### Quick recipes

| I want to... | Run |
| --- | --- |
| Start the whole stack | `cd infra && docker compose up -d` |
| See why the backend crashed | `docker compose logs --tail=100 backend` |
| Watch the backend live | `docker compose logs -f backend` |
| Open a shell in the backend | `docker compose exec backend sh` |
| Browse the DB in the terminal | `docker compose exec mongodb mongosh capstone_db` |
| Apply a changed `.env` | `docker compose up -d --force-recreate backend` |
| Stop everything for the day | `docker compose stop` |
| Start fresh (wipe containers) | `docker compose down` then `docker compose up -d --build` |
| Free up disk space | `docker system prune` |

---

## Optional: Python + FastAPI Service

Use this when your capstone has a feature that is easier in Python than in Node.js: ML model inference, computer vision, NLP, forecasting, OCR, or heavy data processing. The Express backend stays the main API; the FastAPI service runs next to it as a **microservice** that the backend calls.

```
React / Flutter  →  Express API (Node/Bun)  →  FastAPI service (Python)  →  model / dataset
                          ↓
                       MongoDB
```

Clients never call FastAPI directly. They call Express, which handles auth and persistence, then forwards the work to FastAPI. This keeps one public API and one auth system.

> Skip this section entirely if your capstone does not need Python. Nothing else in the repo depends on it.

> **Where it lives:** inside `novelty/`, as `novelty/python-service/`. The `novelty/` folder holds whatever makes your system different, so rename it to fit your project (e.g. `ai/`, `vision/`, `forecasting/`) and update the paths in the commands below. Paths in this section assume the default name.

### 1. Create the service folder

```bash
mkdir -p novelty/python-service/app/routers novelty/python-service/app/schemas novelty/python-service/app/services novelty/python-service/app/core novelty/python-service/tests
cd novelty/python-service
touch app/__init__.py app/main.py
```

### 2. Create a virtual environment

Always use a virtual environment so project packages do not mix with your system Python.

```bash
# macOS / Linux
python3 -m venv .venv
source .venv/bin/activate
```

```powershell
# Windows PowerShell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

```bash
# Windows CMD
python -m venv .venv
.venv\Scripts\activate.bat
```

Your terminal prompt should now start with `(.venv)`. Add `.venv/` to `.gitignore`.

### 3. Install dependencies

```bash
pip install fastapi "uvicorn[standard]" pydantic python-dotenv
pip install pytest httpx               # for tests
pip freeze > requirements.txt          # save versions for teammates
```

Teammates cloning the repo install from the file instead:

```bash
pip install -r requirements.txt
```

### 4. Write the app

`novelty/python-service/app/main.py`:

```python
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

app = FastAPI(title="Capstone Python Service", version="0.1.0")

# Only the Express backend should call this service.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("BACKEND_URL", "http://localhost:5000")],
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictRequest(BaseModel):
    text: str


class PredictResponse(BaseModel):
    label: str
    score: float


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict", response_model=PredictResponse)
def predict(body: PredictRequest):
    # Replace with your real model inference.
    return PredictResponse(label="placeholder", score=0.0)
```

FastAPI validates requests and responses with the Pydantic models, so invalid input is rejected with a `422` before your code runs.

### 5. Run it

From inside `novelty/python-service/` with the virtual environment active:

```bash
uvicorn app.main:app --reload --port 8000
```

| What | URL |
| --- | --- |
| API root / health | [http://localhost:8000/health](http://localhost:8000/health) |
| Swagger UI (interactive docs) | [http://localhost:8000/docs](http://localhost:8000/docs) |
| ReDoc | [http://localhost:8000/redoc](http://localhost:8000/redoc) |

Try it from the terminal:

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "hello"}'
```

### 6. Call it from the Express backend

Add the URL to `backend/.env` (it is already listed in [Environment Variables](#environment-variables)):

```env
PYTHON_SERVICE_URL=http://localhost:8000
```

`backend/src/services/python.service.js` (Node 18+ and Bun both have `fetch` built in, so no extra package is needed):

```javascript
const PYTHON_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';

export async function predict(text) {
  const res = await fetch(`${PYTHON_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error(`AI service error: ${res.status}`);
  }
  return res.json();
}
```

Call `predict()` from a controller like any other service, following the normal Route → Controller → Service layering.

### 7. Run it in Docker

`novelty/python-service/Dockerfile`:

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Add this service to `infra/docker-compose.yml`:

```yaml
  python_service:
    build: ../novelty/python-service
    container_name: capstone_python
    ports:
      - "8000:8000"
    env_file:
      - ../novelty/python-service/.env
```

Inside Docker, the backend reaches it by service name, so set `PYTHON_SERVICE_URL=http://python_service:8000` in the backend container's environment (from your host, keep `http://localhost:8000`).

Handy commands for this service (see [Docker Commands](#docker-commands) for the rest):

```bash
docker compose logs -f python_service
docker compose exec python_service bash
docker compose up -d --build python_service
```

### 8. Test it

`novelty/python-service/tests/test_main.py`:

```python
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}


def test_predict():
    res = client.post("/predict", json={"text": "hello"})
    assert res.status_code == 200
    assert "label" in res.json()
```

```bash
cd novelty/python-service
pytest
```

### 9. Deploy it

Deploy `novelty/python-service/` as its own **Web Service** on Render (or Azure App Service / AWS), separate from the Express backend:

1. Root directory: `novelty/python-service/`
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Set `BACKEND_URL` to your deployed Express URL, then set `PYTHON_SERVICE_URL` in the Express backend to the deployed FastAPI URL.

> Free-tier hosts have limited RAM. Large models (PyTorch, TensorFlow) may not fit, so check your model size early, or use a hosted model API instead.

Document why you need a separate Python service in `docs/decisions/` as an ADR.

---

## Testing

All tests live in `tests/`. Start the test database first:

```bash
docker compose -f infra/docker-compose.test.yml up -d
```

| Type | Tools | Folder | Bun | npm |
| --- | --- | --- | --- | --- |
| **Unit** | Jest | `tests/unit/` | `bun run test:unit` | `npm run test:unit` |
| **Integration** | Jest + Supertest | `tests/integration/` | `bun run test:integration` | `npm run test:integration` |
| **API** | Newman (Postman) | `tests/api/` | `bun run test:api` | `npm run test:api` |
| **Functional** | Jest + Supertest | `tests/functional/` | `bun run test:functional` | `npm run test:functional` |
| **E2E** | Playwright | `tests/e2e/` | `bun run test:e2e` | `npm run test:e2e` |
| **Mobile** | Flutter integration\_test | `mobile/integration_test/` | `flutter test` | `flutter test` |
| **Python service** | pytest | `novelty/python-service/tests/` | `pytest` | `pytest` |
| **Load** | k6 | `tests/load/` | `bun run test:load` | `npm run test:load` |
| **Security** | Jest / OWASP ZAP | `tests/security/` | `bun run test:security` | `npm run test:security` |
| **All** |  |  | `bun run test` | `npm run test` |
| **Coverage** | Jest |  | `bun run test:coverage` | `npm run test:coverage` |

Reports are written to `tests/reports/`.

### Suggested root `package.json` scripts

These scripts use `npm run` internally so they work no matter which package manager launched them (Node.js, and therefore npm, is a prerequisite either way).

```json
{
  "scripts": {
    "test": "npm run test:unit && npm run test:integration && npm run test:api && npm run test:e2e",
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
                                  ↓
                         (optional) FastAPI service
```

| Layer | Responsibility |
| --- | --- |
| **Routes** | Map endpoints to controllers |
| **Controllers** | Handle request/response, call services |
| **Services** | Business logic (and calls to the optional FastAPI service) |
| **Models** | Mongoose schemas and DB access |
| **Validators** | Request schema validation |
| **Middlewares** | Auth, validation, error handling |

`app.js` exports the Express app separately from `server.js`, so Supertest can run against it without opening a port.

All three clients (web, mobile, backend admin tooling) consume the same REST API. If the Python service is used, only the Express backend talks to it.

---

## Deployment

Deploy each layer to whichever platform fits your team's budget and experience. The database stays on **MongoDB Atlas** (M0 free tier is enough for capstone demos) in all cases. The guides below assume your `MONGO_URI` already points to Atlas.

| Layer | Recommended platforms |
| --- | --- |
| Frontend (React + Vite) | **Vercel**, Azure Static Web Apps, AWS Amplify |
| Backend (Express API) | **Render**, Azure App Service, AWS Elastic Beanstalk / ECS |
| Python service (FastAPI, optional) | **Render**, Azure App Service, AWS Elastic Beanstalk / ECS |
| Mobile (Flutter web build) | Vercel, Render (static site), any static host |
| Database | **MongoDB Atlas** (do not self-host MongoDB for the demo) |

### Vercel (frontend / mobile web)

1. Push the repo to GitHub.
2. In Vercel → **Add New Project** → import the repo.
3. Set the root directory to `frontend/` (or `mobile/` for the Flutter web build).
4. Framework preset: **Vite**. Output directory `dist`.
   - Bun: install command `bun install`, build command `bun run build`
   - npm: install command `npm install`, build command `npm run build`
5. Add env var `VITE_API_URL` pointing to your deployed backend URL.
6. Deploy. Vercel rebuilds on every push to `main`.

### Render (backend)

1. Create a **Web Service** on Render → connect the repo.
2. Root directory: `backend/`.
   - Bun: build command `bun install`, start command `bun run start`
   - npm: build command `npm install`, start command `npm start`
   - Either way, `node src/server.js` also works as the start command.
3. Add env vars from `backend/.env`, especially `MONGO_URI` (Atlas SRV string) and `JWT_SECRET`.
4. Enable auto-deploy from `main`.

> If you use Bun on Render, make sure Bun is available in the build environment (set a Bun version or use a Dockerfile). npm works out of the box.

### Render (Python + FastAPI service, optional)

See [Deploy it](#9-deploy-it) in the Python section.

### Azure

Azure deploys through GitHub Actions. This repo ships with a **blank workflow file at `.github/workflows/azure-deploy.yml`**. You must configure it yourself:

1. Create the Azure resources (e.g. App Service for the backend, Static Web App for the frontend) in the [Azure Portal](https://portal.azure.com).
2. Set up the required secrets in your repo: **Settings → Secrets and variables → Actions**, typically `AZURE_CREDENTIALS`, plus app-specific settings like `AZURE_APP_NAME` and `MONGO_URI`.
3. Fill in `.github/workflows/azure-deploy.yml` using the [Azure/webapps-deploy](https://github.com/Azure/webapps-deploy) and [Azure/static-web-apps-deploy](https://github.com/Azure/static-web-apps-deploy) actions as a reference.
4. Commit and push. The workflow runs on every push to `main`.

> The file is intentionally blank: Azure setups vary a lot per project (App Service vs Container Apps vs VMs), so copy the workflow from the Azure docs for your chosen service and adapt it.

### AWS

Common capstone-friendly paths:

- **Elastic Beanstalk**: upload the `backend/` as a Node.js app; easiest AWS option for the API.
- **ECS / Fargate**: containerized backend using the existing Dockerfiles; more setup, more control.
- **Amplify**: frontend hosting, similar workflow to Vercel.
- Store secrets (Atlas URI, JWT secret) in **AWS Systems Manager Parameter Store** or as Elastic Beanstalk environment properties. Never in the repo.

### After deploying

- Update `CLIENT_URL` / `MOBILE_URL` in the backend env vars to your deployed frontend URLs (fixes CORS).
- Update the frontend `VITE_API_URL` and mobile `API_URL` to the deployed backend URL.
- If you use the Python service, update `PYTHON_SERVICE_URL` in the backend and `BACKEND_URL` in `novelty/python-service/`.
- Add all production URLs to `docs/architecture/` for your manuscript's deployment diagram.

---

## Useful Commands

### Docker (short version)

```bash
docker compose up -d                  # start services
docker compose down                   # stop and remove containers
docker compose logs -f backend        # follow backend logs
docker compose exec backend sh        # shell into the backend
docker compose exec mongodb mongosh   # open Mongo shell
```

Full list: [Docker Commands](#docker-commands).

### Backend / Frontend

| Task | Bun | npm |
| --- | --- | --- |
| Install dependencies | `bun install` | `npm install` |
| Dev server | `bun run dev` | `npm run dev` |
| Production build | `bun run build` | `npm run build` |
| Lint | `bun run lint` | `npm run lint` |
| Add a package | `bun add <pkg>` | `npm install <pkg>` |
| Remove a package | `bun remove <pkg>` | `npm uninstall <pkg>` |
| Update packages | `bun update` | `npm update` |
| Clean reinstall | `rm -rf node_modules bun.lock && bun install` | `rm -rf node_modules package-lock.json && npm install` |

### Mobile

```bash
flutter pub get                       # install dependencies
flutter run                           # run on device/emulator
flutter run -d chrome                 # run as web app
flutter build apk                     # Android release build
flutter build appbundle               # Android Play Store build
flutter build ios                     # iOS build (macOS only)
flutter test                          # run unit/widget tests
flutter analyze                       # static analysis
flutter doctor                        # environment check
```

### Python (optional)

```bash
python3 -m venv .venv                         # create virtual environment
source .venv/bin/activate                     # activate (macOS/Linux)
.venv\Scripts\Activate.ps1                    # activate (Windows PowerShell)
deactivate                                    # leave the virtual environment
pip install -r requirements.txt               # install dependencies
pip install <pkg>                             # add a package
pip freeze > requirements.txt                 # save current versions
uvicorn app.main:app --reload --port 8000     # run FastAPI with auto-reload
pytest                                        # run Python tests
```

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `Cannot connect to the Docker daemon` | Start Docker Desktop or run `sudo systemctl start docker` |
| Port `27018` already in use | Stop whatever uses it or change the host port in the compose file |
| Port `8085` / `5000` / `5173` / `8000` in use | Change the port in `.env` or the compose file |
| `MongoServerSelectionError` | Confirm the container is up (`docker compose ps`) and `MONGO_URI` is correct |
| A container keeps restarting or exits | Read the logs: `docker compose logs --tail=100 <service>` |
| Changed `.env` but the container still uses old values | `docker compose up -d --force-recreate <service>` (`restart` does not reload env) |
| Changed a Dockerfile but nothing changed | `docker compose up -d --build` (or `docker compose build --no-cache`) |
| `no configuration file provided: not found` | Run the command from `infra/`, or add `-f infra/docker-compose.yml` |
| Frontend hot reload not working in Docker (Windows/WSL) | Keep `CHOKIDAR_USEPOLLING=true` on the frontend service |
| Container name already in use | `docker compose down`, or `docker rm -f <container_name>` |
| Docker is eating disk space | `docker system df`, then `docker system prune` |
| CORS errors in browser | Check `CLIENT_URL` in `backend/.env` |
| `bun: command not found` | Install Bun, or use the npm commands instead. Both work |
| `npm: command not found` | Install Node.js LTS (it includes npm) |
| Two lockfiles in the repo (`bun.lock` and `package-lock.json`) | Pick one package manager, delete the other lockfile, reinstall |
| Dependencies behave strangely after switching Bun ↔ npm | Delete `node_modules` and the lockfile, then reinstall with one tool |
| Mobile app can't reach the API | Use your machine's LAN IP (not `localhost`) in `mobile/.env` when running on a physical device |
| Firebase init fails / `permission denied` | Check the service account key in `backend/.env`, and that Firebase APIs are enabled in the Google Cloud console |
| `uvicorn: command not found` | Activate the virtual environment (`source .venv/bin/activate`) and run `pip install -r requirements.txt` |
| `python: command not found` (macOS/Linux) | Use `python3` instead, or install Python from python.org |
| Backend can't reach the FastAPI service | Check `PYTHON_SERVICE_URL`; use `http://python_service:8000` inside Docker and `http://localhost:8000` from your host |
| FastAPI returns `422 Unprocessable Entity` | The request body does not match the Pydantic model; check field names and types in `/docs` |
| Tests hit the dev database | Check `MONGO_URI_TEST` and that the test container is running |
| `flutter doctor` shows issues | Follow its prompts; accept Android licenses with `flutter doctor --android-licenses` |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

1. Create a branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m "feat: add your feature"`
3. Run tests: `bun run test` (or `npm run test`), `flutter test`, and `pytest` if you touched `novelty/python-service/`
4. Push: `git push origin feature/your-feature`
5. Open a pull request

---

## Authors

Ian-nwb — [https://github.com/Ian-nwb](https://github.com/Ian-nwb)

## License

See [LICENSE](LICENSE).
