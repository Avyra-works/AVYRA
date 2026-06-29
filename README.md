# Avyra Agency Website — Production Rebuild

This is a production-ready, full-stack implementation of the Avyra Minimalist Agency Stitch design system, structured for maximum performance, responsiveness, and clean architecture.

## Tech Stack
* **Frontend**: React (Vite), Tailwind CSS (ES6 Modules, JavaScript)
* **Backend**: Node.js & Express REST API
* **Database**: MongoDB (via Mongoose)
* **Forms Integration**: Web3Forms (Secure HTML Email forwarding)

---

## Project Structure
```text
├── frontend/                     # React client (Vite setup)
│   ├── src/
│   │   ├── components/           # Reusable layout and UI elements
│   │   ├── hooks/                # Custom hooks (e.g. useScrollReveal)
│   │   ├── layouts/              # Template wrappers (MainLayout)
│   │   ├── pages/                # Content pages (Home)
│   │   ├── services/             # Axios API service handlers
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css             # Tailwind setup and keyframe animations
│   │   └── main.jsx
│   ├── tailwind.config.js        # Avyra custom tokens configuration
│   └── package.json
│
├── backend/                      # Node/Express database API
│   ├── config/                   # MongoDB connection configuration
│   ├── models/                   # Mongoose schemas (Contact, Lead)
│   ├── server.js                 # API server bootstrapper
│   └── package.json
│
├── package.json                  # Root monorepo concurrency coordinator
└── README.md
```

---

## Getting Started

### Prerequisites
1. Install **Node.js** (v18 or higher recommended).
2. Install and start a **MongoDB** local service (`mongodb://127.0.0.1:27017`) or configure an external MongoDB connection string.

### Setup Instructions

1. **Install Dependencies**:
   Install all dependencies for root, frontend, and backend with a single command from the project root:
   ```bash
   npm run install-all
   ```

2. **Configure Environment Variables**:
   * **Backend**: Copy `backend/.env.example` to `backend/.env` and update the port or database URI if necessary.
   * **Frontend**: Copy `frontend/.env.example` to `frontend/.env` and replace `your_web3forms_key_here` with your public Web3Forms access key. Get one instantly at [web3forms.com](https://web3forms.com/).

3. **Run in Development Mode**:
   Start both backend API server and frontend React client concurrently with one command:
   ```bash
   npm run dev
   ```
   * The React client will launch at `http://localhost:5173`.
   * The backend API server will run at `http://localhost:5000`.

---

## API Endpoints Reference
* `GET /api/health` — Checks status of Express app.
* `POST /api/contact` — Saves contact inquiries directly into MongoDB database.
* `POST /api/leads` — Captures marketing leads directly into MongoDB database.
