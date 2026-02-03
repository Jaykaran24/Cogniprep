import React, { useState, useEffect } from 'react';
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
  Filter,
  Loader
} from 'lucide-react';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import Button from '../components/Button';
import { analyticsAPI } from '../services/api';

/**
 * AnalyticsPage Component
 * Comprehensive performance analytics with charts and insights
 */
const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [analyticsData, setAnalyticsData] = useState(null);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await analyticsAPI.getPerformance({ timeRange });
        setAnalyticsData(response.data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err.response?.data?.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  // Loading state
  if (loading) {
    return (
      <AuthenticatedLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Loading analytics...</p>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <AuthenticatedLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Failed to Load Analytics</h2>
            <p className="text-red-200 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }

  const maxScore = analyticsData?.scoreHistory?.length > 0 
    ? Math.max(...analyticsData.scoreHistory.map(d => d.score || 0)) 
    : 100;
  const maxActivity = analyticsData?.weeklyActivity?.length > 0 
    ? Math.max(...analyticsData.weeklyActivity.map(d => d.interviews || 0)) 
    : 10;

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
              { icon: Target, label: 'Total', value: analyticsData?.overview?.totalInterviews || 0, color: 'from-blue-500 to-cyan-500' },
              { icon: Award, label: 'Avg Score', value: `${analyticsData?.overview?.avgScore || 0}%`, color: 'from-purple-500 to-pink-500' },
              { icon: TrendingUp, label: 'Improvement', value: `+${analyticsData?.overview?.improvementRate || 0}%`, color: 'from-green-500 to-emerald-500' },
              { icon: Clock, label: 'Total Time', value: analyticsData?.overview?.totalTime || '0h', color: 'from-orange-500 to-red-500' },
              { icon: CheckCircle2, label: 'Success Rate', value: `${analyticsData?.overview?.successRate || 0}%`, color: 'from-indigo-500 to-blue-500' },
              { icon: Zap, label: 'Streak', value: `${analyticsData?.overview?.streak || 0} days`, color: 'from-pink-500 to-rose-500' }
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
                {analyticsData?.scoreHistory && analyticsData.scoreHistory.length > 0 ? (
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
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-blue-200 dark:text-blue-300 text-sm">No score history available</p>
                  </div>
                )}
              </div>

              {/* X-axis labels */}
              {analyticsData?.scoreHistory && analyticsData.scoreHistory.length > 0 && (
                <div className="flex justify-between mt-2">
                  {analyticsData.scoreHistory.map((item, index) => (
                    <div key={index} className="text-xs text-blue-200 dark:text-blue-300">
                      {new Date(item.date).getDate()}
                    </div>
                  ))}
                </div>
              )}
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
                {analyticsData?.weeklyActivity && analyticsData.weeklyActivity.length > 0 ? (
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
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-blue-200 dark:text-blue-300 text-sm">No activity data available</p>
                  </div>
                )}
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
                {analyticsData?.categoryPerformance && analyticsData.categoryPerformance.length > 0 ? (
                  analyticsData.categoryPerformance.map((category, index) => (
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
                  ))
                ) : (
                  <p className="text-blue-200 dark:text-blue-300 text-sm text-center py-8">No category data available</p>
                )}
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
                  {analyticsData?.interviewTypes && analyticsData.interviewTypes.length > 0 ? (
                    analyticsData.interviewTypes.map((type, index) => (
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
                    ))
                  ) : (
                    <p className="text-blue-200 dark:text-blue-300 text-sm text-center py-8">No interview types data available</p>
                  )}
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
                  {analyticsData?.strengths && analyticsData.strengths.length > 0 && (
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
                  )}
                  {analyticsData?.improvements && analyticsData.improvements.length > 0 && (
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
                  )}
                  {(!analyticsData?.strengths || analyticsData.strengths.length === 0) && 
                   (!analyticsData?.improvements || analyticsData.improvements.length === 0) && (
                    <p className="text-blue-200 dark:text-blue-300 text-sm text-center py-8">Complete more interviews to get insights</p>
                  )}
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
