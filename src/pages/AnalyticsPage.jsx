import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  BarChart3,
  Calendar,
  Target,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  Activity,
  Zap,
  Brain,
  MessageSquare,
  Code,
  ArrowUp,
  ArrowDown,
  Filter
} from 'lucide-react';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import Button from '../components/Button';

/**
 * AnalyticsPage Component
 * Comprehensive performance analytics with charts and insights
 */
const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('week'); // week, month, year, all

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalInterviews: 12,
      avgScore: 85,
      improvementRate: 15,
      totalTime: '6h 30m',
      successRate: 92,
      streak: 5
    },
    scoreHistory: [
      { date: '2026-01-05', score: 76 },
      { date: '2026-01-06', score: 79 },
      { date: '2026-01-07', score: 82 },
      { date: '2026-01-08', score: 82 },
      { date: '2026-01-09', score: 85 },
      { date: '2026-01-10', score: 88 },
      { date: '2026-01-11', score: 85 },
      { date: '2026-01-12', score: 90 }
    ],
    categoryPerformance: [
      { name: 'Technical Skills', score: 88, change: 12, trend: 'up' },
      { name: 'Communication', score: 85, change: 8, trend: 'up' },
      { name: 'Problem Solving', score: 82, change: 5, trend: 'up' },
      { name: 'Confidence', score: 90, change: 15, trend: 'up' },
      { name: 'Time Management', score: 78, change: -3, trend: 'down' }
    ],
    interviewTypes: [
      { type: 'Technical', count: 7, avgScore: 86, color: 'from-blue-500 to-cyan-500' },
      { type: 'Behavioral', count: 5, avgScore: 84, color: 'from-purple-500 to-pink-500' }
    ],
    weeklyActivity: [
      { day: 'Mon', interviews: 2 },
      { day: 'Tue', interviews: 1 },
      { day: 'Wed', interviews: 3 },
      { day: 'Thu', interviews: 2 },
      { day: 'Fri', interviews: 1 },
      { day: 'Sat', interviews: 0 },
      { day: 'Sun', interviews: 3 }
    ],
    strengths: [
      'React & JavaScript',
      'System Design',
      'Clear Communication',
      'Problem Breakdown'
    ],
    improvements: [
      'Algorithm Optimization',
      'Time Complexity Analysis',
      'Handling Edge Cases'
    ]
  };

  const maxScore = Math.max(...analyticsData.scoreHistory.map(d => d.score));
  const maxActivity = Math.max(...analyticsData.weeklyActivity.map(d => d.interviews));

  return (
    <AuthenticatedLayout>
      <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Performance Analytics 📊
                </h1>
                <p className="text-blue-200 dark:text-blue-300 text-lg">
                  Track your progress and identify areas for improvement
                </p>
              </div>

              {/* Time Range Filter */}
              <div className="flex gap-2">
                {['week', 'month', 'year', 'all'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      timeRange === range
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { icon: Target, label: 'Total', value: analyticsData.overview.totalInterviews, color: 'from-blue-500 to-cyan-500' },
              { icon: Award, label: 'Avg Score', value: `${analyticsData.overview.avgScore}%`, color: 'from-purple-500 to-pink-500' },
              { icon: TrendingUp, label: 'Improvement', value: `+${analyticsData.overview.improvementRate}%`, color: 'from-green-500 to-emerald-500' },
              { icon: Clock, label: 'Total Time', value: analyticsData.overview.totalTime, color: 'from-orange-500 to-red-500' },
              { icon: CheckCircle2, label: 'Success Rate', value: `${analyticsData.overview.successRate}%`, color: 'from-indigo-500 to-blue-500' },
              { icon: Zap, label: 'Streak', value: `${analyticsData.overview.streak} days`, color: 'from-pink-500 to-rose-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/20"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                  <stat.icon className="text-white" size={20} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-blue-200 dark:text-blue-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Score History Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Score Progress</h2>
                  <p className="text-sm text-blue-200 dark:text-blue-300">Your performance over time</p>
                </div>
              </div>

              {/* Line Chart */}
              <div className="relative h-48">
                <div className="absolute inset-0 flex items-end justify-between gap-2">
                  {analyticsData.scoreHistory.map((item, index) => {
                    const height = (item.score / maxScore) * 100;
                    return (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                        className="flex-1 bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg relative group cursor-pointer"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-xl px-2 py-1 rounded-lg text-xs text-white whitespace-nowrap">
                          {item.score}%
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between mt-2">
                {analyticsData.scoreHistory.map((item, index) => (
                  <div key={index} className="text-xs text-blue-200 dark:text-blue-300">
                    {new Date(item.date).getDate()}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Calendar className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Weekly Activity</h2>
                  <p className="text-sm text-blue-200 dark:text-blue-300">Interviews per day</p>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="relative h-48">
                <div className="absolute inset-0 flex items-end justify-between gap-3">
                  {analyticsData.weeklyActivity.map((item, index) => {
                    const height = maxActivity > 0 ? (item.interviews / maxActivity) * 100 : 0;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                          className={`w-full rounded-t-lg relative group cursor-pointer ${
                            item.interviews > 0 
                              ? 'bg-gradient-to-t from-green-500 to-emerald-600' 
                              : 'bg-white/10'
                          }`}
                        >
                          {item.interviews > 0 && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white font-bold text-sm">
                              {item.interviews}
                            </div>
                          )}
                        </motion.div>
                        <div className="text-xs text-blue-200 dark:text-blue-300 font-medium">
                          {item.day}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Category Performance & Interview Types */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Category Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Activity className="text-white" size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Category Performance</h2>
              </div>

              <div className="space-y-4">
                {analyticsData.categoryPerformance.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">{category.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${
                          category.trend === 'up' ? 'text-green-400' : 'text-red-400'
                        } flex items-center gap-1`}>
                          {category.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                          {Math.abs(category.change)}%
                        </span>
                        <span className="text-white font-bold">{category.score}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${category.score}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                        className={`h-full ${
                          category.score >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                          category.score >= 60 ? 'bg-gradient-to-r from-orange-500 to-yellow-600' :
                          'bg-gradient-to-r from-red-500 to-orange-600'
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Interview Types & Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Interview Types */}
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Code className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Interview Types</h2>
                </div>

                <div className="space-y-4">
                  {analyticsData.interviewTypes.map((type, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                      className="bg-white/5 rounded-xl p-4 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-semibold">{type.type}</span>
                        <span className="text-2xl font-bold text-white">{type.avgScore}%</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-blue-200 dark:text-blue-300">
                        <span>{type.count} interviews completed</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Brain className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Key Insights</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-green-400 mb-2">Top Strengths</h3>
                    <div className="flex flex-wrap gap-2">
                      {analyticsData.strengths.map((strength, i) => (
                        <span key={i} className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-lg">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-orange-400 mb-2">Focus Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {analyticsData.improvements.map((improvement, i) => (
                        <span key={i} className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1 rounded-lg">
                          {improvement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Ready to Improve Your Scores?
                </h3>
                <p className="text-blue-200 dark:text-blue-300">
                  Start a new practice session and put your skills to the test
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/leaderboard')}
                  icon={Award}
                >
                  View Leaderboard
                </Button>
                <Button
                  size="lg"
                  onClick={() => navigate('/setup')}
                  icon={Zap}
                >
                  Start Interview
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
    </AuthenticatedLayout>
  );
};

export default AnalyticsPage;
