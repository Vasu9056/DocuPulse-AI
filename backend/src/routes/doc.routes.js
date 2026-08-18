const express = require('express');
const router = express.Router();
const docController = require('../controllers/doc.controller');

router.get('/doc-stores', docController.getDocStores);

module.exports = router;
