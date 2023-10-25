// Passport.js configuration for user authentication
const passport = require('passport');
const User = require('../models/User'); // Import the User model
const { Strategy, ExtractJwt } = require('passport-jwt');

// Replace 'your-secret-key' with a strong and secure key
const secretKey = 'sohan-khedekar';

// Configure the JWT strategy for authentication
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
