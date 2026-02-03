import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy,
  Award,
  Medal,
  Star,
  TrendingUp,
  Users,
  Target,
  Zap,
  Crown,
  Flame,
  ChevronUp,
  ChevronDown,
  Filter,
  Calendar,
  Loader,
  XCircle
} from 'lucide-react';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import Button from '../components/Button';
import { analyticsAPI } from '../services/api';

/**
 * LeaderboardPage Component
 * Global and filtered leaderboards with rankings
 */
const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('global');
  const [timeFrame, setTimeFrame] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);
  
  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await analyticsAPI.getLeaderboard({
          role: activeTab !== 'global' ? activeTab : undefined,
          limit: 50
        });
        
        setLeaderboardData(response.data.leaderboard || []);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.response?.data?.message || 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [activeTab, timeFrame]);

  // Loading state
  if (loading) {
    return (
      <AuthenticatedLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Loading leaderboard...</p>
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
            <h2 className="text-2xl font-bold text-white mb-2">Failed to Load Leaderboard</h2>
            <p className="text-red-200 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }

  const getRankColor = (rank) => {
    if (rank === 1) return 'from-yellow-400 to-orange-500';
    if (rank === 2) return 'from-gray-300 to-gray-400';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-blue-500 to-purple-600';
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="text-yellow-300" size={24} />;
    if (rank === 2) return <Medal className="text-gray-300" size={22} />;
    if (rank === 3) return <Medal className="text-orange-400" size={20} />;
    return <span className="text-white font-bold text-lg">{rank}</span>;
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Leaderboard 🏆
            </h1>
            <p className="text-blue-200 dark:text-blue-300 text-lg">
              Compete with others and climb to the top
            </p>
          </motion.div>

          {/* Tab Navigation & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/20 mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('global')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    activeTab === 'global'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Trophy size={18} />
                  Global
                </button>
                <button
                  onClick={() => setActiveTab('technical')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    activeTab === 'technical'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Target size={18} />
                  Technical
                </button>
                <button
                  onClick={() => setActiveTab('behavioral')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    activeTab === 'behavioral'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Users size={18} />
                  Behavioral
                </button>
              </div>

              {/* Time Frame */}
              <div className="flex gap-2">
                {['week', 'month', 'all'].map((frame) => (
                  <button
                    key={frame}
                    onClick={() => setTimeFrame(frame)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      timeFrame === frame
                        ? 'bg-white/20 text-white'
                        : 'text-blue-200 hover:bg-white/10'
                    }`}
                  >
                    {frame === 'week' ? 'This Week' : frame === 'month' ? 'This Month' : 'All Time'}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Your Rank Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-6 border-2 border-blue-400/50 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-bold text-white">{currentUser.name}</h3>
                    {currentUser.badges && currentUser.badges.length > 0 && (
                      <div className="flex gap-1">
                        {currentUser.badges.map((badge, i) => (
                          <span key={i} className="text-lg">{badge}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-blue-200 dark:text-blue-300">
                    <span className="flex items-center gap-1">
                      <Trophy size={14} />
                      Rank #{currentUser.rank}
                    </span>
                    <span>Score: {currentUser.score}%</span>
                    <span>{currentUser.interviews} interviews</span>
                    <span className="flex items-center gap-1">
                      <Flame size={14} className="text-orange-400" />
                      {currentUser.streak} day streak
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  {currentUser.change > 0 ? (
                    <div className="flex items-center gap-1 text-green-400">
                      <ChevronUp size={20} />
                      <span className="font-bold">+{currentUser.change}</span>
                    </div>
                  ) : currentUser.change < 0 ? (
                    <div className="flex items-center gap-1 text-red-400">
                      <ChevronDown size={20} />
                      <span className="font-bold">{currentUser.change}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </div>
                <p className="text-xs text-blue-200 dark:text-blue-300">vs last {timeFrame}</p>
              </div>
            </div>
          </motion.div>

          {/* Leaderboard List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Star className="text-yellow-400" />
                Top Performers
              </h2>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {getLeaderboardData().map((user, index) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    className={`p-4 border-b border-white/10 transition-all ${
                      user.rank <= 3 ? 'bg-white/5' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Rank */}
                        <div className={`w-12 h-12 bg-gradient-to-br ${getRankColor(user.rank)} rounded-xl flex items-center justify-center shadow-lg`}>
                          {getRankIcon(user.rank)}
                        </div>

                        {/* Avatar */}
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                          {user.avatar}
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-bold">{user.name}</h3>
                            {user.badges && user.badges.length > 0 && (
                              <div className="flex gap-1">
                                {user.badges.map((badge, i) => (
                                  <span key={i}>{badge}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-blue-200 dark:text-blue-300">
                            <span>{user.interviews} interviews</span>
                            <span className="flex items-center gap-1">
                              <Flame size={12} className="text-orange-400" />
                              {user.streak} streak
                            </span>
                          </div>
                        </div>

                        {/* Score */}
                        <div className="text-right mr-8">
                          <div className="text-3xl font-bold text-white">{user.score}%</div>
                          <div className="text-xs text-blue-200 dark:text-blue-300">avg score</div>
                        </div>

                        {/* Change */}
                        <div className="w-16 text-right">
                          {user.change > 0 ? (
                            <div className="flex items-center justify-end gap-1 text-green-400">
                              <ChevronUp size={18} />
                              <span className="font-bold text-sm">{user.change}</span>
                            </div>
                          ) : user.change < 0 ? (
                            <div className="flex items-center justify-end gap-1 text-red-400">
                              <ChevronDown size={18} />
                              <span className="font-bold text-sm">{Math.abs(user.change)}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Climb the Rankings! 🚀
                </h3>
                <p className="text-blue-200 dark:text-blue-300">
                  Complete more interviews and improve your scores to reach the top
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/analytics')}
                  icon={TrendingUp}
                >
                  View Analytics
                </Button>
                <Button
                  size="lg"
                  onClick={() => navigate('/setup')}
                  icon={Zap}
                >
                  Start Practice
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
    </AuthenticatedLayout>
  );
};

export default LeaderboardPage;
