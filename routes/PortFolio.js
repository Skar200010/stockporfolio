const express = require('express');
const router = express.Router();
const portfoliocontroller = require('../controllers/portfoliocontroller');
const stockController = require('../controllers/stockcontroller');



   
// Get user's portfolio
router.get('/user-portfolio/:userId', portfoliocontroller.getUserPortfolio);

// Create a new portfolio
router.post('/create-portfolio/:userId', portfoliocontroller.createPortfolio);

// Add a portfolio entry
router.post('/user/:userId/portfolio/add-entry', portfoliocontroller.addPortfolioEntry);

// Update a portfolio entry
router.put('/user/:userId/portfolio/update-entry/:entryId', portfoliocontroller.updatePortfolioEntry);

// Delete a portfolio entry
router.delete('/user/:userId/portfolio/delete-entry/:entryId', portfoliocontroller.deletePortfolioEntry);

router.get('/stock/:symbol', stockController.fetchStockData);


module.exports = router;
