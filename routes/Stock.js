// routes/stockRoutes.js
const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockcontroller');

// Fetch stock data for a specific symbol
router.get('/stock/:symbol', stockController.fetchStockData);

module.exports = router;
