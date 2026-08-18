# Frontend Refactor Guide

## Why the current UI is plain HTML/CSS (no React)
- **Speed of iteration** – Hackathon prototypes need **zero build step**. A single `index.html` + `styles.css` + `app.js` can be edited and reloaded instantly, which is perfect for rapid UI tweaking.
- **Direct DOM control** – The demo simulates **self‑healing selector drift** by mutating the DOM directly. Vanilla JavaScript gives us immediate access without the virtual‑DOM indirection that React adds.
- **Zero dependencies** – No `npm install`, no bundler, no watch process. This makes the project runnable on any machine with just Node.

Once the proof‑of‑concept is stable, a **React + Vite** stack gives you:
- Component‑oriented architecture → easier maintainability and reuse.
- State management with hooks → clean async chat handling.
- Faster dev experience with hot‑module replacement.
- Better scalability for future features (user auth, theming, etc.).

---

## Recommended React Project Structure
Create a new **`frontend/react-app`** directory (outside of the static `frontend` folder) and bootstrap it with Vite:
```
frontend/
├─ react-app/                # <— NEW – React source code
│   ├─ src/
│   │   ├─ assets/           # images, SVGs, fonts
│   │   ├─ components/       # reusable UI pieces (Sidebar, Header, ChatBubble, CodeBlock, …)
│   │   ├─ pages/            # page‑level components (Copilot, Docs, ScraperOps, Settings)
│   │   ├─ hooks/            # custom React hooks (useChat, useScraper, useVectorSearch)
│   │   ├─ context/          # global contexts (Theme, Auth, Collector)
│   │   ├─ services/         # thin wrappers around `/api/*` endpoints (axios instance)
│   │   ├─ App.jsx            # root component + router
│   │   └─ main.jsx           # ReactDOM.render entry point
│   ├─ public/               # static favicons, robots.txt, etc.
│   ├─ vite.config.js        # Vite dev‑server proxy to `http://localhost:3001/api`
│   ├─ tailwind.config.js   # optional Tailwind CSS configuration
│   └─ index.html            # minimal HTML shell (only a `<div id="root"></div>`)
├─ static/                   # the old plain‑HTML build (kept for backward compatibility)
│   ├─ index.html
│   ├─ styles.css
│   └─ app.js
└─ README.md                 # this guide
```
**Why this layout?**
- `frontend/react-app` holds the **source code**; the compiled assets (`dist/`) are what the Express server will ultimately serve.
- `frontend/static` (or keep the original `frontend/` we already renamed) continues to act as a fallback static version – useful for quick demos or when the React dev server isn’t running.
- Separating **`src`** into components, pages, hooks, context, and services mirrors industry best‑practices and keeps the codebase modular.

---

## Step‑by‑Step Migration Plan
1. **Bootstrap the React app**
   ```bash
   cd /Users/vasukumar.langdecha/Documents/hackathone/frontend
   npx -y create-vite@latest react-app --template react
   ```
   This creates the skeleton described above.
2. **Install required runtime dependencies**
   ```bash
   cd react-app
   npm i axios react-router-dom@6
   # (optional) npm i -D tailwindcss postcss autoprefixer
   ```
3. **Configure Vite proxy** – edit `vite.config.js`:
   ```js
   export default defineConfig({
     server: {
       proxy: {
         '/api': {
           target: 'http://localhost:3001',
           changeOrigin: true,
           secure: false,
         },
       },
     },
   });
   ```
   This lets the React dev server forward all `/api/*` calls to the Express backend.
4. **Port the UI** – move the HTML markup into React components:
   - `Header.jsx` → top navigation bar.
   - `Sidebar.jsx` → navigation column with collector status.
   - `ChatFeed.jsx` + `MessageBubble.jsx` → RAG chat UI.
   - `CitationDrawer.jsx` → slide‑over drawer.
   - Keep the CSS you already have; either import it globally (`import '../styles.css'`) or migrate to **CSS modules** / **Tailwind** for better scoping.
5. **Replace the global script** (`app.js`) with **React hooks**:
   - `useChat` handles `POST /api/chat/rag` and updates the `messages` state.
   - `useVectorSearch` calls `/api/vector-search`.
   - `useScraper` wraps the scraper control‑plane endpoints.
6. **Update Express to serve the compiled React bundle**
   After building (`npm run build` inside `react-app`), the output lives in `react-app/dist`. Change the static folder in `server.js` to point to that folder **or** keep the existing `frontend/static` for a fallback:
   ```js
   const staticPath = path.join(__dirname, process.env.NODE_ENV === 'production' ? 'react-app/dist' : 'static');
   app.use(express.static(staticPath));
   ```
7. **Test locally**
   - Run the backend: `npm run start` (or `node server.js`).
   - In another terminal, start the React dev server: `npm run dev` inside `frontend/react-app`.
   - Open `http://localhost:5173` (default Vite port). You should see the same UI but powered by React.
8. **Production build**
   ```bash
   cd frontend/react-app
   npm run build   # → creates ./dist
   ```
   Restart the Express server; it will now serve the optimized static files.

---

## Quick Checklist for the Hackathon Submission
- [ ] **Frontend folder (`frontend/react-app`)** contains a complete React+Vite project.
- [ ] **Express server (`server.js`)** points to the compiled `dist/` folder for production.
- [ ] **README** (this file) is added to the repo’s root, explaining the migration steps.
- [ ] **Docs** (`docs/FRONTEND_MIGRATION_GUIDE.md`) already exists with the same information for future contributors.
- [ ] **All existing static assets** (`index.html`, `styles.css`, `app.js`) are retained under `frontend/static` for quick demo without building.

That’s everything you need to keep the current prototype working **while** preparing a clean, maintainable React codebase for the next phase. 🚀
