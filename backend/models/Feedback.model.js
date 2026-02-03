const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comments: String,
  helpful: {
    type: Boolean,
    default: true
  },
  accuracyRating: {
    type: Number,
    min: 1,
    max: 5
  },
  suggestions: String
}, {
  timestamps: true
});

// Indexes
feedbackSchema.index({ interviewId: 1 });
feedbackSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Feedback', feedbackSchema);
