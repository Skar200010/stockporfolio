// Routes for user authentication
const express = require('express');
const userController = require('../controllers/usercontroller');
const authentication = require('../middlewares/authenticate')

const router = express.Router();


router.post('/register',userController.register);
router.post('/login', userController.login);
router.post('/logout',userController.logout)
router.get('/profile',authentication.authenticateToken,userController.profile)


  
module.exports = router;
