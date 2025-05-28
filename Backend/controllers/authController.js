const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');



exports.googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

exports.googleAuthCallback = passport.authenticate('google', {
  successRedirect: process.env.FRONTEND_URL,
  failureRedirect: '/login'
});

exports.githubAuth = passport.authenticate('github', {
  scope: ['user:email']
});

exports.githubAuthCallback = passport.authenticate('github', {
  successRedirect: process.env.FRONTEND_URL,
  failureRedirect: '/login'
});

exports.facebookAuth = passport.authenticate('facebook', {
  scope: ['email']
});

exports.facebookAuthCallback = passport.authenticate('facebook', {
  successRedirect: process.env.FRONTEND_URL,
  failureRedirect: '/login'
});

exports.getCurrentUser = (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};

// controllers/authController.js
exports.logout = (req, res) => {
  // Destroy the session first
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Error logging out' });
    }
    
    // Then logout (passport)
    req.logout(() => {
      // Clear the session cookie
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
      });
      
      res.json({ message: 'Logged out successfully' });
    });
  });
};
