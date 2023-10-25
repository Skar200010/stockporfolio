// models/Stock.js
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  name: String,
  price: Number,
  // Add more fields as needed
});

module.exports = mongoose.model('stock', stockSchema);
