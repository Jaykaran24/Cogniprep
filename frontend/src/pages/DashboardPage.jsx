import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Target, 
  Sparkles, 
  Calendar,
  BarChart3,
  PlayCircle,
  CheckCircle2,
  XCircle,
  Trophy,
  Zap,
  Video,
  Loader
} from 'lucide-react';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import Button from '../components/Button';
import { analyticsAPI, interviewAPI } from '../services/api';

/**
 * Dashboard Page Component
 * Shows user overview, statistics, and recent activity
 */
const DashboardPage = () => {
  const navigate = useNavigate();
  
  // State management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [userData] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : { fullName: 'User' };
  });

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');
        
        const [dashboardRes, interviewsRes] = await Promise.all([
          analyticsAPI.getDashboard(),
          interviewAPI.getAll({ limit: 3, sort: '-createdAt' })
        ]);
        
        setDashboardData({
          ...dashboardRes.data,
          recentInterviews: interviewsRes.data.interviews || []
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <AuthenticatedLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Loading your dashboard...</p>
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
            <h2 className="text-2xl font-bold text-white mb-2">Failed to Load Dashboard</h2>
            <p className="text-red-200 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }

  const stats = [
    {
      icon: Target,
      label: 'Total Interviews',
      value: dashboardData?.totalInterviews || 0,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Award,
      label: 'Average Score',
      value: `${dashboardData?.averageScore || 0}%`,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: TrendingUp,
      label: 'Improvement',
      value: `+${dashboardData?.improvementRate || 0}%`,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: Trophy,
      label: 'Current Streak',
      value: `${dashboardData?.streak || 0} days`,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10'
    }
  ];

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
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {userData.fullName}! 👋
            </h1>
            <p className="text-blue-200 dark:text-blue-300 text-lg">
              Here's your interview preparation overview
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                    Live
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-blue-200 dark:text-blue-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Interviews */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Clock className="text-white" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Recent Interviews</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/interviews')}
                  >
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {dashboardData?.recentInterviews && dashboardData.recentInterviews.length > 0 ? (
                    dashboardData.recentInterviews.map((interview, index) => (
                      <motion.div
                        key={interview._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                        onClick={() => navigate(`/feedback?id=${interview._id}`)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              interview.overallScore >= 80 ? 'bg-green-500/20' : 'bg-orange-500/20'
                            }`}>
                              {interview.overallScore >= 80 ? (
                                <CheckCircle2 className="text-green-400" size={20} />
                              ) : (
                                <XCircle className="text-orange-400" size={20} />
                              )}
                            </div>
                            <div>
                              <h3 className="text-white font-semibold">{interview.config?.role || 'Interview'}</h3>
                              <p className="text-sm text-blue-200 dark:text-blue-300">
                                {interview.config?.type || 'Technical'} Interview
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white mb-1">
                              {interview.overallScore || 0}%
                            </div>
                            <div className="text-xs text-blue-200 dark:text-blue-300">
                              {interview.config?.duration || 0} min
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-200 dark:text-blue-300">
                          <Calendar size={14} />
                          {new Date(interview.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-blue-200 dark:text-blue-300">No interviews yet. Start your first one!</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Performance & Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Quick Actions */}
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Zap className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Quick Actions</h2>
                </div>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/live-interview')}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl p-4 font-semibold flex items-center justify-between transition-all group shadow-lg"
                  >
                    <span className="flex items-center gap-2">
                      <Video size={20} />
                      Live AI Interview
                    </span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/setup')}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl p-4 font-semibold flex items-center justify-between transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      <PlayCircle size={20} />
                      Start New Interview
                    </span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/interviews')}
                    className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl p-4 font-semibold flex items-center justify-between transition-all border border-white/20 group"
                  >
                    <span className="flex items-center gap-2">
                      <BarChart3 size={20} />
                      View All Interviews
                    </span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Performance Insights */}
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Insights</h2>
                </div>

                {/* Strengths */}
                {dashboardData?.strengths && dashboardData.strengths.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-blue-200 dark:text-blue-300 mb-3">
                      Your Strengths
                    </h3>
                    <div className="space-y-2">
                      {dashboardData.strengths.map((strength, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 className="text-green-400" size={16} />
                          <span className="text-white text-sm">{strength}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Areas to Improve */}
                {dashboardData?.improvements && dashboardData.improvements.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-blue-200 dark:text-blue-300 mb-3">
                      Focus Areas
                    </h3>
                    <div className="space-y-2">
                      {dashboardData.improvements.map((improvement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + index * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <Target className="text-orange-400" size={16} />
                          <span className="text-white text-sm">{improvement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show placeholder if no insights yet */}
                {(!dashboardData?.strengths || dashboardData.strengths.length === 0) && 
                 (!dashboardData?.improvements || dashboardData.improvements.length === 0) && (
                  <div className="text-center py-8">
                    <p className="text-blue-200 dark:text-blue-300 text-sm">
                      Complete more interviews to get personalized insights
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
    </AuthenticatedLayout>
  );
};

export default DashboardPage;
