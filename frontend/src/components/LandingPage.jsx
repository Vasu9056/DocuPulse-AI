import React from 'react';

export default function LandingPage({ onLaunch }) {
  return (
    <div id="view-landing" className="landing-page">
      <div className="landing-hero">
        <div className="landing-logo-badge">
          <svg className="brand-spark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
          </svg>
          <span>Powered by Bright Data Scraper Studio</span>
        </div>

        <h1 className="landing-title">Zero-Hallucination AI Copilot<br /><span className="gradient-text">Powered by Self-Healing Docs</span></h1>
        <p className="landing-subtitle">
          Fast-moving developer documentation changes constantly. Traditional scrapers break and LLMs hallucinate outdated APIs. 
          <strong>DocuPulse AI</strong> crawls, self-heals DOM drifts, and indexes live markdown into high-precision vector RAG with verified citations.
        </p>

        <div className="landing-cta-group">
          <button id="getStartedBtn" className="btn btn-landing" onClick={onLaunch}>
            <span>Launch DocuPulse Copilot</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        {/* Live RAG & Scraper Metrics */}
        <div className="landing-stats">
          <div className="landing-stat">
            <div className="landing-stat-value">18,420</div>
            <div className="landing-stat-label">Vector Chunks Synced</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value green">99.8%</div>
            <div className="landing-stat-label">RAG Grounded Precision</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value blue">3 DOM Drifts</div>
            <div className="landing-stat-label">Auto-Healed (0 Downtime)</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value amber">$52.00</div>
            <div className="landing-stat-label">Active Scraping Credits</div>
          </div>
        </div>

        {/* Feature Pillars */}
        <div className="landing-features">
          <div className="landing-feature-card">
            <div className="feature-icon blue">⚡</div>
            <h3>Continuous Doc Scraping</h3>
            <p>Scrapes live API reference pages, code examples, and release notes with residential proxy unblocking.</p>
          </div>
          <div className="landing-feature-card">
            <div className="feature-icon emerald">🛡️</div>
            <h3>Self-Healing Engine</h3>
            <p>When docs migrate frameworks (e.g. Docusaurus ➔ Mintlify), plain-language field descriptions auto-repair selectors.</p>
          </div>
          <div className="landing-feature-card">
            <div className="feature-icon purple">🎯</div>
            <h3>Verified Citation RAG</h3>
            <p>Every line of code and answer is backed by direct, clickable links to the exact scraped doc paragraph.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
