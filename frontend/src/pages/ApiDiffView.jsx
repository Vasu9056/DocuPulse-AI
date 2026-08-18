import React from 'react';
import { showToast } from '../utils/toast';

export default function ApiDiffView() {
  const syncDiffs = () => {
    showToast("🔄 Scanned live docs: 2 breaking API changes detected in Next.js 15 & Bright Data SDK.", "info");
  };

  return (
    <section id="view-api-diff" className="page-view active">
      <div className="view-header">
        <div>
          <h2 className="view-title">API Breaking Changes & Version Diff Radar</h2>
          <p className="view-desc">Scraper Studio automatically diffs newly crawled documentation against previous revisions to detect deprecated methods and breaking API shifts.</p>
        </div>
        <button className="btn btn-primary" id="runDiffSyncBtn" onClick={syncDiffs}>Sync Live Diffs</button>
      </div>

      <div className="diff-radar-container">
        {/* Diff Card 1: Next.js 15 */}
        <div className="radar-card">
          <div className="radar-card-header">
            <div className="radar-title-group">
              <span className="lib-badge nextjs">Next.js 15.0.0</span>
              <h3>Async Request Headers & Cookies Migration</h3>
            </div>
            <span className="diff-status-pill breaking">Breaking Change Detected</span>
          </div>
          <p className="radar-desc">The runtime methods <code>cookies()</code>, <code>headers()</code>, and <code>params</code> are now asynchronous Promises.</p>
          
          <div className="code-diff-view">
            <div className="diff-pane old-pane">
              <div className="pane-label">Deprecated (Next.js 14)</div>
              <pre><code><span className="code-del">- import {'{'} cookies {'}'} from 'next/headers';</span>
<span className="code-del">- const cookieStore = cookies();</span>
<span className="code-del">- const token = cookieStore.get('token');</span></code></pre>
            </div>
            <div className="diff-pane new-pane">
              <div className="pane-label">Current (Next.js 15 Scraped Doc)</div>
              <pre><code><span className="code-add">+ import {'{'} cookies {'}'} from 'next/headers';</span>
<span className="code-add">+ const cookieStore = await cookies();</span>
<span className="code-add">+ const token = cookieStore.get('token');</span></code></pre>
            </div>
          </div>
        </div>

        {/* Diff Card 2: Bright Data SDK */}
        <div className="radar-card">
          <div className="radar-card-header">
            <div className="radar-title-group">
              <span className="lib-badge brightdata">Bright Data SDK v2.4</span>
              <h3>Collector DCA Trigger with Self-Healing Parameter</h3>
            </div>
            <span className="diff-status-pill updated">Feature Update</span>
          </div>
          <p className="radar-desc">Added <code>enable_self_healing: true</code> flag in DCA execution triggers for automatic fallback selector derivation.</p>
          
          <div className="code-diff-view">
            <div className="diff-pane new-pane" style={{ gridColumn: '1 / -1' }}>
              <div className="pane-label">Live API Syntax (Extracted via Scraper Studio)</div>
              <pre><code><span className="code-add">+ POST https://api.brightdata.com/dca/trigger?collector=c_msxjxlwm78wlkksy4&queue_next=1</span>
<span className="code-add">{`+ Payload: [{"url": "https://example.com", "auto_heal": true}]`}</span></code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
