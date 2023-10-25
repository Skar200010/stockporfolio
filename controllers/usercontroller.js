const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // For hashing passwords

// Define your secret key here
const secretKey = 'sohan-khedekar';

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Create a JWT token for the new user
    const token = jwt.sign({ userId: newUser._id }, secretKey, {
      expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
    });

    // Respond with the token and user data
    res.status(201).json({ token, user: { _id: newUser._id, username: newUser.username } });
  } catch (error) {
    next(error);
  }
};

// User login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the entered password with the stored, hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Create a JWT token for the user
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
    });

    // Respond with the token and user data
    res.status(200).json({ token, user: { _id: user._id, username: user.username } });
  } catch (error) {
    next(error);
  }
};
