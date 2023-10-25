const { body, validationResult } = require('express-validator');
const portfolio= require('../models/Portfolio'); // Import your Task model

const createportfolioValidation = [
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .custom(async (value, { req }) => {
      // Check if the task name is already in use
      const existingportfolio = await portfolio.findOne({ name: value });
      if (existingportfolio) {
        throw new Error('name must be unique');
      }
      return true;
    }),
 // body('taskDescription').notEmpty().withMessage('Task description is required'),
  body('UserID').notEmpty().withMessage('User ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { createportfolioValidation };
