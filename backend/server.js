/**
 * DocuPulse AI — Application Entry Point
 * Architecture: Modular Express + Clean Architecture Layering
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./src/config');
const apiRoutes = require('./src/routes');

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root Health & Information Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'DocuPulse AI Backend API',
    collector_id: config.brightData.collectorId,
    documentation: 'Self-Healing Documentation RAG & Developer Copilot',
    endpoints: [
      'POST /api/chat/rag',
      'POST /api/vector-search',
      'POST /api/scraper/trigger',
      'GET  /api/scraper/health',
      'GET  /api/breaking-diff',
      'GET  /api/doc-stores'
    ]
  });
});

// Mount API Routes under /api
app.use('/api', apiRoutes);

// Also mount direct routes if called without /api prefix
app.use('/', apiRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message, err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// Start HTTP Server
app.listen(config.port, () => {
  console.log(`=============================================================`);
  console.log(`🚀 DocuPulse AI Server running on: http://localhost:${config.port}`);
  console.log(`⚡ Active Bright Data Collector:   ${config.brightData.collectorId}`);
  console.log(`=============================================================`);
});

module.exports = app;
// Pipeline verified: Wed Aug 19 00:40:45 IST 2026
