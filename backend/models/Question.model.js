const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'fullstack', 'data-science', 'devops', 'mobile', 'behavioral', 'system-design']
  },
  type: {
    type: String,
    enum: ['technical', 'behavioral', 'coding'],
    default: 'technical'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  tags: [{
    type: String
  }],
  expectedKeywords: [{
    type: String
  }],
  expectedConcepts: [{
    type: String
  }],
  sampleAnswer: {
    type: String
  },
  stats: {
    timesAsked: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    averageDuration: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: String,
    default: 'system'
  }
}, {
  timestamps: true
});

// Indexes
questionSchema.index({ category: 1, difficulty: 1, isActive: 1 });
questionSchema.index({ tags: 1 });
questionSchema.index({ type: 1 });

module.exports = mongoose.model('Question', questionSchema);
