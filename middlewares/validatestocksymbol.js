// Import necessary modules
const axios = require('axios');
const apiKey = '2H7TVLS4BRZ7W7PL'; // Replace with your actual API key

// Validate stock symbol function
async function validateStockSymbol(symbol) {
  try {
    // Make a request to Alpha Vantage to get stock information for the given symbol
    const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
    
    const data = response.data;

    // Check if the response contains valid stock information
    if (data && data['Global Quote'] && data['Global Quote']['01. symbol'] === symbol) {
      return true; // Symbol is valid
    } else {
      return false; // Symbol is not valid
    }
  } catch (error) {
    console.error('Error validating stock symbol:', error);
    throw error; // Propagate the error
  }
}

module.exports = { validateStockSymbol };
