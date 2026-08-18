const express = require('express');
const router = express.Router();
const ragController = require('../controllers/rag.controller');

router.post('/chat/rag', ragController.handleRagQuery);
router.post('/vector-search', ragController.handleVectorSearch);

module.exports = router;
