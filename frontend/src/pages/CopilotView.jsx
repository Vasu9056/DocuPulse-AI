import React, { useState, useRef, useEffect } from 'react';
import { RAG_KNOWLEDGE_BASE } from '../data/mockData';
import CitationDrawer from '../components/CitationDrawer';
import { showToast } from '../utils/toast';

export default function CopilotView() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome! I am connected to live, self-healing documentation crawlers powered by **Bright Data Scraper Studio**. Ask me anything about modern frameworks or APIs, and every answer will be backed by direct, line-by-line source citations.',
      isWelcome: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [docScope, setDocScope] = useState('all');
  const [activeCitation, setActiveCitation] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const feedRef = useRef(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages]);

  const submitQuickPrompt = (promptText) => {
    handleUserQuery(promptText);
  };

  const handleUserQuery = (query) => {
    if (!query.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: query }]);
    setInputValue('');

    // Mock backend delay
    setTimeout(() => {
      let ragResult = RAG_KNOWLEDGE_BASE["brightdata"];
      const lower = query.toLowerCase();
      if (lower.includes("next") || lower.includes("cookie") || lower.includes("header") || lower.includes("async")) {
        ragResult = RAG_KNOWLEDGE_BASE["nextjs"];
      } else if (lower.includes("langchain") || lower.includes("tool") || lower.includes("pydantic")) {
        ragResult = RAG_KNOWLEDGE_BASE["langchain"];
      }

      setMessages((prev) => [...prev, {
        role: 'assistant',
        headline: ragResult.headline,
        content: ragResult.answer,
        codeLang: ragResult.codeLang,
        code: ragResult.code,
        citations: ragResult.citations
      }]);
    }, 600);
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    showToast('Code snippet copied to clipboard!', 'success');
  };

  const openCitation = (citation) => {
    setActiveCitation(citation);
    setIsDrawerOpen(true);
  };

  return (
    <section id="view-copilot" className="page-view active">
      <div className="copilot-container">
        
        {/* Quick Prompt Suggestions */}
        <div className="copilot-suggestions">
          <span className="suggestions-label">Try Grounded Queries:</span>
          <button className="prompt-chip" onClick={() => submitQuickPrompt('How to trigger Bright Data Scraper Studio collector via Node.js with self-healing?')}>
            ⚡ Bright Data DCA Trigger in Node.js
          </button>
          <button className="prompt-chip" onClick={() => submitQuickPrompt('What are the breaking changes in Next.js 15 async Request headers and cookies?')}>
            🔥 Next.js 15 Async cookies() & headers()
          </button>
          <button className="prompt-chip" onClick={() => submitQuickPrompt('How to use LangChain v0.3 tool calling with structured Pydantic output?')}>
            🦜 LangChain v0.3 bind_tools() Pattern
          </button>
        </div>

        {/* Chat Message Feed */}
        <div className="chat-feed" id="chatFeed" ref={feedRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.role}`}>
              {msg.role === 'assistant' ? (
                <>
                  <div className="chat-avatar bot-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                    </svg>
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="sender-name">DocuPulse RAG Agent</span>
                      <span className="rag-status-badge green">● {msg.isWelcome ? 'Vector Grounded (18,420 Chunks)' : '98.6% Cosine Confidence'}</span>
                    </div>
                    {msg.headline && <p><strong>{msg.headline}</strong></p>}
                    <p style={{ marginTop: msg.headline ? '6px' : '0' }}>{msg.content}</p>
                    
                    {msg.code && (
                      <div className="code-block-wrapper">
                        <div className="code-header">
                          <span>{msg.codeLang.toUpperCase()}</span>
                          <button className="btn-copy-code" onClick={() => handleCopy(msg.code)}>Copy Code</button>
                        </div>
                        <pre><code>{msg.code}</code></pre>
                      </div>
                    )}

                    {msg.citations && (
                      <div className="citations-footer">
                        <span className="citations-title">Verified Scraped Source Citations (Click to Inspect)</span>
                        <div className="citation-badges-list">
                          {msg.citations.map((c, i) => (
                            <button key={i} className="citation-pill" onClick={() => openCitation(c)}>
                              <span>📖 {c.title}</span>
                              <span className="match-score">{c.score}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="chat-avatar user-avatar-msg">VK</div>
                  <div className="message-content">
                    <p>{msg.content}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Chat Input Toolbar */}
        <div className="chat-input-wrapper">
          <form id="chatForm" className="chat-input-form" onSubmit={(e) => { e.preventDefault(); handleUserQuery(inputValue); }}>
            <textarea 
              id="chatInput" 
              placeholder="Ask a technical question against indexed documentation... (e.g. Next.js 15 async API, Bright Data DCA collector trigger)" 
              rows="2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleUserQuery(inputValue);
                }
              }}
            ></textarea>
            <div className="chat-input-footer">
              <div className="rag-filter-pill">
                <span>Target Doc:</span>
                <select id="docScopeSelect" className="inline-select" value={docScope} onChange={(e) => setDocScope(e.target.value)}>
                  <option value="all">All Managed Docs (4)</option>
                  <option value="brightdata">Bright Data SDK</option>
                  <option value="nextjs">Next.js 15</option>
                  <option value="langchain">LangChain v0.3</option>
                  <option value="supabase">Supabase</option>
                </select>
              </div>
              <button type="submit" id="sendBtn" className="btn btn-primary btn-send">
                <span>Ask RAG</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </form>
        </div>

      </div>
      <CitationDrawer isOpen={isDrawerOpen} citation={activeCitation} onClose={() => setIsDrawerOpen(false)} />
    </section>
  );
}
