const Portfolio = require('../models/Portfolio');
const User = require('../models/User')
const  mongoose  = require('mongoose')
exports.getUserPortfolio = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is in the route parameters

    // Find the portfolio based on the userId field
    const portfolio = await Portfolio.findOne({ user: userId });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error('Error getting portfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.createPortfolio = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is in the route parameters

    // Check if the user exists
    const user = await User.findById(userId);

    if (!mongoose.Types.ObjectId.isValid(userId)){
      return false;
  }

    const { name } = req.body;

    // Check if the user already has a portfolio
    const existingPortfolio = await Portfolio.findOne({ user: user._id });

    if (existingPortfolio) {
      return res.status(400).json({ message: 'User already has a portfolio' });
    }

    const newPortfolio = new Portfolio({
      user: user._id,
      name,
    });

    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addPortfolioEntry = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is in the route parameters
    const { symbol } = req.body;

    const portfolio = await Portfolio.findOne({ user: userId });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Check if the symbol is already in the portfolio
    if (portfolio.entries.some(entry => entry.symbol === symbol)) {
      return res.status(400).json({ message: 'Symbol already exists in the portfolio' });
    }

    portfolio.entries.push({ symbol });
    await portfolio.save();

    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePortfolioEntry = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is in the route parameters
    const entryId = req.params.entryId;
    const { symbol } = req.body;

    const portfolio = await Portfolio.findOne({ user: userId });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const entry = portfolio.entries.id(entryId);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    entry.symbol = symbol;
    await portfolio.save();

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePortfolioEntry = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is in the route parameters
    const entryId = req.params.entryId;

    const portfolio = await Portfolio.findOne({ user: userId });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    portfolio.entries.id(entryId).remove();
    await portfolio.save();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};