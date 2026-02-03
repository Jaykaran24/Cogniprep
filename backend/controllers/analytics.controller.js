const Interview = require('../models/Interview.model');
const User = require('../models/User.model');
const mongoose = require('mongoose');

// @desc    Get user dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private
exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get user stats
    const user = await User.findById(userId);

    // Get recent interviews
    const recentInterviews = await Interview.find({
      userId,
      status: 'completed'
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('config overallScore createdAt duration');

    // Get category performance
    const categoryPerformance = await Interview.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          status: 'completed'
        }
      },
      {
        $group: {
          _id: '$config.role',
          avgScore: { $avg: '$overallScore.overall' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          category: '$_id',
          averageScore: { $round: ['$avgScore', 1] },
          interviewCount: '$count',
          _id: 0
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: user.stats,
        recentInterviews,
        categoryPerformance
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get performance over time
// @route   GET /api/analytics/performance
// @access  Private
exports.getPerformance = async (req, res, next) => {
  try {
    const { timeRange = 30 } = req.query; // days
    const userId = req.user._id;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timeRange));

    const performanceData = await Interview.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          status: 'completed',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          avgScore: { $avg: '$overallScore.overall' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $project: {
          date: '$_id',
          averageScore: { $round: ['$avgScore', 1] },
          interviewCount: '$count',
          _id: 0
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: performanceData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get global leaderboard
// @route   GET /api/analytics/leaderboard
// @access  Private
exports.getLeaderboard = async (req, res, next) => {
  try {
    const { role, limit = 100 } = req.query;

    const matchStage = role
      ? { 'config.role': role, status: 'completed' }
      : { status: 'completed' };

    const leaderboard = await Interview.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$userId',
          avgScore: { $avg: '$overallScore.overall' },
          totalInterviews: { $sum: 1 },
          bestScore: { $max: '$overallScore.overall' }
        }
      },
      {
        $match: { totalInterviews: { $gte: 3 } }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      { $sort: { avgScore: -1 } },
      { $limit: parseInt(limit) },
      {
        $project: {
          userId: '$_id',
          name: '$user.fullName',
          email: '$user.email',
          avatar: '$user.profile.avatar',
          averageScore: { $round: ['$avgScore', 1] },
          totalInterviews: 1,
          bestScore: { $round: ['$bestScore', 1] },
          _id: 0
        }
      }
    ]);

    // Add rank
    const leaderboardWithRank = leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));

    res.status(200).json({
      success: true,
      data: leaderboardWithRank
    });
  } catch (error) {
    next(error);
  }
};
