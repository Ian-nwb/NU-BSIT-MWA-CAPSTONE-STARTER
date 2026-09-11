# NU-CCIT Capstone Starter(ABANDONED PROJECT BABALIKAN NI IAN OCTOBER SORRYYYYYYYY)

A structured monorepo template for **National University CCIT** capstone projects following a multi-layer **MVC architecture** — covering backend, frontend, mobile, infrastructure, novelty technology, and academic manuscript.

---

## 📁 Repository Structure

```
NU-CCIT-Capstone-Starter/
├── backend/        # Express.js (CommonJS) REST API
├── frontend/       # React + Vite web client
├── mobile/         # Flutter mobile app
├── infra/          # MongoDB + Mongo Express on Docker (optional — see Database Setup)
├── novelty/        # Emerging technology layer (team-defined)
├── manuscript/     # Academic paper, diagrams, surveys, tables
├── guides/         # PDF setup/reference guides
└── .gitignore
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + Express.js (CommonJS) |
| Frontend | React + Vite |
| Mobile | Flutter (Dart) |
| Database | MongoDB (local via Docker **or** MongoDB Atlas) |
| DB Admin | Mongo Express (Docker only) / Atlas Data Explorer / **MongoDB Compass (GUI, works with either)** |
| Infrastructure | Docker + Docker Compose (optional) |
| Novelty | _(team-defined — see below)_ |

---

## 🗂 Folder Breakdown

### `backend/`
Express.js REST API using **CommonJS** (`require`/`module.exports`). Houses the **Models** (Mongoose schemas), **Controllers** (route handlers), and **Routes**. Connects to MongoDB via `MONGO_URI` in `.env` — this can point to a local Docker instance or directly to Atlas.

### `frontend/`
React web app scaffolded with **Vite**. The browser-based **View** layer that consumes the backend REST API.

### `mobile/`
**Flutter** mobile application (Dart). Cross-platform — builds to Android and iOS — and communicates with the same backend API.

### `infra/`
**Optional.** Docker Compose configuration that spins up:
- **MongoDB** — local database
- **Mongo Express** — a web-based MongoDB admin UI

Skip this folder entirely if you're using MongoDB Atlas — see [Database Setup](#-database-setup-choose-one) below.

### `novelty(rename to your novelty)/`
> ⚠️ **Intentionally left empty.**

Populated by the team based on their chosen emerging technology:

| Novelty Type | Examples |
|---|---|
| **AI / ML** | Model training, inference pipeline, dataset processing, recommendation engines, LLM-powered features (e.g. Gemini/OpenAI API integration), natural language search, document classification |
| **Blockchain** | Smart contracts, on-chain logic, wallet integration, NFT-based certificates/records, decentralized identity, supply-chain traceability ledgers |
| **Automation** | RPA scripts, workflow automation, scheduled jobs, auto-generated reports, email/SMS notification pipelines, CI/CD-triggered data tasks |
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
| **Other** | Anything not covered above — bring your own idea |

### `manuscript/`
All academic research assets, version-controlled alongside the code:

```
manuscript/
├── paper/        # .docx and .pdf thesis drafts
├── diagrams/     # .drawio / .png / .svg system diagrams
├── tables/       # .xlsx or .csv data tables
└── surveys/      # Questionnaires and evaluation forms
```

### `guides/`
PDF reference guides left behind for future peers/batches — setup walkthroughs, troubleshooting notes, or anything else worth handing down. Add new PDFs here as they come up.

---

## ✅ Prerequisites

Make sure the following are installed on your machine before proceeding:

| Tool | Download | Required for |
|---|---|---|
| Git | https://git-scm.com | Always |
| Node.js (v18+) | https://nodejs.org | Always |
| Docker Desktop | https://www.docker.com/products/docker-desktop | **Only if using local MongoDB** |
| Flutter SDK | https://docs.flutter.dev/get-started/install | Mobile |
| MongoDB Compass | https://www.mongodb.com/try/download/compass | **Optional — GUI for browsing/querying your DB (local or Atlas)** |

---

## 🚀 Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Ian-nwb/NU-CCIT-MVC-Capstone-Starter.git
cd NU-CCIT-Capstone-Starter
```

---

### 2. 🗄 Database Setup (choose one)

#### Option A — MongoDB Atlas (no Docker required)

1. Create a free account: https://www.mongodb.com/cloud/atlas/register
2. Set up a free **M0 cluster**
3. Under **Database Access**, create a database user with a username and password
4. Under **Network Access**, add your IP (or `0.0.0.0/0` to allow all — restrict this in production)
5. Click **Connect → Drivers**, copy the connection string:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```
6. Paste it as `MONGO_URI` in `backend/.env` (see step 3 below)

You can skip `infra/` entirely with this option — no Docker needed. Use Atlas's built-in Data Explorer, or connect with **MongoDB Compass** using the same `mongodb+srv://` string from step 5 (Atlas also has a "Connect → Compass" shortcut that gives you a ready-made connection string).

#### Option B — Local MongoDB via Docker

```bash
cd infra
docker compose up -d
```

| Service | URL |
|---|---|
| MongoDB | `mongodb://localhost:27018` |
| Mongo Express (admin UI) | http://localhost:8081 |

> Make sure Docker Desktop is running before this step.

You can also connect with **MongoDB Compass** using `mongodb://localhost:27018` for a richer GUI than Mongo Express (schema view, index management, aggregation pipeline builder, etc.).

To stop the containers:
```bash
docker compose down
```

---

### 3. Run the Backend

```bash
cd backend
npm install
cp .env.example .env
```

Set `MONGO_URI` in `.env` to either your Atlas connection string (Option A) or the local Docker URI (Option B), then:

```bash
npm run dev
```

The Express API will be available at **http://localhost:3000** (or whichever port is set in your `.env`).

---

### 4. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The React + Vite app will be available at **http://localhost:5173**.

> Set the backend API URL in your frontend `.env`:
> ```
> VITE_API_URL=http://localhost:3000
> ```

---

### 5. Run the Mobile App (Flutter)

```bash
cd mobile
flutter pub get
flutter run
```

> Make sure a device or emulator is running first. To list available devices:
> ```bash
> flutter devices
> ```

Update the API base URL in your Flutter project (typically in `lib/config/` or `lib/constants/`) to point to the running backend.

---

### 6. (Optional) Run the Novelty Layer

Refer to the `novelty/README.md` created by your team for setup instructions specific to your chosen technology.

---

## 🔄 Running Everything Together

**With Atlas (no Docker):**

| Terminal | Command |
|---|---|
| 1 — Backend | `cd backend && npm run dev` |
| 2 — Frontend | `cd frontend && npm run dev` |
| 3 — Mobile | `cd mobile && flutter run` |

**With local Docker MongoDB:**

| Terminal | Command |
|---|---|
| 1 — Infra | `cd infra && docker compose up -d` |
| 2 — Backend | `cd backend && npm run dev` |
| 3 — Frontend | `cd frontend && npm run dev` |
| 4 — Mobile | `cd mobile && flutter run` |

---

## 🧭 Using MongoDB Compass (optional, either setup)

[MongoDB Compass](https://www.mongodb.com/try/download/compass) is a desktop GUI for exploring and querying your data outside of Mongo Express / Atlas Data Explorer.

1. Download and install Compass
2. Open Compass and paste your connection string:
   - Local Docker: `mongodb://localhost:27018`
   - Atlas: the `mongodb+srv://...` string from Atlas → **Connect → Compass**
3. Click **Connect** to browse databases, collections, and documents, run queries, and build aggregation pipelines visually

---

## ☁️ Deployment — MongoDB Atlas

For actual deployment, use **MongoDB Atlas** regardless of which option you chose locally (free tier available). See [Database Setup — Option A](#option-a--mongodb-atlas-no-docker-required) above for account/cluster steps.

> Once connected to Atlas, the `infra/` Docker setup is only needed for local development. Mongo Express is a local admin tool and is not used in production. MongoDB Compass works with both local and Atlas connections, so it's a good universal admin tool to keep around.

---
