import React from 'react';

export default function CitationDrawer({ isOpen, citation, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div id="drawerOverlay" className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <aside id="citationDrawer" className={`ai-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <span className="ai-pill">📖 Verified Scraped Documentation Source</span>
            <h3 className="drawer-product-title" id="drawerDocTitle">{citation?.title || 'Doc Title'}</h3>
          </div>
          <button id="closeDrawerBtn" className="icon-button" title="Close Drawer" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="drawer-body">
          {/* Match Score Card */}
          <div className="ai-verdict-box">
            <div className="verdict-header">
              <span className="verdict-icon">🎯</span>
              <div>
                <div className="verdict-label">VECTOR COSINE SIMILARITY</div>
                <div className="verdict-main" id="drawerMatchScore">{citation?.score || '98.4% Match Score'}</div>
              </div>
            </div>
            <p className="verdict-explanation" id="drawerMatchExplanation">
              Retrieved via top-K semantic search against Bright Data documentation index chunk #bd_dca_092.
            </p>
          </div>

          {/* Raw Scraped Markdown Passage */}
          <div className="drawer-section">
            <h4 className="section-heading">Extracted Markdown Passage</h4>
            <div className="doc-markdown-box" id="drawerMarkdownContent">
               <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>
                 {citation?.markdown || ''}
               </pre>
            </div>
          </div>

          {/* Source Provenance */}
          <div className="drawer-section citation-box">
            <div className="citation-head">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Data Provenance & Link</span>
            </div>
            <div className="citation-text" id="drawerProvenance">
              Scraped via Bright Data Scraper Studio Collector <code>c_msxjxlwm78wlkksy4</code>. Indexed with text-embedding-3-small.
            </div>
            <a href={citation?.url || '#'} id="drawerSourceLink" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}>
              Open Official Documentation URL ↗
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
