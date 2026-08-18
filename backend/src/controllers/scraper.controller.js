/**
 * Scraper & Self-Healing Controller
 */
const brightDataService = require('../services/brightdata.service');

exports.triggerScraper = async (req, res, next) => {
  try {
    const { url, auto_heal } = req.body;
    const result = await brightDataService.triggerCollector({ url, autoHeal: auto_heal });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to trigger scraper' });
  }
};

exports.getHealth = (req, res, next) => {
  res.json({
    status: 'healthy',
    ...brightDataService.getCollectorHealth(),
    uptime_seconds: process.uptime()
  });
};

exports.getBreakingDiff = (req, res, next) => {
  res.json({
    status: 'success',
    scanned_at: new Date().toISOString(),
    diffs_count: 2,
    diffs: brightDataService.getBreakingDiffs()
  });
};
