// services/stockService.js
const axios = require('axios');
const apiKey = 'GC53R086W9UUPNG9'; // Replace with your actual API key

async function getStockData(symbol) {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = { getStockData };
