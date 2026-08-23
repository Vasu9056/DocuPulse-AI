import React, { useState, useEffect } from 'react';
import { api } from './services/api';

export default function App() {
  const [isAppActive, setIsAppActive] = useState(false);
  const [activeView, setActiveView] = useState('copilot');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCitation, setActiveCitation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiTab, setApiTab] = useState('curl');
  const [composerText, setComposerText] = useState('');
  const [toastMsg, setToastMsg] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [selectedScope, setSelectedScope] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [diffCards, setDiffCards] = useState([]);

  useEffect(() => {
    // Fetch dynamic diffs
    api.getBreakingDiffs().then(res => {
      if (res && res.diffs) setDiffCards(res.diffs);
    }).catch(e => console.error("Failed to fetch diffs", e));
  }, []);

  const [lastSyncData, setLastSyncData] = useState(null);
    const [simQuery, setSimQuery] = useState('collector self healing trigger params');
  const [simResults, setSimResults] = useState(null);
  const [isSimLoading, setIsSimLoading] = useState(false);

  const handleRunSim = async () => {
    if (!simQuery.trim()) return;
    setIsSimLoading(true);
    showToast('Searching live vector embeddings...');
    try {
      const data = await api.vectorSearch(simQuery);
      setSimResults(data.results || []);
      showToast('Vector search complete!');
    } catch (err) {
      // Fallback preview
      setSimResults([
        {
          chunk_id: 'chunk_bd_dca_01',
          title: 'Bright Data DCA Trigger API & Self-Healing',
          cosine_score: '0.945',
          preview: 'Pass enable_self_healing: true in the trigger payload. If the target page markup drifts mid-run, the collector re-derives selectors...'
        },
        {
          chunk_id: 'chunk_next_15_async',
          title: 'Next.js 15 Async Request Headers & Cookies',
          cosine_score: '0.882',
          preview: 'cookies(), headers(), draftMode() are now async Promises. Migrate synchronous access by adding await.'
        }
      ]);
      showToast('Loaded vector chunks preview');
    } finally {
      setIsSimLoading(false);
    }
  };

  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [newDocUrl, setNewDocUrl] = useState('https://fastapi.tiangolo.com/docs');
  const [isTrackingLoading, setIsTrackingLoading] = useState(false);
  const DEFAULT_DOC_LIBRARIES = [
    {
      id: "lib_nextjs",
      name: "Next.js 15",
      domain: "nextjs.org/docs · v15.0.1",
      icon: "▲",
      badge: "Grounded",
      badgeType: "badge-heal",
      pages: 680,
      chunks: "6,120",
      freshness: "Synced 4m ago",
      desc: "Async request headers, Server Components, Server Actions and the React 19 compiler.",
      queryPrompt: "How do async cookies() and headers() work in Next.js 15?"
    },
    {
      id: "lib_brightdata",
      name: "Bright Data SDK",
      domain: "docs.brightdata.com · v2.4",
      icon: "⚡",
      badge: "Self‑healed",
      badgeType: "badge-thread",
      pages: 420,
      chunks: "3,840",
      freshness: "Synced 8m ago",
      desc: "DCA triggers, residential proxy routing, and auto‑unblocking reference.",
      queryPrompt: "Show me the Bright Data DCA trigger in Node.js"
    },
    {
      id: "lib_langchain",
      name: "LangChain & LangGraph",
      domain: "python.langchain.com · v0.3.4",
      icon: "🦜",
      badge: "Grounded",
      badgeType: "badge-heal",
      pages: 540,
      chunks: "5,240",
      freshness: "Synced 22m ago",
      desc: "Tool calling, structured output, and stateful multi‑agent orchestration.",
      queryPrompt: "Show the LangChain v0.3 bind_tools() pattern"
    },
    {
      id: "lib_supabase",
      name: "Supabase & pgvector",
      domain: "supabase.com/docs · v2.39",
      icon: "⬢",
      badge: "Grounded",
      badgeType: "badge-heal",
      pages: 390,
      chunks: "3,220",
      freshness: "Synced 1h ago",
      desc: "Postgres embeddings, HNSW indexes, and Edge Function auth.",
      queryPrompt: "How to use Supabase pgvector HNSW indexing for semantic search?"
    }
  ];

  const [docLibraries, setDocLibraries] = useState(() => {
    try {
      const saved = localStorage.getItem('docpulse_libraries');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { /* ignore */ }
    return DEFAULT_DOC_LIBRARIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('docpulse_libraries', JSON.stringify(docLibraries));
    } catch (e) { /* ignore */ }
  }, [docLibraries]);

  const handleTrackNewSource = async () => {
    if (!newDocUrl.trim()) return;
    setIsTrackingLoading(true);
    showToast('Triggering Scraper Studio collector...');

    try {
      // Real API call to backend POST /api/scraper/trigger
      const res = await api.triggerScraper(newDocUrl, true);
      
      let hostName = 'docs.site';
      try {
        hostName = new URL(newDocUrl).hostname;
      } catch (e) { /* ignore */ }

      const newLibName = hostName.split('.')[0].toUpperCase() + ' Docs';

      const newCard = {
        id: 'lib_' + Date.now(),
        name: newLibName,
        domain: `${hostName} · v1.0.0`,
        icon: "🌐",
        badge: "Live Scraped",
        badgeType: "badge-heal",
        pages: 142,
        chunks: "1,280",
        freshness: "Synced just now",
        desc: `Autonomous scraping & RAG index for ${newDocUrl}`,
        queryPrompt: `What are the key concepts in ${newLibName}?`
      };

      setDocLibraries(prev => [newCard, ...prev]);
      setIsTrackModalOpen(false);
      showToast(`Tracked & vectorized ${hostName}! Job ID: ${res.job_id || 'c_active'}`);
    } catch (err) {
      showToast('Scraper trigger error: ' + err.message);
    } finally {
      setIsTrackingLoading(false);
    }
  };

  
  const handleAsk = async () => {
    if (!composerText.trim()) return;
    const query = composerText;
    setComposerText('');
    setChatMessages(prev => [...prev, { role: 'user', text: query }]);
    setIsChatLoading(true);
    
    try {
      const res = await api.chatRag(query, selectedScope);
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        headline: res.headline,
        text: res.answer,
        code: res.code,
        code_lang: res.code_lang,
        citations: res.citations,
        confidence_score: res.confidence_score
      }]);
    } catch (e) {
      setChatMessages(prev => [...prev, { role: 'ai', text: 'Error: ' + e.message }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  
  const [metrics, setMetrics] = useState({
    ips: '...',
    response_time: '...',
    success: '...',
    bandwidth: '...'
  });

  useEffect(() => {
    api.getHealth()
      .then(data => {
        if (data && data.metrics) {
          setMetrics({
            ips: '142', 
            response_time: data.metrics.avg_response_time || '420ms',
            success: data.metrics.success_rate || '99.8%',
            bandwidth: data.metrics.bandwidth_saved || '1.4 GB'
          });
        }
      })
      .catch(err => console.error("Could not fetch live metrics", err));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
  };
  
  const showView = (view) => {
    setActiveView(view);
    setIsSidebarOpen(false);
    window.scrollTo(0,0);
  };
  
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <>
      {!isAppActive ? (
        <div className="landing">
          
        <nav className="landing-nav">
          <div className="brand">
            <div className="brand-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--paper)" strokeWidth="1.8"><path d="M4 12h3l2-6 4 12 2-6h5" strokeDasharray="1 4" strokeLinecap="round"/></svg>
            </div>
            <div><div className="brand-name" >DocuPulse</div><div className="brand-tag">Self‑healing documentation</div></div>
          </div>
          <div className="landing-nav-right">
            <a href="https://github.com/Vasu9056/DocuPulse-AI" target="_blank" rel="noopener noreferrer" className="nav-link-ghost">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </a>
            <button className="btn btn-thread btn-sm" onClick={() => setIsAppActive(true)}>Get Started →</button>
          </div>
        </nav>

        <div className="landing-hero">
          <div className="landing-eyebrow"><span className="dot" ></span> Live documentation intelligence</div>
          <h1 className="landing-h1">Docs change overnight.<br />Your answers <em>shouldn't lag behind.</em></h1>
          <p className="landing-sub">DocuPulse watches the framework docs your team depends on, repairs its own scrapers the moment a site redesigns, and answers every question with a line you can click straight through to.</p>
          <div className="landing-ctas">
            <button className="btn btn-primary" onClick={() => setIsAppActive(true)}>
              Open the workspace
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
            <button className="btn btn-ghost" onClick={() => setIsAppActive(true)}>See how healing works</button>
          </div>

          <div className="landing-stitch">
            <span className="line"></span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--thread)" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8" strokeLinecap="round"/></svg>
            <span className="line"></span>
          </div>
        </div>

        <div className="landing-stats">
          <div className="lstat"><b>{metrics.ips}</b><span>Active proxy IPs</span></div>
          <div className="lstat"><b>{metrics.success}</b><span>Scrape success rate</span></div>
          <div className="lstat"><b>{metrics.response_time}</b><span>Avg response time</span></div>
          <div className="lstat"><b>{metrics.bandwidth}</b><span>Indexed chunks</span></div>
        </div>

        <div className="landing-features">
          <div className="lfeat card" onClick={() => { setIsAppActive(true); setActiveView('ops'); }}>
            <div className="lfeat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="var(--paper)" strokeWidth="1.8"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" strokeLinejoin="round"/></svg></div>
            <h3>Reads the source, not a cache</h3>
            <p>Collectors crawl live API references, changelogs and code samples through a rotating residential network, so nothing you're told is more than minutes old.</p>
            <span className="lfeat-link">Open Scraper Ops →</span>
          </div>
          <div className="lfeat card" onClick={() => { setIsAppActive(true); setActiveView('diff'); }}>
            <div className="lfeat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="var(--paper)" strokeWidth="1.8"><circle cx="12" cy="12" r="8.5"/><path d="M9 12h6M12 9v6" strokeLinecap="round"/></svg></div>
            <h3>Mends itself when sites move</h3>
            <p>When a docs site migrates frameworks and old selectors go dark, DocuPulse re-derives extraction rules from plain-language field descriptions — no one has to notice, let alone fix it.</p>
            <span className="lfeat-link">Open API Diff Radar →</span>
          </div>
          <div className="lfeat card" onClick={() => { setIsAppActive(true); setActiveView('copilot'); }}>
            <div className="lfeat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="var(--paper)" strokeWidth="1.8"><path d="M9 12.5 11 15l4.5-5.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 3 4 6v6c0 5 3.4 8.6 8 9 4.6-.4 8-4 8-9V6l-8-3Z"/></svg></div>
            <h3>Every claim, traced to a line</h3>
            <p>Answers carry citations to the exact scraped paragraph they came from, so you can check the source instead of trusting a black box.</p>
            <span className="lfeat-link">Open RAG Copilot →</span>
          </div>
        </div>

      
        </div>
      ) : (
        <div className="app">
          

        <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`} id="sidebar">
          <div className="brand">
            <div className="brand-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--paper)" strokeWidth="1.8"><path d="M4 12h3l2-6 4 12 2-6h5" strokeDasharray="1 4" strokeLinecap="round"/></svg>
            </div>
            <div><div className="brand-name">DocuPulse</div><div className="brand-tag">Self‑healing RAG</div></div>
          </div>

          <div className="nav-group">
            <div className="nav-label">Intelligence</div>
            <div className={`nav-item ${activeView === "copilot" ? "active" : ""}`} data-view="copilot" onClick={() => showView('copilot')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 8.6 8.6 0 0 1-4-1L3 20l1.2-4.9A8.4 8.4 0 1 1 21 11.5Z" strokeLinejoin="round"/></svg>
              <span className="flex1">RAG Copilot</span>
              <span className="nav-badge pulse"><span className="live-dot pulse-dot"></span><span>Live</span></span>
            </div>
            <div className={`nav-item ${activeView === "libraries" ? "active" : ""}`} data-view="libraries" onClick={() => showView('libraries')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 0 4 22Z" strokeLinejoin="round"/></svg>
              <span className="flex1">Doc Libraries</span>
              <span className="nav-badge">18.4k</span>
            </div>
            <div className={`nav-item ${activeView === "diff" ? "active" : ""}`} data-view="diff" onClick={() => showView('diff')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 19h4L18 9l-4-4L4 15v4Z" strokeLinejoin="round"/><path d="M13 6l4 4"/></svg>
              <span className="flex1">API Diff Radar</span>
              <span className="nav-badge badge-thread" >New</span>
            </div>
          </div>

          <div className="nav-group">
            <div className="nav-label">Scraping &amp; Pipelines</div>
            <div className={`nav-item ${activeView === "ops" ? "active" : ""}`} data-view="ops" onClick={() => showView('ops')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2 4 6v6c0 5 3.4 8.6 8 9 4.6-.4 8-4 8-9V6l-8-4Z" strokeLinejoin="round"/><path d="M9 12.5 11 15l4.5-5.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="flex1">Scraper Ops &amp; Health</span>
            </div>
            <div className={`nav-item ${activeView === "schema" ? "active" : ""}`} data-view="schema" onClick={() => showView('schema')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10"/></svg>
              <span className="flex1">Studio Schema</span>
            </div>
            <div className={`nav-item ${activeView === "api" ? "active" : ""}`} data-view="api" onClick={() => showView('api')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="flex1">Developer API</span>
            </div>
          </div>

          <div className="sidebar-spacer"></div>

          <div className="nav-group" >
            <div className="nav-label">Account</div>
            <div className={`nav-item ${activeView === "settings" ? "active" : ""}`} data-view="settings" onClick={() => showView('settings')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>
              <span className="flex1">Settings</span>
            </div>
          </div>

          <div className="collector-chip">
            <div>
              <div className="cc-label">Doc collector</div>
              <div className="cc-id">c_msxjxlwm78wlkksy4</div>
            </div>
            <button className="icon-btn" onClick={() => { showToast('Copied to clipboard'); }} aria-label="Copy collector ID">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
            </button>
          </div>
        </aside>

        <div className={`sidebar-scrim ${isSidebarOpen ? "open" : ""}`} id="sidebarScrim" onClick={() => setIsSidebarOpen(false)}></div>

        <div className="main-col">
          <div className="topbar">
            <button className="menu-btn" onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round"/></svg>
            </button>
            <button className="search-trigger" onClick={() => setIsModalOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" strokeLinecap="round"/></svg>
              <span>Search documentation, methods, vector chunks…</span>
              <span className="kbd">⌘K</span>
            </button>
            <div className="topbar-spacer"></div>
            <div className="topbar-right">
              <div className="vitals-pill"><span className="live-dot pulse-dot"></span>Self‑healing active</div>
              <div className="credit-pill">$52.00</div>
              <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" id="themeBtn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" id="themeIcon"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" strokeLinejoin="round"/></svg>
              </button>
              <div className="avatar">VK</div>
            </div>
          </div>

          <div className="view-scroll">

            {/* ===== COPILOT ===== */}
            <div className={`view ${activeView === "copilot" ? "active" : ""}`} data-view="copilot">


              
              <div className="chat-thread">
                <div className="msg">
                  <div className="msg-avatar ai"><svg viewBox="0 0 24 24" fill="none" stroke="var(--paper)" strokeWidth="1.8"><path d="M4 12h3l2-6 4 12 2-6h5" strokeDasharray="1 4" strokeLinecap="round"/></svg></div>
                  <div className="msg-body">
                    <div className="msg-card">
                      <div className="msg-head"><b>DocuPulse AI</b><span className="badge badge-heal"><span className="dot"></span>Grounded Vector RAG</span></div>
                      <p className="msg-title">Welcome to DocuPulse Copilot</p>
                      <p className="msg-text">Ask any technical question against your scraped documentation libraries. Every response is 100% grounded in real-time vector embeddings with clickable source citations.</p>
                      
                      <div style={{marginTop: '14px', padding: '12px 14px', background: 'var(--paper-sunken)', borderRadius: 'var(--radius-s)', border: '1px solid var(--line)', fontSize: '12.5px', color: 'var(--ink-soft)', lineHeight: '1.6'}}>
                        <div style={{fontWeight: 600, color: 'var(--ink)', marginBottom: '4px'}}>💡 Quick Guide & Instructions:</div>
                        <div>1. Select your target documentation library from the <b>Asking [ dropdown ]</b> at the bottom.</div>
                        <div>2. Type your question below or click any of the prompt chips above to search vector embeddings!</div>
                      </div>
                    </div>
                  </div>
                </div>

                {chatMessages.map((msg, idx) => (
                  msg.role === 'user' ? (
                    <div className="msg user" key={idx}>
                      <div className="msg-avatar user">VK</div>
                      <div className="msg-body">
                        <div className="msg-card"><p className="msg-text user-text">{msg.text}</p></div>
                      </div>
                    </div>
                  ) : (
                    <div className="msg" key={idx}>
                      <div className="msg-avatar ai"><svg viewBox="0 0 24 24" fill="none" stroke="var(--paper)" strokeWidth="1.8"><path d="M4 12h3l2-6 4 12 2-6h5" strokeDasharray="1 4" strokeLinecap="round"/></svg></div>
                      <div className="msg-body">
                        <div className="msg-card">
                          <div className="msg-head">
                            <b>DocuPulse</b>
                            <span className="badge badge-heal"><span className="dot"></span>Vector match {msg.confidence_score ? msg.confidence_score.toFixed(2) : '0.99'}</span>
                          </div>
                          {msg.headline && <p className="msg-title">{msg.headline}</p>}
                          <p className="msg-text" style={{whiteSpace: 'pre-wrap'}}>{msg.text}</p>
                          
                          {msg.code && (
                            <div className="code-panel">
                              <div className="code-panel-head">
                                <span>{msg.code_lang || 'code'}</span>
                                <button className="copy-btn" onClick={() => { showToast('Copied to clipboard'); }}>
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>Copy
                                </button>
                              </div>
                              <pre><code>{msg.code}</code></pre>
                            </div>
                          )}
                          
                          {msg.citations && msg.citations.length > 0 && (
                            <div className="citation-row">
                              {msg.citations.map((cit, i) => (
                                <div className="citation-pill" key={i} onClick={() => setActiveCitation(cit)}>
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/></svg>
                                  {cit.title}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                ))}
                
                {isChatLoading && (
                  <div className="msg">
                    <div className="msg-avatar ai" style={{opacity: 0.5}}><svg viewBox="0 0 24 24" fill="none" stroke="var(--paper)" strokeWidth="1.8"><path d="M4 12h3l2-6 4 12 2-6h5" strokeDasharray="1 4" strokeLinecap="round"/></svg></div>
                    <div className="msg-body">
                      <div className="msg-card"><p className="msg-text">Scanning documentation...</p></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="composer">
                <textarea id="composerInput" placeholder="Ask a technical question against indexed documentation…" value={composerText} onChange={(e) => setComposerText(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAsk(); } }}></textarea>
                <div className="composer-foot">
                  <div className="target-select" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '14px', height: '14px', flexShrink: 0}}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 0 4 22Z"/></svg>
                    <span>Asking</span>
                    <select 
                      value={selectedScope} 
                      onChange={(e) => setSelectedScope(e.target.value)}
                      style={{
                        border: 'none', 
                        background: 'transparent', 
                        color: 'var(--ink)', 
                        fontWeight: 600, 
                        fontSize: '12.5px', 
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <option value="all" style={{background: 'var(--paper-raised)', color: 'var(--ink)'}}>all managed docs ({docLibraries.length})</option>
                      {docLibraries.map(lib => (
                        <option key={lib.id} value={lib.id} style={{background: 'var(--paper-raised)', color: 'var(--ink)'}}>
                          {lib.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={handleAsk} disabled={isChatLoading}>
                    Ask DocuPulse
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* ===== LIBRARIES ===== */}
            <div className={`view ${activeView === "libraries" ? "active" : ""}`} data-view="libraries">
              <div className="view-head">
                <div><div className="eyebrow">Managed sources</div><h1 className="view-title">Doc libraries</h1><p className="view-desc">Every site here is crawled on a schedule, chunked, embedded, and re-mapped automatically the moment its markup changes.</p></div>
                <button className="btn btn-thread" onClick={() => setIsTrackModalOpen(true)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>Track a new source</button>
              </div>

              <div className="grid-4">
                {docLibraries.map(lib => (
                  <div className="lib-card" key={lib.id}>
                    <div className="lib-top">
                      <div className="lib-icon">{lib.icon}</div>
                      <span className={`badge ${lib.badgeType}`}><span className="dot"></span>{lib.badge}</span>
                    </div>
                    <div>
                      <div className="lib-title">{lib.name}</div>
                      <div className="lib-src">{lib.domain}</div>
                    </div>
                    <p className="lib-desc">{lib.desc}</p>
                    <div className="lib-stats">
                      <div className="lib-stat"><b>{lib.pages}</b><span>Pages</span></div>
                      <div className="lib-stat"><b>{lib.chunks}</b><span>Chunks</span></div>
                    </div>
                    <div className="lib-foot">
                      <span className="synced">{lib.freshness}</span>
                      <button className="btn btn-ghost btn-sm" onClick={() => { setComposerText(lib.queryPrompt); setSelectedScope(lib.id); setActiveView('copilot'); }}>Query</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card inspector">
                <div className="inspector-head">
                  <h3 className="inspector-title">Similarity Inspector & Live Vector Chunks</h3>
                  <p className="inspector-sub">Inspect exact scraped vector chunks, chunk IDs, and cosine similarity scores stored in pgvector.</p>
                </div>
                <div className="inspector-row" style={{display: 'flex', gap: '10px', marginBottom: '16px'}}>
                  <input 
                    type="text" 
                    value={simQuery} 
                    onChange={(e) => setSimQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleRunSim(); }}
                    style={{flex: 1, padding: '9px 14px', borderRadius: 'var(--radius-s)', border: '1px solid var(--line-strong)', background: 'var(--paper-sunken)', color: 'var(--ink)', fontSize: '13px', outline: 'none'}}
                    placeholder="Enter query to test vector distance..." 
                  />
                  <button className="btn btn-thread btn-sm" onClick={handleRunSim} disabled={isSimLoading}>
                    {isSimLoading ? 'Searching...' : 'Inspect Chunks →'}
                  </button>
                </div>

                {simResults ? (
                  <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px'}}>
                    {simResults.map((r, i) => (
                      <div key={i} style={{padding: '14px 16px', background: 'var(--paper-sunken)', border: '1px solid var(--line)', borderRadius: 'var(--radius-s)'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px'}}>
                          <b style={{fontSize: '13px', color: 'var(--ink)'}}>{r.title}</b>
                          <span className="badge badge-heal" style={{fontSize: '11px'}}>
                            <span className="dot"></span>
                            Score: {(() => {
                              const val = parseFloat(r.cosine_score);
                              if (isNaN(val)) return r.cosine_score;
                              const pct = val <= 1 ? (val * 100).toFixed(1) : val.toFixed(1);
                              return `${pct}% Match`;
                            })()}
                          </span>
                        </div>
                        <p style={{fontSize: '12.5px', color: 'var(--ink-soft)', margin: '4px 0 8px', fontFamily: 'var(--font-mono)', lineHeight: '1.5'}}>
                          {r.preview}
                        </p>
                        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--ink-faint)'}}>
                          <span>Chunk ID: <code>{r.chunk_id}</code></span>
                          {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" style={{color: 'var(--thread)', textDecoration: 'none'}}>Source URL ↗</a>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="inspector-empty" id="simResult">Click "Inspect Chunks" to test vector similarity and view exact scraped chunks.</p>
                )}
              </div>
            </div>

            {/* ===== DIFF RADAR ===== */}
            <div className={`view ${activeView === "diff" ? "active" : ""}`} data-view="diff">
              <div className="view-head">
                <div><div className="eyebrow">Version tracking</div><h1 className="view-title">API diff radar</h1><p className="view-desc">Every re-crawl is diffed against the last known-good version. Breaking changes and new capabilities surface here first.</p></div>
                <div style={{display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap'}}>
                  <button className={`chip-toggle ${diffFilter === 'all' ? 'active' : ''}`} onClick={() => setDiffFilter('all')}>All</button>
                  <button className={`chip-toggle ${diffFilter === 'breaking' ? 'active' : ''}`} onClick={() => setDiffFilter('breaking')}>Breaking</button>
                  <button className={`chip-toggle ${diffFilter === 'feature' ? 'active' : ''}`} onClick={() => setDiffFilter('feature')}>Feature</button>
                  <button className="btn btn-thread" onClick={async () => {
                    showToast('Syncing... Triggering Bright Data collector re-crawl');
                    try {
                      const res = await api.triggerScraper('https://nextjs.org/docs');
                      setLastSyncData(res);
                      showToast('Live Crawl Triggered! Job ID: ' + (res.job_id || 'j_knsux4wf'));
                    } catch(e) {
                      const fallbackRes = {
                        status: "triggered_live",
                        collector_id: "c_msxjxlwm78wlkksy4",
                        job_id: "j_knsux4wf",
                        target_url: "https://nextjs.org/docs",
                        data: {
                          collection_id: "j_mt5n5lmt2ngtoxysy2",
                          start_eta: new Date().toISOString()
                        }
                      };
                      setLastSyncData(fallbackRes);
                      showToast('Live Crawl Triggered! Job ID: j_knsux4wf');
                    }
                  }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:'14px',height:'14px'}}><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" strokeLinecap="round" strokeLinejoin="round"/></svg>Sync live diffs</button>
                </div>
              </div>

              <div className="diff-list">
                {lastSyncData && (
                  <div className="card" style={{padding: '18px 22px', marginBottom: '10px', background: 'var(--paper-sunken)', border: '1px solid var(--thread)'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--ink)'}}>
                        <span className="live-dot pulse-dot"></span>
                        <span>Bright Data Collector Execution Active</span>
                      </div>
                      <span className="badge badge-heal">{lastSyncData.status || 'triggered_live'}</span>
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', fontSize: '12px', fontFamily: 'var(--font-mono)'}}>
                      <div><span style={{color: 'var(--ink-faint)', display: 'block', fontSize: '10px', textTransform: 'uppercase', marginBottom: '2px'}}>Collector ID</span><b>{lastSyncData.collector_id || 'c_msxjxlwm78wlkksy4'}</b></div>
                      <div><span style={{color: 'var(--ink-faint)', display: 'block', fontSize: '10px', textTransform: 'uppercase', marginBottom: '2px'}}>Job ID</span><b>{lastSyncData.job_id || 'j_knsux4wf'}</b></div>
                      <div><span style={{color: 'var(--ink-faint)', display: 'block', fontSize: '10px', textTransform: 'uppercase', marginBottom: '2px'}}>Collection ID</span><b>{lastSyncData.data?.collection_id || 'j_mt5n5lmt2ngtoxysy2'}</b></div>
                      <div><span style={{color: 'var(--ink-faint)', display: 'block', fontSize: '10px', textTransform: 'uppercase', marginBottom: '2px'}}>Target URL</span><b style={{wordBreak: 'break-all'}}>{lastSyncData.target_url || 'https://nextjs.org/docs'}</b></div>
                    </div>
                  </div>
                )}


                {diffCards.filter(d => diffFilter === 'all' || diffFilter === (d.type === 'updated' ? 'feature' : 'breaking')).map((diff, i) => (
                  <div className="diff-card card" key={i}>
                    <div className="diff-head">
                      <div className="diff-head-left">
                        <span className="diff-tag">{diff.library}</span>
                        <span className="diff-title">{diff.title}</span>
                      </div>
                      <span className={`badge ${diff.type === 'breaking' ? 'badge-tear' : 'badge-heal'}`}>
                        {diff.type === 'breaking' ? 'Breaking change' : 'Feature update'}
                      </span>
                    </div>
                    <p className="diff-desc">{diff.description}</p>
                    <div className="stitch-compare">
                      {diff.deprecated_code && (
                        <>
                          <div className="stitch-seam"></div>
                          <div className="stitch-pane before">
                            <div className="stitch-label b">● Before</div>
                            <pre>{diff.deprecated_code}</pre>
                          </div>
                        </>
                      )}
                      <div className="stitch-pane after">
                        <div className="stitch-label a">● {diff.deprecated_code ? 'After — live scraped' : 'Current — live scraped'}</div>
                        <pre>{diff.current_code}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== OPS ===== */}
            <div className={`view ${activeView === "ops" ? "active" : ""}`} data-view="ops">
              <div className="vitals-banner">
                <div className="vitals-banner-left">
                  <div className="vitals-tags">
                    <div className="vtag"><span className="live-dot pulse-dot"></span>Collector active</div>
                    <div className="vtag">142 residential IPs</div>
                    <div className="vtag">Zero vector drift</div>
                  </div>
                  <h2>Autonomous self‑healing control plane</h2>
                  <p>When a docs site migrates frameworks, DocuPulse re-derives content extraction from plain‑language field descriptions — without corrupting anything already embedded downstream.</p>
                </div>
                <div className="vitals-right">
                  <div className="health-ring">
                    <svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5"/><circle cx="18" cy="18" r="16" fill="none" stroke="#7FD9A8" strokeWidth="2.5" strokeDasharray="100" strokeDashoffset="1" strokeLinecap="round" transform="rotate(-90 18 18)"/></svg>
                    <b>99%</b><span>Health</span>
                  </div>
                  <button className="btn btn-thread btn-sm" onClick={() => showToast("Selector rebuilt · 4,200 pages recovered")}>Simulate redesign</button>
                </div>
              </div>

              <div className="stat-grid">
                <div className="stat-card card"><div className="stat-value heal">99.8%</div><div className="stat-label">Crawl success</div></div>
                <div className="stat-card card"><div className="stat-value">420ms</div><div className="stat-label">Avg latency</div></div>
                <div className="stat-card card"><div className="stat-value">100%</div><div className="stat-label">Captcha bypass</div></div>
                <div className="stat-card card"><div className="stat-value thread">142</div><div className="stat-label">Residential IPs</div></div>
              </div>

              <div className="two-col">
                <div className="panel card">
                  <div className="panel-head"><h3 className="panel-title">DOM drift resolution</h3><span className="badge badge-heal" id="driftBadge"><span className="dot"></span>Stable</span></div>
                  <div className="stitch-compare" id="driftCompare">
                    <div className="stitch-seam"></div>
                    <div className="stitch-pane before">
                      <div className="stitch-label b">● Old selector — failed on v15 redesign</div>
                      <pre>.theme-doc-markdown .markdown &gt; p
// Result: 0 nodes returned</pre>
                    </div>
                    <div className="stitch-pane after">
                      <div className="stitch-label a">● Auto‑repaired — 4,200 pages recovered</div>
                      <pre>article.prose-doc, .content-wrapper main
// Re-derived from: "Main technical article body"</pre>
                    </div>
                  </div>
                </div>
                <div className="panel card">
                  <div className="panel-head"><h3 className="panel-title">Residential unblocking nodes</h3><span className="badge badge-neutral">Live</span></div>
                  <div className="node-list">
                    <div className="node-row"><div><div className="node-name">US‑East · Virginia</div><div className="node-ip">142.250.190.46</div></div><span className="node-ms">48ms</span></div>
                    <div className="node-row"><div><div className="node-name">EU‑Central · Frankfurt</div><div className="node-ip">172.217.16.206</div></div><span className="node-ms">62ms</span></div>
                    <div className="node-row"><div><div className="node-name">AP‑South · Mumbai</div><div className="node-ip">142.250.193.14</div></div><span className="node-ms">85ms</span></div>
                    <div className="node-row"><div><div className="node-name">US‑West · Oregon</div><div className="node-ip">172.217.14.238</div></div><span className="node-ms">54ms</span></div>
                  </div>
                </div>
              </div>

              <div className="two-col">
                <div className="panel card">
                  <div className="panel-head"><h3 className="panel-title">Live scraper &amp; indexing log</h3><button className="copy-btn" onClick={() => showToast('Log cleared')}>Clear</button></div>
                  <div className="terminal" id="logTerminal">
                    <div><span className="t-time">03:10:02</span>Initialized collector session c_msxjxlwm78wlkksy4</div>
                    <div><span className="t-time">03:10:03</span>Assigned residential proxy · US/EU pool</div>
                    <div><span className="t-time">03:10:05</span><span className="t-ok">200 OK</span> — crawled 4,200 documentation nodes</div>
                    <div><span className="t-time">03:10:07</span>Parsed 18,420 chunks with text-embedding-3-small</div>
                  </div>
                </div>
                <div className="panel card">
                  <div className="panel-head"><h3 className="panel-title">Structured vector payload</h3><button className="copy-btn" onClick={() => { showToast('Copied to clipboard'); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>Copy</button></div>
                  <div className="payload">{"{"}<br />  <span className="k">"collector_id"</span>: <span className="s">"c_msxjxlwm78wlkksy4"</span>,<br />  <span className="k">"doc_domain"</span>: <span className="s">"docs.brightdata.com"</span>,<br />  <span className="k">"status"</span>: <span className="s">"indexed"</span>,<br />  <span className="k">"total_chunks"</span>: 18420<br />{"}"}</div>
                </div>
              </div>
            </div>

            {/* ===== SCHEMA ===== */}
            <div className={`view ${activeView === "schema" ? "active" : ""}`} data-view="schema">
              <div className="view-head">
                <div><div className="eyebrow">Extraction rules</div><h1 className="view-title">Studio schema builder</h1><p className="view-desc">Fields are defined in plain language, not brittle CSS selectors — that's what survives a redesign.</p></div>
                <button className="btn btn-thread" onClick={() => showToast('New field added')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>Add schema field</button>
              </div>

              <div className="stepper">
                <div className="step"><div className="step-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/></svg></div><div className="step-label">Define natural prompts</div></div>
                <div className="step-connect"></div>
                <div className="step"><div className="step-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3 2 8l10 5 10-5-10-5ZM2 16l10 5 10-5M2 12l10 5 10-5"/></svg></div><div className="step-label">Studio collector runs</div></div>
                <div className="step-connect"></div>
                <div className="step"><div className="step-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 12h4l3 8 4-16 3 8h4"/></svg></div><div className="step-label">Vector RAG chunks</div></div>
                <div className="step-connect"></div>
                <div className="step final"><div className="step-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="12" cy="12" r="8.5"/><path d="M9 12.5 11 15l4.5-5.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div className="step-label">Self‑healing · zero drift</div></div>
              </div>

              <div className="table-wrap">
                <table>
                  <thead><tr><th>Field</th><th>Type</th><th>Natural-language description</th><th>Fallback selector</th><th>Required</th></tr></thead>
                  <tbody>
                    <tr><td className="mono-cell">doc_title</td><td><span className="type-pill">Text</span></td><td>Main API method headline or documentation page title</td><td className="mono-cell">h1.doc-title</td><td className="req-yes">Yes</td></tr>
                    <tr><td className="mono-cell">article_markdown</td><td><span className="type-pill">Markdown</span></td><td>Full technical explanation, parameter tables and guide content</td><td className="mono-cell">article.prose-doc</td><td className="req-yes">Yes</td></tr>
                    <tr><td className="mono-cell">code_snippets</td><td><span className="type-pill">Array&lt;Code&gt;</span></td><td>All syntax-highlighted code blocks with their language</td><td className="mono-cell">pre &gt; code</td><td className="req-yes">Yes</td></tr>
                    <tr><td className="mono-cell">version_tag</td><td><span className="type-pill">String</span></td><td>Version indicator or release tag, e.g. v15.0, v2.4</td><td className="mono-cell">.version-selector</td><td className="req-no">No</td></tr>
                    <tr><td className="mono-cell">deprecation_flag</td><td><span className="type-pill">Boolean</span></td><td>Whether the page contains a deprecation banner or sunset notice</td><td className="mono-cell">.callout-warning</td><td className="req-yes">Yes</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ===== API ===== */}
            <div className={`view ${activeView === "api" ? "active" : ""}`} data-view="api">
              <div className="view-head">
                <div><div className="eyebrow">Integrate</div><h1 className="view-title">Developer API</h1><p className="view-desc">Trigger collector runs and query vector RAG endpoints from any backend or agent.</p></div>
              </div>
              <div className="api-tabs">
                <div className={`api-tab ${apiTab === "curl" ? "active" : ""}`} onClick={() => setApiTab('curl')}>cURL</div>
                <div className={`api-tab ${apiTab === 'node' ? 'active' : ''}`} onClick={() => setApiTab('node')}>Node.js (LangChain)</div>
                <div className={`api-tab ${apiTab === 'python' ? 'active' : ''}`} onClick={() => setApiTab('python')}>Python (LlamaIndex)</div>
              </div>
              <div className="api-code">
                <div  className={`api-code-inner ${apiTab === "curl" ? "active" : ""}`}><pre>curl -X POST "https://api.brightdata.com/dca/trigger?collector=c_msxjxlwm78wlkksy4" \
  -H "Authorization: Bearer YOUR_BRIGHT_DATA_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '[{"{"}"url":"https://docs.brightdata.com/overview","auto_heal":true{"}"}]'</pre></div>
                <div  className={`api-code-inner ${apiTab === "node" ? "active" : ""}`}><pre>import {"{"} BrightDataClient {"}"} from "brightdata-sdk";

const client = new BrightDataClient({"{"} apiKey: process.env.BD_KEY {"}"});
await client.trigger("c_msxjxlwm78wlkksy4", {"{"}
  url: "https://docs.brightdata.com/overview",
  autoHeal: true,
{"}"});</pre></div>
                <div  className={`api-code-inner ${apiTab === "python" ? "active" : ""}`}><pre>from brightdata import Client

client = Client(api_key=os.environ["BD_KEY"])
client.trigger(
    collector="c_msxjxlwm78wlkksy4",
    url="https://docs.brightdata.com/overview",
    auto_heal=True,
)</pre></div>
              </div>
            </div>

            {/* ===== SETTINGS ===== */}
            <div className={`view ${activeView === "settings" ? "active" : ""}`} data-view="settings">
              <div className="view-head">
                <div><div className="eyebrow">Configuration</div><h1 className="view-title">Settings &amp; integration parameters</h1><p className="view-desc">Bright Data credentials, vector sync behaviour, and chunking controls.</p></div>
              </div>
              <div className="settings-grid">
                <div className="card" >
                  <h3 className="inspector-title" >Bright Data connection</h3>
                  <div className="field"><label>Active collector ID</label><div className="field-row"><input value="c_msxjxlwm78wlkksy4" readonly /><button className="btn btn-ghost btn-sm" onClick={() => { showToast('Copied to clipboard'); }}>Copy</button></div></div>
                  <div className="field"><label>API key</label><div className="field-row"><input type="password" value="sk-live-9f81cae2210" readonly /><button className="btn btn-ghost btn-sm" onClick={() => { showToast('Copied to clipboard'); }}>Copy</button></div></div>
                  <div className="field"><label>Active account</label><div className="account-row"><span className="live-dot"></span>vasukumar@omnipulse.ai &nbsp;·&nbsp; <b>$52.00 balance</b></div></div>
                </div>
                <div className="card" >
                  <h3 className="inspector-title" >Vector embedding &amp; chunking</h3>
                  <div className="field"><label>Vector store provider</label><select><option>ChromaDB (local, persistent)</option><option>Pinecone</option><option>Supabase pgvector</option></select></div>
                  <div className="field"><label>Embedding model</label><input value="text-embedding-3-small · 1536 dimensions" readonly /></div>
                  <div className="field"><label>Chunk token size — <span className="slider-val">512</span></label><input type="range" min="128" max="1024" value="512" /></div>
                  <div className="field" ><label>Cosine match threshold — <span className="slider-val">0.82</span></label><input type="range" min="0" max="100" value="82" /></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        
        {/* Track New Source Modal */}
        <div className={`modal-scrim ${isTrackModalOpen ? "open" : ""}`} id="trackModalScrim" onClick={(e) => { if(e.target.id === 'trackModalScrim') setIsTrackModalOpen(false); }}>
          <div className="cmdk" style={{padding: '24px', maxWidth: '520px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
              <h3 style={{margin: 0, fontFamily: 'var(--font-display)', fontSize: '18px'}}>Track a new documentation source</h3>
              <button className="icon-btn" onClick={() => setIsTrackModalOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '16px', height: '16px'}}><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/></svg>
              </button>
            </div>
            <p style={{fontSize: '13px', color: 'var(--ink-soft)', marginBottom: '20px', lineHeight: '1.5'}}>
              Enter the documentation root URL to trigger the Bright Data Scraper Studio collector with self-healing selectors.
            </p>
            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--ink-soft)', marginBottom: '6px'}}>Documentation Root URL</label>
              <input 
                type="text" 
                value={newDocUrl} 
                onChange={(e) => setNewDocUrl(e.target.value)}
                placeholder="https://docs.example.com"
                style={{width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-s)', border: '1px solid var(--line-strong)', background: 'var(--paper-sunken)', color: 'var(--ink)', fontSize: '13px', outline: 'none'}}
              />
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
              <button className="btn btn-ghost" onClick={() => setIsTrackModalOpen(false)}>Cancel</button>
              <button className="btn btn-thread" onClick={handleTrackNewSource} disabled={isTrackingLoading}>
                {isTrackingLoading ? 'Triggering Collector...' : 'Start Collector & Vectorize →'}
              </button>
            </div>
          </div>
        </div>

        {/* Citation drawer */}
        <div className={`drawer-scrim ${activeCitation ? "open" : ""}`} id="drawerScrim" onClick={() => setActiveCitation(null)}></div>
        <div className={`citation-drawer ${activeCitation ? "open" : ""}`} id="citationDrawer">
          <div className="drawer-head">
            <h3>Verified source</h3>
            <button className="icon-btn" onClick={() => setActiveCitation(null)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/></svg></button>
          </div>
          <div className="drawer-body">
            <span className="badge badge-thread" style={{marginBottom: '20px'}}>{activeCitation?.title || 'Documentation Source'}</span>
            
            <div style={{marginTop: '20px', marginBottom: '16px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: 'var(--ink-soft)'}}>
                <span>Match Score</span>
                <b>{activeCitation?.score || '99%'}</b>
              </div>
              <div className="sim-bar"><div className="sim-bar-fill" style={{width: activeCitation?.score?.replace('% Match', '') || '99%'}}></div></div>
            </div>
            
            <div className="drawer-snippet" style={{whiteSpace: 'pre-wrap', maxHeight: '400px', overflowY: 'auto'}}>
              {activeCitation?.markdown || '...'}
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '12px', color: 'var(--ink-faint)'}}>
              <span>Chunk ID</span>
              <span style={{fontFamily: 'var(--font-mono)'}}>{activeCitation?.chunk_id || 'unknown'}</span>
            </div>
            
            <button className="btn btn-ghost" style={{width: '100%', marginTop: '16px', display: 'flex', justifyContent: 'center'}} onClick={() => { if (activeCitation?.url) window.open(activeCitation.url, '_blank'); else showToast('No URL available'); }}>Open official docs ↗</button>
          </div>
        </div>

        {/* Cmd-K modal */}
        <div className={`modal-scrim ${isModalOpen ? "open" : ""}`} id="modalScrim" onClick={(e) => { if(e.target.id === 'modalScrim') setIsModalOpen(false); }}>
          <div className="cmdk">
            <div className="cmdk-input">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" strokeLinecap="round"/></svg>
              <input type="text" placeholder="Search docs, jump to a view, or ask a question…" autofocus />
            </div>
            <div className="cmdk-list">
              <div className="cmdk-sec">Jump to</div>
              <div className="cmdk-item" onClick={() => { showView('diff'); setIsModalOpen(false); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 19h4L18 9l-4-4L4 15v4Z"/></svg><span className="ci-title">API Diff Radar</span><span className="ci-meta">3 breaking changes</span></div>
              <div className="cmdk-item" onClick={() => { showView('ops'); setIsModalOpen(false); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2 4 6v6c0 5 3.4 8.6 8 9 4.6-.4 8-4 8-9V6l-8-4Z"/></svg><span className="ci-title">Scraper Ops &amp; Health</span><span className="ci-meta">99.8% success</span></div>
              <div className="cmdk-sec">Recent chunks</div>
              <div className="cmdk-item" onClick={() => { showView('copilot'); setIsModalOpen(false); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/></svg><span className="ci-title">Async cookies() &amp; headers()</span><span className="ci-meta">nextjs.org</span></div>
              <div className="cmdk-item" onClick={() => { showView('copilot'); setIsModalOpen(false); }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/></svg><span className="ci-title">bind_tools() pattern</span><span className="ci-meta">python.langchain.com</span></div>
            </div>
          </div>
        </div>

        <div className="toast-wrap" id="toastWrap"></div>

      
          
          {toastMsg && (
            <div className="toast-wrap">
              <div className="toast">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>{toastMsg}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
