const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const analyticsController = require('../controllers/analytics.controller');

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.get('/dashboard', analyticsController.getDashboard);
router.get('/performance', analyticsController.getPerformance);
router.get('/leaderboard', analyticsController.getLeaderboard);

module.exports = router;
