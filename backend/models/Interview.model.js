const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  sessionId: {
    type: String,
    unique: true,
    required: true
  },
  config: {
    role: {
      type: String,
      required: true,
      enum: ['frontend', 'backend', 'fullstack', 'data-science', 'devops', 'mobile']
    },
    experienceLevel: {
      type: String,
      enum: ['fresher', '1-3 years', '3+ years'],
      default: 'fresher'
    },
    type: {
      type: String,
      enum: ['technical', 'behavioral', 'mixed'],
      default: 'technical'
    },
    duration: {
      type: Number,
      default: 30
    },
    questionCount: {
      type: Number,
      default: 10
    }
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'abandoned'],
    default: 'pending',
    index: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  duration: Number, // actual duration in seconds
  questions: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    questionText: String,
    category: String,
    difficulty: String,
    askedAt: Date,
    response: {
      text: String, // Transcribed answer
      audioData: String, // Base64 encoded audio (for free tier - no S3)
      duration: Number,
      transcriptSegments: [{
        text: String,
        timestamp: Number,
        confidence: Number
      }],
      behavioral: {
        speechRate: Number, // words per minute
        pauseCount: Number,
        fillerWords: Number,
        sentiment: String
      }
    },
    score: {
      relevance: { type: Number, min: 0, max: 10 },
      completeness: { type: Number, min: 0, max: 10 },
      technicalAccuracy: { type: Number, min: 0, max: 10 },
      communication: { type: Number, min: 0, max: 10 },
      overall: { type: Number, min: 0, max: 10 }
    },
    feedback: {
      strengths: [String],
      improvements: [String],
      tips: [String]
    }
  }],
  overallScore: {
    technical: { type: Number, min: 0, max: 10 },
    communication: { type: Number, min: 0, max: 10 },
    behavioral: { type: Number, min: 0, max: 10 },
    overall: { type: Number, min: 0, max: 10 }
  },
  summary: {
    strengths: [String],
    weaknesses: [String],
    recommendations: [String],
    overallFeedback: String
  },
  analytics: {
    totalWords: Number,
    averageSpeechRate: Number,
    confidenceScore: Number,
    averageResponseTime: Number
  }
}, {
  timestamps: true
});

// Indexes
interviewSchema.index({ userId: 1, createdAt: -1 });
interviewSchema.index({ status: 1, startTime: -1 });
interviewSchema.index({ 'config.role': 1, 'overallScore.overall': -1 });

module.exports = mongoose.model('Interview', interviewSchema);
