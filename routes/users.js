// Routes for user authentication
const passport = require('passport');
const express = require('express');
const userController = require('../controllers/usercontroller');

const router = express.Router();


router.post('/register',userController.register);
router.post('/login', userController.login);

router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    // This route is protected. Only authenticated users with a valid JWT token can access it.
    // You can access the authenticated user via req.user.
    res.json({ message: 'Welcome to your dashboard!', user: req.user });
  });
  
module.exports = router;
