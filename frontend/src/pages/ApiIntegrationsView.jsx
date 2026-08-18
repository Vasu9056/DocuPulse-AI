import React, { useState } from 'react';

export default function ApiIntegrationsView() {
  const [activeTab, setActiveTab] = useState('curl');

  const getCodeSnippet = () => {
    switch (activeTab) {
      case 'curl':
        return `curl -X POST "https://api.brightdata.com/dca/trigger?collector=c_msxjxlwm78wlkksy4&queue_next=1" \\
  -H "Authorization: Bearer YOUR_BRIGHT_DATA_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '[{"url": "https://docs.brightdata.com/datasets/scraper-studio/overview"}]'`;
      case 'node':
        return `// LangChain + Bright Data DCA Crawler
import { Document } from "@langchain/core/documents";
import axios from "axios";

const triggerResponse = await axios.post(
  "https://api.brightdata.com/dca/trigger?collector=c_msxjxlwm78wlkksy4&queue_next=1",
  [{ url: "https://docs.brightdata.com" }],
  { headers: { "Authorization": "Bearer YOUR_BRIGHT_DATA_API_TOKEN" } }
);

console.log("Indexed Chunks:", triggerResponse.data.total_chunks);`;
      case 'python':
        return `# LlamaIndex Vector Store Sync with Bright Data
import requests
from llama_index.core import Document, VectorStoreIndex

res = requests.post(
    "https://api.brightdata.com/dca/trigger?collector=c_msxjxlwm78wlkksy4&queue_next=1",
    headers={"Authorization": "Bearer YOUR_BRIGHT_DATA_API_TOKEN"},
    json=[{"url": "https://docs.brightdata.com"}]
)

data = res.json()
docs = [Document(text=chunk["markdown"], metadata={"url": chunk["source_url"]}) for chunk in data["chunks"]]
index = VectorStoreIndex.from_documents(docs)`;
      default:
        return '';
    }
  };

  return (
    <section id="view-api-integrations" className="page-view active">
      <div className="view-header">
        <div>
          <h2 className="view-title">Developer API & Integration</h2>
          <p className="view-desc">Trigger Scraper Studio collector runs and query vector RAG endpoints programmatically.</p>
        </div>
      </div>

      <div className="api-grid">
        <div className="api-card">
          <div className="api-tabs">
            <button className={`api-tab ${activeTab === 'curl' ? 'active' : ''}`} onClick={() => setActiveTab('curl')}>cURL</button>
            <button className={`api-tab ${activeTab === 'node' ? 'active' : ''}`} onClick={() => setActiveTab('node')}>Node.js (LangChain)</button>
            <button className={`api-tab ${activeTab === 'python' ? 'active' : ''}`} onClick={() => setActiveTab('python')}>Python (LlamaIndex)</button>
          </div>
          <div className="api-code-body">
            <pre><code id="apiCodeSnippet">{getCodeSnippet()}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
}
