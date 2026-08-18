const express = require('express');
const router = express.Router();
const scraperController = require('../controllers/scraper.controller');

router.post('/scraper/trigger', scraperController.triggerScraper);
router.post('/trigger', scraperController.triggerScraper);

router.get('/scraper/health', scraperController.getHealth);
router.get('/health', scraperController.getHealth);

router.get('/breaking-diff', scraperController.getBreakingDiff);
router.get('/diff', scraperController.getBreakingDiff);

module.exports = router;
