const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const questionController = require('../controllers/question.controller');

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.get('/', questionController.getQuestions);
router.get('/:id', questionController.getQuestion);
router.get('/random/:role', questionController.getRandomQuestions);

module.exports = router;
