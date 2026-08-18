import React, { useEffect, useRef } from 'react';

export default function SearchModal({ isOpen, onClose, onSubmitQuery, onNavigate }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div id="searchModalOverlay" className="modal-overlay" style={{ display: 'flex' }} onClick={(e) => { if(e.target === e.currentTarget) onClose(); }}>
      <div className="search-modal">
        <div className="search-modal-header">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            id="cmdKSearchInput" 
            placeholder="Search documentation, API methods, vector chunks... (Press ESC to close)" 
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (e.target.value.trim()) {
                  onSubmitQuery(e.target.value);
                  onClose();
                }
              }
            }}
          />
          <kbd className="search-kbd">ESC</kbd>
        </div>
        <div className="search-modal-body">
          <div className="search-section-title">Popular Developer Queries</div>
          <div className="search-item" onClick={() => { onSubmitQuery('How to trigger Bright Data Scraper Studio collector via Node.js with self-healing?'); onClose(); }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>Bright Data DCA Trigger API in Node.js</span>
            <span className="search-badge">Bright Data SDK</span>
          </div>
          <div className="search-item" onClick={() => { onSubmitQuery('What are the breaking changes in Next.js 15 async Request headers and cookies?'); onClose(); }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>Next.js 15 Async cookies() & headers() migration</span>
            <span className="search-badge">Next.js 15</span>
          </div>
          <div className="search-item" onClick={() => { onSubmitQuery('How to use LangChain v0.3 tool calling with structured Pydantic output?'); onClose(); }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>LangChain v0.3 bind_tools() syntax</span>
            <span className="search-badge">LangChain v0.3</span>
          </div>
          
          <div className="search-section-title" style={{ marginTop: '20px' }}>Quick Views</div>
          <div className="search-quick-grid">
            <div className="quick-nav-pill" onClick={() => { onNavigate('copilot'); onClose(); }}>💬 RAG Copilot</div>
            <div className="quick-nav-pill" onClick={() => { onNavigate('doc-sets'); onClose(); }}>📚 Doc Libraries</div>
            <div className="quick-nav-pill" onClick={() => { onNavigate('scraper-ops'); onClose(); }}>🛡️ Scraper Ops & Healing</div>
            <div className="quick-nav-pill" onClick={() => { onNavigate('api-diff'); onClose(); }}>⚡ API Breaking Diff</div>
          </div>
        </div>
      </div>
    </div>
  );
}
