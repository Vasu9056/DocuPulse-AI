/**
 * Centralized API Client for DocuPulse AI
 * Connects frontend to the Express backend and Bright Data DCA / Gemini RAG services.
 * Supports environment variable VITE_API_URL for production deployments (e.g. Render / Railway).
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = {
  /**
   * Send RAG query to backend (Gemini 1.5 Flash + Scraped Documentation Vector Chunks)
   */
  async chatRag(query, scope = 'all') {
    const res = await fetch(`${API_BASE}/chat/rag`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, scope })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to process RAG query');
    }
    return res.json();
  },

  /**
   * Perform vector cosine similarity search
   */
  async vectorSearch(query) {
    const res = await fetch(`${API_BASE}/vector-search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    if (!res.ok) {
      throw new Error('Vector search failed');
    }
    return res.json();
  },

  /**
   * Trigger Bright Data Scraper Studio Collector with Self-Healing
   */
  async triggerScraper(url, autoHeal = true) {
    const res = await fetch(`${API_BASE}/scraper/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, auto_heal: autoHeal })
    });
    if (!res.ok) {
      throw new Error('Failed to trigger collector');
    }
    return res.json();
  },

  /**
   * Fetch Scraper Studio & Proxy Pool Health Metrics
   */
  async getHealth() {
    const res = await fetch(`${API_BASE}/scraper/health`);
    if (!res.ok) {
      throw new Error('Failed to fetch scraper health');
    }
    return res.json();
  },

  /**
   * Fetch API Breaking Changes Diff Radar
   */
  async getBreakingDiffs() {
    const res = await fetch(`${API_BASE}/breaking-diff`);
    if (!res.ok) {
      throw new Error('Failed to fetch breaking diffs');
    }
    return res.json();
  },

  /**
   * Fetch Managed Documentation Libraries & Vector Chunk Stores
   */
  async getDocStores() {
    const res = await fetch(`${API_BASE}/doc-stores`);
    if (!res.ok) {
      throw new Error('Failed to fetch document stores');
    }
    return res.json();
  }
};
