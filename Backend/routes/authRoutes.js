const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Make sure each route has a proper function handler
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback);
router.get('/github', authController.githubAuth);
router.get('/github/callback', authController.githubAuthCallback);
router.get('/facebook', authController.facebookAuth);
router.get('/facebook/callback', authController.facebookAuthCallback);
router.get('/current-user', authController.getCurrentUser);
router.get('/logout', authController.logout);

module.exports = router;