// stockController.js
const stockService = require('../stockservices');

// Fetch stock data for a specific symbol
exports.fetchStockData = async (req, res) => {
  try {
    const { symbol } = req.params; // Assuming the symbol is provided as a URL parameter

    if (!symbol) {
      return res.status(400).json({ message: 'Stock symbol is required' });
    }

    const stockData = await stockService.getStockData(symbol);

    // Handle and process the stock data here
    res.status(200).json(stockData);
  } catch (error) {
    // Handle any errors that may occur during the API request
    console.error('Error fetching stock data:', error);
    // You may want to send an error response to the client or handle it in your own way
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
};
