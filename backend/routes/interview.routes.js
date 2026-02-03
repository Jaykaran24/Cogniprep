const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const interviewController = require('../controllers/interview.controller');

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.post('/', interviewController.createInterview);
router.get('/', interviewController.getInterviews);
router.get('/:id', interviewController.getInterview);
router.put('/:id', interviewController.updateInterview);
router.delete('/:id', interviewController.deleteInterview);
router.post('/:id/start', interviewController.startInterview);
router.post('/:id/complete', interviewController.completeInterview);

module.exports = router;
