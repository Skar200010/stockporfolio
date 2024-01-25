// stockController.js
const stockService = require('../services/auth/stockservices/stockservices');

exports.fetchStockData = async (req, res) => {
  try {
    const { symbol } = req.params; 

    if (!symbol) {
      return res.status(400).json({ message: 'Stock symbol is required' });
    }

    const stockData = await stockService.getStockData(symbol);
    console.log('Stock Data Response:', stockData);
    res.status(200).json(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
};
