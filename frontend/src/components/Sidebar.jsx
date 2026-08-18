import React from 'react';

export default function Sidebar({ activeView, onViewChange, onCopyCollectorId, sidebarOpen }) {
  const getNavClass = (view) => `nav-item ${activeView === view ? 'active' : ''}`;

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="mainSidebar">
      <div className="sidebar-header">
        <div className="brand-logo">
          <div className="brand-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">DocuPulse AI</span>
            <span className="brand-sub">Self-Healing RAG Engine</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-title">INTELLIGENCE</div>
        <button className={getNavClass('copilot')} onClick={() => onViewChange('copilot')}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span>RAG Copilot</span>
          <span className="badge pulse-badge">Live</span>
        </button>
        <button className={getNavClass('doc-sets')} onClick={() => onViewChange('doc-sets')}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          <span>Doc Libraries</span>
          <span className="badge count-badge">18.4k</span>
        </button>
        <button className={getNavClass('api-diff')} onClick={() => onViewChange('api-diff')}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          <span>API Diff Radar</span>
          <span className="badge new-badge">New</span>
        </button>

        <div className="nav-section-title" style={{ marginTop: '12px' }}>SCRAPING & PIPELINES</div>
        <button className={getNavClass('scraper-ops')} onClick={() => onViewChange('scraper-ops')}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <span>Scraper Ops & Health</span>
        </button>
        <button className={getNavClass('studio-schema')} onClick={() => onViewChange('studio-schema')}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
          <span>Studio Schema</span>
        </button>
        <button className={getNavClass('api-integrations')} onClick={() => onViewChange('api-integrations')}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          <span>Developer API</span>
        </button>

        <div className="nav-section-title" style={{ marginTop: '12px' }}>ACCOUNT</div>
        <button className={getNavClass('settings')} onClick={() => onViewChange('settings')}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          <span>Settings</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="collector-mini-card">
          <div className="collector-status-indicator online"></div>
          <div className="collector-details">
            <div className="collector-id-label">DOC COLLECTOR</div>
            <div className="collector-id">c_msxjxlwm78wlkksy4</div>
          </div>
          <button className="icon-button-subtle" id="copyCollectorBtn" title="Copy Collector ID" onClick={onCopyCollectorId}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
