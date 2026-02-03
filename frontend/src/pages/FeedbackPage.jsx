import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import Navbar from '../components/Navbar';
import { Trophy, TrendingUp, MessageSquare, Target, RefreshCw, Home, CheckCircle2, Sparkles } from 'lucide-react';

/**
 * Premium Feedback Page with Animations
 */
const FeedbackPage = () => {
  const navigate = useNavigate();

  const overallScore = 78;
  
  const scores = [
    {
      category: 'Communication',
      score: 82,
      color: 'from-blue-500 to-cyan-500',
      icon: MessageSquare,
      feedback: 'Excellent articulation and clarity'
    },
    {
      category: 'Technical Skills',
      score: 75,
      color: 'from-purple-500 to-pink-500',
      icon: Target,
      feedback: 'Strong foundation with room to grow'
    },
    {
      category: 'Confidence',
      score: 77,
      color: 'from-green-500 to-emerald-500',
      icon: TrendingUp,
      feedback: 'Professional and composed'
    }
  ];

  const strengths = [
    'Clear and structured responses',
    'Good problem-solving approach',
    'Professional communication',
    'Relevant examples provided'
  ];

  const improvements = [
    'Elaborate more on technical concepts',
    'Include more specific examples',
    'Discuss trade-offs in solutions'
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    return 'text-orange-400';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 dark:from-emerald-900 dark:via-teal-900 dark:to-black">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Celebration Header */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-2xl"
          >
            <Trophy className="text-white" size={40} />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Interview Completed! 🎉
          </h1>
          <p className="text-xl text-emerald-100 dark:text-emerald-200">
            Here's your detailed performance analysis
          </p>
        </motion.div>

        {/* Overall Score Card */}
        <GlassCard className="mb-8 text-center" delay={0.2}>
          <div className="py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="relative inline-block"
            >
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: overallScore / 100 }}
                  transition={{ duration: 2, delay: 0.5 }}
                  strokeDasharray="339.292"
                  strokeDashoffset="0"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className={`text-5xl font-bold ${getScoreColor(overallScore)}`}
                >
                  {overallScore}
                </motion.div>
                <div className="text-sm text-white/70">out of 100</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <h2 className="text-3xl font-bold text-white mb-2 mt-6">Overall Performance</h2>
              <p className={`text-xl font-semibold ${getScoreColor(overallScore)}`}>
                {getScoreLabel(overallScore)}
              </p>
            </motion.div>
          </div>
        </GlassCard>

        {/* Detailed Scores */}
        <div className="mb-8">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="text-2xl font-bold text-white mb-6"
          >
            Detailed Analysis
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scores.map((item, index) => (
              <GlassCard key={index} delay={1.3 + index * 0.1}>
                <div className="text-center">
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.1, type: 'spring' }}
                    className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}
                  >
                    <item.icon className="text-white" size={28} />
                  </motion.div>
                  <h4 className="font-bold text-white mb-3 text-lg">{item.category}</h4>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-emerald-100">Score</span>
                      <span className={`text-lg font-bold ${getScoreColor(item.score)}`}>
                        {item.score}%
                      </span>
                    </div>
                    <ProgressBar value={item.score} color={item.color} delay={1.5 + index * 0.1} />
                  </div>
                  
                  <p className="text-sm text-emerald-100 dark:text-emerald-200">{item.feedback}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <GlassCard delay={1.8}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-green-500/20 backdrop-blur-xl rounded-lg flex items-center justify-center border border-green-400/30">
                <CheckCircle2 className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Strengths</h3>
            </div>
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.9 + index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="text-green-400" size={14} />
                  </div>
                  <span className="text-emerald-100 dark:text-emerald-200 text-sm">{strength}</span>
                </motion.li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard delay={2}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 backdrop-blur-xl rounded-lg flex items-center justify-center border border-blue-400/30">
                <TrendingUp className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Areas to Improve</h3>
            </div>
            <ul className="space-y-3">
              {improvements.map((improvement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.1 + index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="text-blue-400" size={14} />
                  </div>
                  <span className="text-emerald-100 dark:text-emerald-200 text-sm">{improvement}</span>
                </motion.li>
              ))}
            </ul>
          </GlassCard>
        </div>

        {/* AI Summary */}
        <GlassCard className="mb-8" delay={2.4}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-yellow-400" size={24} />
            <h3 className="text-xl font-bold text-white">AI Feedback Summary</h3>
          </div>
          <p className="text-emerald-100 dark:text-emerald-200 leading-relaxed">
            You demonstrated <strong>strong overall performance</strong> in this interview. Your communication 
            skills are excellent, and you provided clear, structured responses. Your technical knowledge is 
            solid, though there's room to dive deeper into certain concepts. Your confidence level was 
            appropriate throughout the interview. Focus on providing more specific examples from your 
            experience and discussing trade-offs in your solutions to further improve. Keep practicing, 
            and you'll continue to excel! 🚀
          </p>
        </GlassCard>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            icon={RefreshCw}
            onClick={() => navigate('/setup')}
          >
            Try Another Interview
          </Button>
          <Button
            variant="secondary"
            size="lg"
            icon={Home}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="text-center mt-8"
        >
          <p className="text-emerald-100 dark:text-emerald-200 text-lg">
            🎯 Practice makes perfect! Keep improving your interview skills.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackPage;
