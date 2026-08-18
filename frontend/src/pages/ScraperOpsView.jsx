import React, { useState, useRef, useEffect } from 'react';
import { showToast } from '../utils/toast';

export default function ScraperOpsView() {
  const [isSelfHealingActive, setIsSelfHealingActive] = useState(false);
  const [logs, setLogs] = useState([
    { time: '2026-08-17 03:10:02', msg: 'Initialized Bright Data collector session (c_msxjxlwm78wlkksy4)...', type: 'info' },
    { time: '2026-08-17 03:10:03', msg: 'Assigned residential proxy pool (US/EU unblocking node: 142.250.x.x)', type: 'info' },
    { time: '2026-08-17 03:10:05', msg: 'HTTP 200 OK — Crawled 4,200 documentation nodes across target domains.', type: 'success' },
    { time: '2026-08-17 03:10:07', msg: 'Parsed 18,420 vector chunks with text-embedding-3-small.', type: 'success' },
    { time: '2026-08-17 03:10:08', msg: 'Parity verification passed: Zero broken citations detected.', type: 'info' }
  ]);
  const [diffStatus, setDiffStatus] = useState('Status: Stable (Zero Drift)');
  const [diffStatusColor, setDiffStatusColor] = useState('var(--bg-surface)');
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (msg, type) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setLogs((prev) => [...prev, { time: now, msg, type }]);
  };

  const simulateRedesign = () => {
    if (isSelfHealingActive) return;
    setIsSelfHealingActive(true);

    showToast("⚠️ Target Doc Site Migrated: Docusaurus ➔ Mintlify DOM shift detected...", "warning");
    setDiffStatus("Status: DOM Drift Detected!");
    setDiffStatusColor('var(--accent-red)');

    addLog("🚨 [WARNING] Target documentation site updated HTML layout. Old selector '.theme-doc-markdown' returned 0 nodes.", "error");

    setTimeout(() => {
      addLog("🤖 [SELF-HEALING] Scraper Studio re-evaluating prompt: 'Main technical article body and code blocks'", "info");
    }, 1200);

    setTimeout(() => {
      addLog("✨ [REPAIRED] Generated resilient selector: article.prose-doc, .content-wrapper main", "success");
      addLog("🎉 [RESOLVED] Successfully recovered 4,200 documentation nodes with Zero Vector Drift.", "success");

      setDiffStatus("Status: Self-Healed (Zero Vector Drift)");
      setDiffStatusColor('var(--accent-emerald)');
      showToast("🎉 Scraper Studio Auto-Repaired Selector! 4,200 pages recovered.", "success");
      
      setTimeout(() => setIsSelfHealingActive(false), 2000);
    }, 2600);
  };

  const clearLogs = () => {
    setLogs([]);
    showToast("Scraper logs cleared.", "info");
  };

  const copyJson = () => {
    const jsonText = document.getElementById("jsonPreviewCode")?.textContent;
    if (jsonText) {
      navigator.clipboard.writeText(jsonText);
      showToast("Structured Vector JSON copied to clipboard!", "success");
    }
  };

  const exportCsv = () => {
    showToast("Exported 18,420 vector chunks to JSONL dataset!", "success");
  };

  return (
    <section id="view-scraper-ops" className="page-view active">
      <div className="ops-hero-card">
        <div className="ops-hero-left">
          <div className="ops-badge-row">
            <span className="badge healthy-badge">🟢 Collector c_msxjxlwm78wlkksy4 Active</span>
            <span className="badge proxy-badge">🛡️ Bright Data Residential Proxies (US/EU)</span>
            <span className="badge unblock-badge">⚡ Zero Vector Drift Engine</span>
          </div>
          <h2 className="ops-title">Autonomous Self-Healing Documentation Control Plane</h2>
          <p className="ops-desc">When doc sites migrate frameworks (e.g. Docusaurus ➔ Mintlify), Scraper Studio re-derives content extraction from natural language descriptions without corrupting downstream vector embeddings.</p>
        </div>
        <div className="ops-hero-actions">
          <div style={{ textAlign: 'center', marginRight: '16px' }}>
            <div className="gauge-container">
              <svg viewBox="0 0 36 36" style={{ width: '80px', height: '80px', transform: 'rotate(-90deg)' }}>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--bg-surface)" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-emerald)" strokeWidth="3" strokeDasharray="99, 100" />
              </svg>
              <div className="gauge-text">99%</div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '-6px' }}>Scraper Health</div>
          </div>
          <button id="simulateRedesignBtn" className="btn btn-warning" onClick={simulateRedesign} disabled={isSelfHealingActive}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <span>Simulate Doc Framework Redesign</span>
          </button>
        </div>
      </div>

      <div className="ops-layout-grid">
        <div className="ops-col-main">
          {/* Live Self-Healing Interactive Diff Card */}
          <div className="diff-card">
            <div className="diff-card-header">
              <div className="diff-card-title-group">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#10b981" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <h3 className="diff-title">Documentation DOM Drift Resolution</h3>
              </div>
              <span 
                id="diffStatusPill" 
                className="badge count-badge"
                style={{
                  background: diffStatusColor === 'var(--accent-red)' ? 'var(--accent-red-bg)' : (diffStatusColor === 'var(--accent-emerald)' ? 'var(--accent-emerald-bg)' : undefined),
                  color: diffStatusColor !== 'var(--bg-surface)' ? diffStatusColor : undefined
                }}
              >
                {diffStatus}
              </span>
            </div>

            <div className="diff-columns">
              <div className="diff-box broken" id="diffBoxBroken">
                <div className="diff-box-head">
                  <span>BEFORE REDESIGN (Old Docusaurus Selector)</span>
                  <span className="diff-tag red">Failed on v15 redesign</span>
                </div>
                <pre className="code-snippet"><code><span className="token-selector">.theme-doc-markdown, .markdown &gt; p</span>
<span className="token-comment">// Result: Returned 0 content nodes (Empty)</span></code></pre>
              </div>

              <div className="diff-box healed" id="diffBoxHealed">
                <div className="diff-box-head">
                  <span>AFTER SELF-HEALING (Auto-Repaired by Scraper Studio)</span>
                  <span className="diff-tag green">4,200 Pages Recovered</span>
                </div>
                <pre className="code-snippet"><code><span className="token-selector-healed">article.prose-doc, .content-wrapper main</span>
<span className="token-comment">// Auto-repaired via prompt: "Main technical article body and code"</span></code></pre>
              </div>
            </div>
          </div>

          {/* Live Execution Logs */}
          <div className="ops-card">
            <div className="ops-card-header">
              <h3 className="card-title">Live Scraper & Vector Indexing Logs</h3>
              <button id="clearLogsBtn" className="btn-text" onClick={clearLogs}>Clear</button>
            </div>
            <div className="terminal-container" id="terminalLogs" ref={terminalRef}>
              {logs.map((log, i) => (
                <div key={i} className={`log-line ${log.type}`}>
                  <span className="log-time">[{log.time}]</span> {log.msg}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ops-col-side">
          <div className="ops-card json-card">
            <div className="ops-card-header">
              <h3 className="card-title">Structured Vector Payload</h3>
              <div className="json-actions">
                <button id="copyJsonBtn" className="btn-icon-label" onClick={copyJson}>
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span>Copy</span>
                </button>
                <button id="exportCsvBtn" className="btn-icon-label" onClick={exportCsv}>
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  <span>Export</span>
                </button>
              </div>
            </div>
            <div className="json-viewer-container">
              <pre id="jsonPreviewCode"><code>{`{
  "collector_id": "c_msxjxlwm78wlkksy4",
  "doc_domain": "docs.brightdata.com",
  "status": "indexed",
  "total_chunks": 18420,
  "sample_chunk": {
    "chunk_id": "bd_dca_092",
    "title": "Triggering DCA Collectors via REST API",
    "method": "POST /dca/trigger",
    "similarity_score": 0.984,
    "source_url": "https://docs.brightdata.com/api-reference/scraper-studio-api/Getting_started_with_the_API",
    "markdown": "To trigger a Scraper Studio collector programmatically, send an authorized POST request with collector ID and target URLs payload."
  }
}`}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
