import React from 'react';
import { showToast } from '../utils/toast';

export default function SettingsView() {
  const handleCopy = () => {
    navigator.clipboard.writeText('bd_api_9f83kd01948294729184729');
    showToast('API Key copied to clipboard!', 'success');
  };

  return (
    <section id="view-settings" className="page-view active">
      <div className="view-header">
        <div>
          <h2 className="view-title">Settings & Integration Keys</h2>
          <p className="view-desc">Configure Bright Data API credentials, Vector DB sync parameters, and notification alerts.</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <h3 className="settings-heading">Bright Data API Connection</h3>
          <div className="setting-row">
            <label>API Key</label>
            <div className="api-key-box">
              <input type="password" value="bd_api_9f83kd01948294729184729" readOnly className="input-readonly" />
              <button className="btn btn-secondary" onClick={handleCopy}>Copy</button>
            </div>
          </div>
          <div className="setting-row">
            <label>Active Account</label>
            <div className="account-badge">
              <span className="status-dot green"></span>
              <span>vasukumar@omnipulse.ai • <strong>$52.00 Active Balance</strong></span>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h3 className="settings-heading">Vector Embedding Store</h3>
          <div className="setting-row">
            <label>Vector Store Provider</label>
            <select className="custom-select" style={{ width: '100%' }} defaultValue="ChromaDB (Local In-Memory / Persistent)">
              <option>ChromaDB (Local In-Memory / Persistent)</option>
              <option>Pinecone Serverless</option>
              <option>Supabase pgvector</option>
            </select>
          </div>
          <div className="setting-row">
            <label>Embedding Model</label>
            <input type="text" value="text-embedding-3-small (1536 dimensions)" readOnly className="input-readonly" />
          </div>
        </div>
      </div>
    </section>
  );
}
