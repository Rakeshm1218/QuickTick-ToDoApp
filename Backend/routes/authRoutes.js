const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback);
router.get('/github', authController.githubAuth);
router.get('/github/callback', authController.githubAuthCallback);
router.get('/facebook', authController.facebookAuth);
router.get('/facebook/callback', authController.facebookAuthCallback);
router.get('/current-user', authController.getCurrentUser);
router.get('/logout', authController.logout);

module.exports = router;