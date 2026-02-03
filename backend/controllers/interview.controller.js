const Interview = require('../models/Interview.model');
const Question = require('../models/Question.model');
const User = require('../models/User.model');
const { v4: uuidv4 } = require('uuid');

// @desc    Create new interview
// @route   POST /api/interviews
// @access  Private
exports.createInterview = async (req, res, next) => {
  try {
    const { role, experienceLevel, type, duration, questionCount } = req.body;

    // Get random questions based on role and difficulty
    const questions = await Question.aggregate([
      {
        $match: {
          category: role,
          isActive: true
        }
      },
      { $sample: { size: questionCount || 10 } }
    ]);

    // Create interview
    const interview = await Interview.create({
      userId: req.user._id,
      sessionId: uuidv4(),
      config: {
        role,
        experienceLevel: experienceLevel || 'fresher',
        type: type || 'technical',
        duration: duration || 30,
        questionCount: questionCount || 10
      },
      questions: questions.map(q => ({
        questionId: q._id,
        questionText: q.text,
        category: q.category,
        difficulty: q.difficulty,
        askedAt: new Date()
      }))
    });

    res.status(201).json({
      success: true,
      message: 'Interview created successfully',
      data: interview
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all interviews for user
// @route   GET /api/interviews
// @access  Private
exports.getInterviews = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, role } = req.query;
    
    const query = { userId: req.user._id };
    if (status) query.status = status;
    if (role) query['config.role'] = role;

    const interviews = await Interview.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-questions.response.audioData'); // Exclude audio data for list view

    const count = await Interview.countDocuments(query);

    res.status(200).json({
      success: true,
      data: interviews,
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

// @desc    Get single interview
// @route   GET /api/interviews/:id
// @access  Private
exports.getInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    // Check ownership
    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this interview'
      });
    }

    res.status(200).json({
      success: true,
      data: interview
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update interview
// @route   PUT /api/interviews/:id
// @access  Private
exports.updateInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    // Check ownership
    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this interview'
      });
    }

    const updatedInterview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Interview updated successfully',
      data: updatedInterview
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete interview
// @route   DELETE /api/interviews/:id
// @access  Private
exports.deleteInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    // Check ownership
    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this interview'
      });
    }

    await Interview.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Interview deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Start interview
// @route   POST /api/interviews/:id/start
// @access  Private
exports.startInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    interview.status = 'in-progress';
    interview.startTime = new Date();
    await interview.save();

    res.status(200).json({
      success: true,
      message: 'Interview started',
      data: interview
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete interview
// @route   POST /api/interviews/:id/complete
// @access  Private
exports.completeInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    interview.status = 'completed';
    interview.endTime = new Date();
    interview.duration = Math.floor((interview.endTime - interview.startTime) / 1000);
    await interview.save();

    // Update user stats
    const user = await User.findById(interview.userId);
    await user.updateStats({
      duration: interview.duration,
      overallScore: interview.overallScore?.overall || 0
    });

    res.status(200).json({
      success: true,
      message: 'Interview completed',
      data: interview
    });
  } catch (error) {
    next(error);
  }
};
