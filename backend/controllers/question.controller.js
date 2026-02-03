const Question = require('../models/Question.model');

// @desc    Get all questions with filters
// @route   GET /api/questions
// @access  Private
exports.getQuestions = async (req, res, next) => {
  try {
    const { category, difficulty, type, page = 1, limit = 20 } = req.query;
    
    const query = { isActive: true };
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (type) query.type = type;

    const questions = await Question.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-stats'); // Exclude stats for list view

    const count = await Question.countDocuments(query);

    res.status(200).json({
      success: true,
      data: questions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single question
// @route   GET /api/questions/:id
// @access  Private
exports.getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.status(200).json({
      success: true,
      data: question
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get random questions for interview
// @route   GET /api/questions/random/:role
// @access  Private
exports.getRandomQuestions = async (req, res, next) => {
  try {
    const { role } = req.params;
    const { count = 10, difficulty } = req.query;

    const matchQuery = {
      category: role,
      isActive: true
    };

    if (difficulty) {
      matchQuery.difficulty = difficulty;
    }

    const questions = await Question.aggregate([
      { $match: matchQuery },
      { $sample: { size: parseInt(count) } },
      {
        $project: {
          text: 1,
          category: 1,
          type: 1,
          difficulty: 1,
          tags: 1,
          expectedKeywords: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: questions
    });
  } catch (error) {
    next(error);
  }
};
