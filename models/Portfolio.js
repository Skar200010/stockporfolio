const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId , ref: 'User'},
  name: String, // Optional: You can include a name for the portfolio if needed
  entries: [
    {
      symbol: String, // Stock symbol (e.g., AAPL, MSFT)
    },
  ],
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
