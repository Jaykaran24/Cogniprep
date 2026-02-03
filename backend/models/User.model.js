const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profile: {
    avatar: {
      type: String,
      default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
    },
    targetRole: {
      type: String,
      enum: ['frontend', 'backend', 'fullstack', 'data-science', 'devops', 'mobile', 'other'],
      default: 'fullstack'
    },
    experienceLevel: {
      type: String,
      enum: ['fresher', '1-3 years', '3+ years'],
      default: 'fresher'
    },
    skills: [{
      type: String
    }],
    linkedIn: String,
    github: String
  },
  stats: {
    totalInterviews: {
      type: Number,
      default: 0
    },
    totalMinutes: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    lastInterviewDate: Date
  },
  settings: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    }
  }
}, {
  timestamps: true
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ 'stats.totalInterviews': -1 });
userSchema.index({ createdAt: -1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update stats method
userSchema.methods.updateStats = async function(interviewData) {
  this.stats.totalInterviews += 1;
  this.stats.totalMinutes += Math.floor(interviewData.duration / 60);
  
  // Recalculate average score
  const totalScore = this.stats.averageScore * (this.stats.totalInterviews - 1) + interviewData.overallScore;
  this.stats.averageScore = Math.round((totalScore / this.stats.totalInterviews) * 10) / 10;
  
  this.stats.lastInterviewDate = new Date();
  await this.save();
};

module.exports = mongoose.model('User', userSchema);
