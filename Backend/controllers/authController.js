const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Frontend URL configuration
const frontendUrl = process.env.NODE_ENV === 'production' 
  ? process.env.FRONTEND_URL 
  : 'http://localhost:5173';



// Google Authentication
exports.googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

exports.googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', {
    failureRedirect: `${frontendUrl}/login?error=auth_failed`
  })(req, res, (err) => {
    if (err) {
      return res.redirect(`${frontendUrl}/login?error=server_error`);
    }
    res.redirect(`${frontendUrl}`);
  });
};

// GitHub Authentication
exports.githubAuth = passport.authenticate('github', {
  scope: ['user:email']
});

exports.githubAuthCallback = (req, res, next) => {
  passport.authenticate('github', {
    failureRedirect: `${frontendUrl}/login?error=auth_failed`
  })(req, res, (err) => {
    if (err) {
      return res.redirect(`${frontendUrl}/login?error=server_error`);
    }
    res.redirect(`${frontendUrl}/dashboard`);
  });
};

// Facebook Authentication
exports.facebookAuth = passport.authenticate('facebook', {
  scope: ['email']
});

exports.facebookAuthCallback = (req, res, next) => {
  passport.authenticate('facebook', {
    failureRedirect: `${frontendUrl}/login?error=auth_failed`
  })(req, res, (err) => {
    if (err) {
      return res.redirect(`${frontendUrl}/login?error=server_error`);
    }
    res.redirect(`${frontendUrl}/dashboard`);
  });
};

// Current User Endpoint
exports.getCurrentUser = (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};

// Logout Endpoint
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Error logging out' });
    }
    
    req.logout(() => {
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