// services/stockService.js
// const axios = require('axios');
// const apiKey = 'GC53R086W9UUPNG9'; // Replace with your actual API key

// async function getStockData(symbol) {
//   try {
//     const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`);
//     const data = response.data;
    
//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = { getStockData };
// stockService.js
const yahooFinance = require('yahoo-finance2');

async function getStockData(symbol) {
  try {
    const result = await yahooFinance.quote({
      symbol: symbol,
    });

    // Extract relevant information from the result
    const stockData = {
      symbol: result.symbol,
      price: result.regularMarketPrice,
      change: result.regularMarketChange,
      changePercent: result.regularMarketChangePercent,
    };

    return stockData;
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
    throw error;
  }
}

module.exports = { getStockData };
