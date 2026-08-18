# ⚛️ React Frontend Migration & Architecture Guide
**DocuPulse AI — Self-Healing Documentation RAG & Developer Copilot**

This guide explains the architectural decision behind our current prototype and outlines the exact transition path to a modern React/Vite SaaS frontend structure.

---

## 1. Why the Prototype Uses Vanilla HTML/CSS/JS (Under-the-Hood)
Before transitioning to React, it is important to understand why the visual proof-of-concept (PoC) was built in native HTML, CSS, and JS:
1. **Zero Compilation Overhead:** Web hackathons value rapid iterative changes. Vanilla files load instantly in the browser without Webpack/Vite build steps, transpiling, or dev-server dependencies.
2. **Direct DOM Control for Simulations:** Simulating a "DOM Drift" (Docusaurus ➔ Mintlify selector repair) and live terminal logs requires fine-grained, instantaneous DOM updates. Vanilla JS handles direct layout overrides without React's virtual DOM reconciliation lag.
3. **Standalone Portability:** The prototype runs directly from the filesystem (`file://`) with complete UI transitions, styling, and offline simulations intact, making it 100% reliable for judges to evaluate offline.

---

## 2. Recommended React Project Structure (Vite + React)
As we scale to a production-ready SaaS product, the frontend should be decoupled into a separate React package. Below is the recommended enterprise-level structure for the `frontend/` directory:

```
frontend/
├── public/                         # Static assets (favicons, logos)
├── src/
│   ├── assets/                     # Visual design files & custom SVGs
│   ├── components/                 # Atomic, reusable UI components
│   │   ├── Sidebar.jsx             # Left-hand navigation pane & collector status
│   │   ├── Header.jsx              # Global search trigger, status pill, credit counter
│   │   ├── ChatFeed.jsx            # Scrollable chat logs (user/assistant bubbles)
│   │   ├── CitationDrawer.jsx      # Slide-over sidebar showing scraped source content
│   │   ├── VectorSearch.jsx        # Live cosine similarity distance calculator
│   │   ├── ScraperOps.jsx          # Circular gauge & self-healing DOM drift diff
│   │   └── CodeBlock.jsx           # Syntax-highlighted code container with copy button
│   │
│   ├── views/                      # Layout/Page modules (Views mapped in router)
│   │   ├── LandingPage.jsx         # Full-width pitch, stats, and get-started trigger
│   │   ├── Dashboard.jsx           # Aggregated workspace views switcher
│   │   ├── APIRadar.jsx            # Side-by-side breaking changes visual code diffs
│   │   └── Settings.jsx            # API key, notification preferences, and danger zones
│   │
│   ├── hooks/                      # Custom React hooks for business logic
│   │   ├── useRAGChat.js           # Handles message streams, citation bindings, and scopes
│   │   └── useScraper.js           # Manages DCA trigger polling & selector recovery logs
│   │
│   ├── context/                    # Context Providers for global state management
│   │   ├── AppContext.jsx          # Active view state, collector ID, credits
│   │   └── ThemeContext.jsx        # Light/Dark mode state and DOM classes
│   │
│   ├── services/                   # API clients calling Express backend endpoints
│   │   └── api.js                  # Axios client configured with baseUrl /api
│   │
│   ├── index.css                   # Global CSS variables & Tailwind directives
│   ├── App.jsx                     # Core layout shell & view router
│   └── main.jsx                    # React client mounting node
│
├── vite.config.js                  # Vite compiler configurations
├── package.json                    # React client scripts & dependencies
└── tailwind.config.js              # Utility class design tokens (optional)
```

---

## 3. Step-by-Step React Migration Roadmap

### Phase 1: Initialize Vite React & Clean Directory
1. Run Vite initializer in a temporary directory or directly bootstrap:
   ```bash
   npm create vite@latest frontend -- --template react
   ```
2. Move static assets from the current prototype (SVG icons, graphics) to the `public/` directory of the new project.

### Phase 2: Design System & Styling Porting
1. Copy the CSS custom properties (`:root` variables) from `styles.css` into `src/index.css`.
2. Map current design tokens (slate colors, transitions, border radiuses) to Tailwind CSS variables inside `tailwind.config.js` or keep modular vanilla CSS classes.
3. Establish utility components for common items: `.btn`, `.badge`, `.card`, and `.input`.

### Phase 3: Componentization (Breaking Down index.html)
1. **App Shell Layout:** Break the layout into `<Sidebar />`, `<Header />`, and a `<main>` container displaying the active view.
2. **Atomic States:**
   - Extract the chat logic into `<ChatFeed />` and `<MessageBubble />`.
   - Convert the inline SVGs into functional React components inside a `src/components/icons/` folder.
   - Convert the slide-over drawer into `<CitationDrawer />` triggered by clicking any item in a local `citations` state array.

### Phase 4: State Hooking (App State & Custom Hooks)
1. **AppContext (`src/context/AppContext.jsx`):**
   - Store global variables: `collectorId` (`c_msxjxlwm78wlkksy4`), `credits` (`$52.00`), `healthScore` (`99%`), and `theme` (`dark`/`light`).
2. **`useRAGChat` Hook:**
   - Manage `messages` array: `[{ sender: 'user', text: '...' }, { sender: 'assistant', text: '...', citations: [...] }]`.
   - Handle API fetch triggers to backend POST `/api/chat/rag`.

### Phase 5: Server Integration & Proxying
Configure the Vite development server proxy in `vite.config.js` to route backend API requests:
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
});
```
This enables `fetch('/api/chat/rag')` in the React frontend to seamlessly hit your Node.js Express server on port 3001 during local development.
