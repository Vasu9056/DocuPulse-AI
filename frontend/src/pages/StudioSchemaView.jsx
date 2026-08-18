import React from 'react';

export default function StudioSchemaView() {
  return (
    <section id="view-studio-schema" className="page-view active">
      <div className="view-header">
        <div>
          <h2 className="view-title">Scraper Studio Documentation Schema Builder</h2>
          <p className="view-desc">Natural language schema prompts defined for extracting structured documentation markdown.</p>
        </div>
        <button className="btn btn-primary" id="addFieldBtn">+ Add Schema Field</button>
      </div>

      {/* Workflow Visualizer */}
      <div className="workflow-diagram">
        <div className="workflow-step">
          <div className="workflow-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          </div>
          <span>1. Define Natural Prompts</span>
        </div>
        <div className="workflow-arrow">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
        <div className="workflow-step">
          <div className="workflow-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </div>
          <span>2. Scraper Studio Collector</span>
        </div>
        <div className="workflow-arrow">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
        <div className="workflow-step">
          <div className="workflow-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          </div>
          <span>3. Vector RAG Chunks</span>
        </div>
        <div className="workflow-arrow">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
        <div className="workflow-step">
          <div className="workflow-icon" style={{ color: 'var(--accent-emerald)' }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <span style={{ color: 'var(--accent-emerald)' }}>4. Self-Healing Zero Drift</span>
        </div>
      </div>

      <div className="schema-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Field Name</th>
              <th>Type</th>
              <th>Natural Language Description (Prompt)</th>
              <th>Fallback Selector</th>
              <th>Required</th>
            </tr>
          </thead>
          <tbody id="schemaTableBody">
            <tr>
              <td><code>doc_title</code></td>
              <td><span className="type-badge text">Text</span></td>
              <td>Main API method headline or documentation page title</td>
              <td><code>h1.doc-title</code></td>
              <td><span className="badge green">Yes</span></td>
            </tr>
            <tr>
              <td><code>article_markdown</code></td>
              <td><span className="type-badge text">Markdown</span></td>
              <td>Full technical explanation, parameter tables, and guide content</td>
              <td><code>article.prose-doc</code></td>
              <td><span className="badge green">Yes</span></td>
            </tr>
            <tr>
              <td><code>code_snippets</code></td>
              <td><span className="type-badge array">Array&lt;Code&gt;</span></td>
              <td>All syntax-highlighted code blocks with programming languages</td>
              <td><code>pre &gt; code</code></td>
              <td><span className="badge green">Yes</span></td>
            </tr>
            <tr>
              <td><code>api_signature</code></td>
              <td><span className="type-badge text">Code String</span></td>
              <td>Function or REST endpoint signature (e.g. POST /dca/trigger)</td>
              <td><code>.api-badge, code.signature</code></td>
              <td><span className="badge green">Yes</span></td>
            </tr>
            <tr>
              <td><code>version_tag</code></td>
              <td><span className="type-badge text">String</span></td>
              <td>Version indicator or release tag (e.g. v15.0, v2.4)</td>
              <td><code>.version-selector</code></td>
              <td><span className="badge gray">No</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
