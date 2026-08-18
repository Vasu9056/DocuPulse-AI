# 🚀 DocuPulse AI — Self-Healing Documentation RAG & Developer Copilot

> **Zero-Hallucination AI Copilot powered by Bright Data Scraper Studio autonomous self-healing crawlers and high-precision vector RAG.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev)
[![Bright Data](https://img.shields.io/badge/Powered%20By-Bright%20Data%20DCA-orange.svg)](https://brightdata.com)

---

## 📌 Problem Statement

Fast-moving developer documentation (Next.js, LangChain, Supabase, etc.) updates constantly. Traditional web scrapers break when websites migrate frameworks (e.g. Docusaurus ➔ Mintlify) or change CSS selectors. Consequently:
1. **LLMs Hallucinate Outdated APIs**: Developers receive deprecated code patterns from older training data.
2. **Scraper Maintenance Burden**: Engineering teams waste hours fixing broken scraper selectors.
3. **Unverifiable Code**: Developers lack source citations to verify whether an AI-generated snippet is accurate.

---

## 💡 Solution: DocuPulse AI

**DocuPulse AI** combines **Bright Data Scraper Studio** with **Vector RAG**:
- 🛡️ **Autonomous Self-Healing Scrapers**: Uses natural language field descriptions in Scraper Studio (`c_msxjxlwm78wlkksy4`) to auto-repair broken CSS selectors when doc sites redesign, achieving **0 downtime**.
- 🎯 **Zero-Hallucination Verified Citation RAG**: Every generated code snippet is linked to an interactive **Slide-Over Citation Drawer** with exact cosine similarity match scores and source links.
- ⚡ **API Breaking Changes Radar**: Continuously diffs newly scraped documentation to detect deprecated methods (e.g., Next.js 15 async `cookies()`).
- 🌐 **Residential Proxy Unblocking**: Routes through Bright Data's global residential IP network to bypass rate limits and anti-bot protections.

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────┐
│               DOCUPULSE AI ARCHITECTURE                │
└────────────────────────────────────────────────────────┘

    [Documentation Sites] (Next.js, LangChain, Supabase)
               │
               ▼
    [Bright Data Scraper Studio] (Collector: c_msxjxlwm78wlkksy4)
    ├── Residential Proxy Pool (US/EU Unblocking Nodes)
    └── Autonomous Self-Healing Engine (Auto-Repairs DOM Drifts)
               │
               ▼ Structured Markdown Chunks
    [Express Backend API] (Port 3001)
    ├── /api/chat/rag         (Vector Search + Gemini 1.5 Flash)
    ├── /api/vector-search    (Cosine Similarity Inspector)
    ├── /api/scraper/trigger  (DCA Collector Execution)
    ├── /api/scraper/health   (Proxy Health & Uptime)
    ├── /api/breaking-diff    (API Version Diff Radar)
    └── /api/doc-stores       (Managed Libraries Metadata)
               │
               ▼ REST API / Vite Proxy
    [React 18 + Vite Frontend] (Port 5173)
    ├── Grounded RAG Copilot Chat
    ├── Slide-Over Verified Citation Drawer
    ├── Interactive Self-Healing Scraper Ops Terminal
    ├── API Breaking Changes Radar Diff Viewer
    ├── Studio Schema Builder & Workflow Visualizer
    └── Developer API SDK Code Generation (cURL / LangChain / LlamaIndex)
```

---

## 📁 Project Structure

```
hackathone/
├── backend/
│   ├── src/
│   │   ├── config/              # Centralized env config & API tokens
│   │   ├── controllers/         # RAG, Scraper, and Doc controllers
│   │   ├── data/                # Seed vector store & knowledge base
│   │   ├── routes/              # Express API route modules
│   │   └── services/            # Bright Data DCA, Vector, & RAG services
│   ├── .env.example             # Safe template for environment variables
│   ├── package.json             # Backend dependencies (express, axios, cors, dotenv)
│   └── server.js                # Express entry point (Port 3001)
│
├── frontend/
│   ├── src/
│   │   ├── components/          # LandingPage, Sidebar, TopHeader, SearchModal, CitationDrawer, Toast
│   │   ├── services/
│   │   │   └── api.js           # API client connecting to backend
│   │   ├── App.jsx              # 100% Dynamic React application
│   │   ├── main.jsx             # React bootstrap
│   │   └── styles.css           # Production stylesheet
│   ├── index.html               # Vite HTML entry
│   ├── vite.config.js           # Vite dev server with proxy to backend
│   ├── vercel.json              # Vercel deployment rewrite rules
│   └── package.json             # React 18 + Vite dependencies
│
├── docs/                        # Project blueprint, guides, and run instructions
├── HOW_TO_RUN.txt               # Step-by-step local execution instructions
├── .gitignore                   # Comprehensive secrets & build ignore rules
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (bundled with Node.js)

### 1. Clone Repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Configure Backend Environment
```bash
cd backend
cp .env.example .env
```
Edit `backend/.env` with your API credentials:
```env
PORT=3001
BRIGHT_DATA_API_TOKEN=your_bright_data_api_token
BRIGHT_DATA_COLLECTOR_ID=c_msxjxlwm78wlkksy4
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Start Backend Server
```bash
cd backend
npm install
npm start
```
*Backend runs on **`http://localhost:3001`**.*

### 4. Start Frontend Server
In a new terminal tab:
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on **`http://localhost:5173`**.*

Open **`http://localhost:5173`** in your browser.

---

## 🌐 Cloud Deployment Guide

### Deploy Backend (e.g. Render.com / Railway)
1. Create a new **Web Service** pointing to this repository.
2. Set **Root Directory**: `backend`
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node server.js`
5. Add **Environment Variables**:
   * `PORT=3001`
   * `BRIGHT_DATA_API_TOKEN=...`
   * `BRIGHT_DATA_COLLECTOR_ID=c_msxjxlwm78wlkksy4`
   * `GEMINI_API_KEY=...`

### Deploy Frontend (e.g. Vercel / Netlify)
1. Create a new project on **Vercel** / **Netlify** importing this repository.
2. Set **Root Directory**: `frontend`
3. Set **Framework Preset**: `Vite`
4. Set **Build Command**: `npm run build`
5. Set **Output Directory**: `dist`
6. Add **Environment Variable**:
   * `VITE_API_URL=https://your-deployed-backend-url.onrender.com/api`

---

## 🔑 Key Features Demonstrated in Hackathon

| Feature | Description |
| :--- | :--- |
| **Bright Data DCA Trigger** | Triggers collector `c_msxjxlwm78wlkksy4` with residential proxy unblocking. |
| **Self-Healing Simulation** | Simulates doc framework migration with dynamic selector re-derivation in Scraper Ops. |
| **Verified Citation Drawer** | Clickable source citations with cosine confidence score, raw scraped markdown, and links. |
| **API Diff Radar** | Side-by-side breaking change diffs for Next.js 15, LangChain v0.3, and Supabase pgvector. |
| **Developer SDK Snippets** | Ready-to-use integration code for cURL, LangChain (Node.js), and LlamaIndex (Python). |
| **Global CMD+K Search** | Keyboard-driven navigation and instant query execution. |

---

## 📜 License
MIT License. Built for the Hackathon.
