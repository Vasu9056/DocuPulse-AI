import React, { useState } from 'react';
import { DOC_LIBRARIES } from '../data/mockData';
import { showToast } from '../utils/toast';

export default function DocSetsView({ onNavigate, onSubmitQuery }) {
  const [vectorSearchQuery, setVectorSearchQuery] = useState('');
  const [vectorResults, setVectorResults] = useState([]);

  const handleQueryDocs = (libId) => {
    if (onNavigate) onNavigate('copilot');
    
    if (onSubmitQuery) {
      if (libId === "lib_brightdata") {
        onSubmitQuery("How to trigger Bright Data Scraper Studio collector via Node.js with self-healing?");
      } else if (libId === "lib_nextjs") {
        onSubmitQuery("What are the breaking changes in Next.js 15 async Request headers and cookies?");
      } else if (libId === "lib_langchain") {
        onSubmitQuery("How to use LangChain v0.3 tool calling with structured Pydantic output?");
      }
    }
  };

  const handleAddDocSet = () => {
    showToast("Scraper Studio URL crawler wizard opened. Add any documentation link to index.", "info");
  };

  const runVectorSearch = () => {
    setVectorResults([
      {
        id: "chunk_bd_928",
        url: "docs.brightdata.com/api/dca/trigger.md",
        score: "0.984",
        text: "To trigger a Scraper Studio collector programmatically, send an authorized POST request with collector ID..."
      },
      {
        id: "chunk_next_104",
        url: "nextjs.org/docs/app/api-reference/cookies.md",
        score: "0.892",
        text: "The cookies() function allows you to read the HTTP incoming request cookies from a Server Component asynchronously..."
      }
    ]);
    showToast("Retrieved top-2 vector chunks via cosine similarity.", "success");
  };

  return (
    <section id="view-doc-sets" className="page-view active">
      <div className="view-header">
        <div>
          <h2 className="view-title">Managed Documentation Libraries</h2>
          <p className="view-desc">Continuously scraped documentation sites indexed into high-dimensional vector embeddings with automated DOM drift recovery.</p>
        </div>
        <button className="btn btn-primary" id="addDocSetBtn" onClick={handleAddDocSet}>+ Track New Doc URL</button>
      </div>

      {/* Doc Set Cards Grid */}
      <div className="doc-sets-grid" id="docSetsGrid">
        {DOC_LIBRARIES.map((lib) => (
          <div key={lib.id} className="doc-set-card">
            <div className="doc-set-head">
              <div className="doc-lib-icon">{lib.icon}</div>
              <span className="doc-sync-badge synced">● {lib.status}</span>
            </div>
            <h3 className="doc-lib-title">{lib.name}</h3>
            <div className="doc-lib-url">{lib.domain} ({lib.version})</div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: '1.4' }}>{lib.description}</p>
            
            <div className="doc-metrics-row">
              <div className="doc-metric-item">
                <span className="doc-metric-label">PAGES</span>
                <span className="doc-metric-val">{lib.pages}</span>
              </div>
              <div className="doc-metric-item">
                <span className="doc-metric-label">VECTOR CHUNKS</span>
                <span className="doc-metric-val">{lib.chunks}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: 'var(--text-muted)' }}>
              <span>{lib.freshness}</span>
              <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => handleQueryDocs(lib.id)}>Query Docs</button>
            </div>
          </div>
        ))}
      </div>

      {/* Vector Similarity Search Inspector */}
      <div className="analytics-card" style={{ marginTop: '24px' }}>
        <div className="card-header-row">
          <div>
            <h3 className="card-title">Live Vector Similarity Search Inspector</h3>
            <span className="card-meta">Test cosine similarity distance against indexed documentation embeddings</span>
          </div>
        </div>
        <div className="vector-search-box">
          <input 
            type="text" 
            id="vectorSearchInput" 
            className="vector-input" 
            placeholder="Type a semantic query to inspect retrieved vector chunks (e.g. 'collector self healing trigger params')..." 
            value={vectorSearchQuery}
            onChange={(e) => setVectorSearchQuery(e.target.value)}
          />
          <button id="runVectorSearchBtn" className="btn btn-primary" onClick={runVectorSearch}>Test Retrieval</button>
        </div>
        <div id="vectorSearchResults" className="vector-results-list">
          {vectorResults.map((result, idx) => (
            <div key={idx} className="vector-chunk-item">
              <div className="chunk-header">
                <span style={{ color: '#60a5fa' }}>#{result.id} • {result.url}</span>
                <span className="badge healthy-badge">Cosine: {result.score}</span>
              </div>
              <div className="chunk-text">"{result.text}"</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
