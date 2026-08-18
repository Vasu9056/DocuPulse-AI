/**
 * Master API Router
 */
const express = require('express');
const router = express.Router();

const ragRoutes = require('./rag.routes');
const scraperRoutes = require('./scraper.routes');
const docRoutes = require('./doc.routes');

// Mount sub-routes
router.use('/', ragRoutes);
router.use('/', scraperRoutes);
router.use('/', docRoutes);

module.exports = router;
