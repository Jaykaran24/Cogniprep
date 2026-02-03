const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.get('/me', userController.getMe);
router.put('/me', userController.updateProfile);
router.delete('/me', userController.deleteAccount);
router.get('/stats', userController.getStats);

module.exports = router;
