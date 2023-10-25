// routes/portfolio.js
//const passport = require('passport');
const express = require('express');
const router = express.Router();
const portfoliocontroller = require('../controllers/portfoliocontroller');
//const {createportfolioValidation} = require('../middlewares/portfoliomiddleware')

// Protect these routes with authentication middleware
//router.use(passport.authenticate('jwt', { session: false }));

   
// Get user's portfolio
router.get('/user-portfolio', portfoliocontroller.getUserPortfolio);
//router.get('/user-portfolio', passport.authenticate('jwt', { session: false }), portfolioController.getUserPortfolio);

// Create a new portfolio
router.post('/create-portfolio', portfoliocontroller.createPortfolio);

// Add a portfolio entry
router.post('/add-entry', portfoliocontroller.addPortfolioEntry);

// Update a portfolio entry
router.put('/update-entry/:entryId', portfoliocontroller.updatePortfolioEntry);

// Delete a portfolio entry
router.delete('/delete-entry/:entryId', portfoliocontroller.deletePortfolioEntry);

module.exports = router;
