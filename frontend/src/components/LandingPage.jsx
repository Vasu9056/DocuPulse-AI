import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function LandingPage({ onLaunch }) {
  const [metrics, setMetrics] = useState({
    ips: '...',
    response_time: '...',
    success: '...',
    bandwidth: '...'
  });

  useEffect(() => {
    // Fetch live metrics from Bright Data SDK / backend
    api.getHealth()
      .then(data => {
        if (data && data.metrics) {
          // Purely dynamic extraction, zero static fallbacks
          let activeIpCount = '0';
          if (data.proxy_pool) {
            const match = data.proxy_pool.match(/(\d+)/);
            if (match) activeIpCount = match[0];
          }
          
          setMetrics({
            ips: `${activeIpCount}+`,
            response_time: data.metrics.avg_response_time,
            success: data.metrics.success_rate,
            bandwidth: data.metrics.bandwidth_saved
          });
        }
      })
      .catch(err => console.error("Could not fetch live metrics", err));
  }, []);

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

        {/* Live Bright Data Metrics */}
        <div className="landing-stats">
          <div className="landing-stat">
            <div className="landing-stat-value">{metrics.ips}</div>
            <div className="landing-stat-label">Active Proxy IPs</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value green">{metrics.success}</div>
            <div className="landing-stat-label">Scrape Success Rate</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value blue">{metrics.response_time}</div>
            <div className="landing-stat-label">Avg Response Time</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value amber">{metrics.bandwidth}</div>
            <div className="landing-stat-label">Bandwidth Saved</div>
          </div>
        </div>

        {/* Feature Pillars */}
        <div className="landing-features">
          <div className="landing-feature-card" onClick={onLaunch} style={{ cursor: 'pointer' }}>
            <div className="feature-icon blue">⚡</div>
            <h3>Continuous Doc Scraping</h3>
            <p>Scrapes live API reference pages, code examples, and release notes with residential proxy unblocking.</p>
          </div>
          <div className="landing-feature-card" onClick={onLaunch} style={{ cursor: 'pointer' }}>
            <div className="feature-icon emerald">🛡️</div>
            <h3>Self-Healing Engine</h3>
            <p>When docs migrate frameworks (e.g. Docusaurus ➔ Mintlify), plain-language field descriptions auto-repair selectors.</p>
          </div>
          <div className="landing-feature-card" onClick={onLaunch} style={{ cursor: 'pointer' }}>
            <div className="feature-icon purple">🎯</div>
            <h3>Verified Citation RAG</h3>
            <p>Every line of code and answer is backed by direct, clickable links to the exact scraped doc paragraph.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
