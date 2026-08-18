import React from 'react';

export default function TopHeader({ onToggleSidebar, onOpenSearch, onToggleTheme }) {
  return (
    <header className="top-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button id="hamburgerBtn" className="hamburger-btn" title="Toggle Sidebar" onClick={onToggleSidebar}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        
        <div className="header-search" id="headerSearchBox" onClick={onOpenSearch}>
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="globalSearchInput" placeholder="Search documentation, methods, vector chunks... (⌘K)" readOnly />
          <kbd className="search-kbd">⌘K</kbd>
        </div>
      </div>

      <div className="header-actions">
        <div className="status-pill healthy">
          <span className="status-dot green"></span>
          <span>Self-Healing Engine <strong>Active</strong></span>
        </div>

        <div className="credit-pill">
          <span className="credit-coin">⚡</span>
          <span className="credit-amount">$52.00</span>
          <span className="credit-label">Credits</span>
        </div>

        <button id="themeToggleBtn" className="icon-button" title="Toggle Light/Dark Theme" onClick={onToggleTheme}>
          <svg className="theme-icon-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>

        <div className="user-avatar" title="Vasu Kumar • Lead Engineer">
          <span>VK</span>
        </div>
      </div>
    </header>
  );
}
