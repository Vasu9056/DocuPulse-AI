const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./src/config');
const apiRoutes = require('./src/routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

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

app.use('/api', apiRoutes);
app.use('/', apiRoutes);

app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message, err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

app.listen(config.port, () => {
  console.log(`=============================================================`);
  console.log(`🚀 DocuPulse AI Server running on: http://localhost:${config.port}`);
  console.log(`⚡ Active Bright Data Collector:   ${config.brightData.collectorId}`);
  console.log(`=============================================================`);
});

module.exports = app;
