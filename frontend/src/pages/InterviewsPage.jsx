import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Award, 
  Filter,
  Search,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Target,
  ChevronDown,
  Eye,
  Loader
} from 'lucide-react';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import Button from '../components/Button';
import { interviewAPI } from '../services/api';

/**
 * Interviews Page Component
 * Shows complete interview history with filtering and search
 */
const InterviewsPage = () => {
  const navigate = useNavigate();
  
  // State management
  const [allInterviews, setAllInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch interviews
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await interviewAPI.getAll({
          sort: sortBy === 'recent' ? '-createdAt' : 
                sortBy === 'oldest' ? 'createdAt' : 
                sortBy === 'highest' ? '-overallScore' : 'overallScore'
        });
        
        setAllInterviews(response.data.interviews || []);
      } catch (err) {
        console.error('Error fetching interviews:', err);
        setError(err.response?.data?.message || 'Failed to load interviews');
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [sortBy]);

  // Filter and sort logic
  const filteredInterviews = allInterviews
    .filter(interview => {
      const role = interview.config?.role || '';
      const type = interview.config?.type || '';
      const matchesSearch = role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || type.toLowerCase() === filterType.toLowerCase();
      return matchesSearch && matchesFilter;
    });

  const stats = {
    total: allInterviews.length,
    avgScore: allInterviews.length > 0 
      ? Math.round(allInterviews.reduce((sum, i) => sum + (i.overallScore || 0), 0) / allInterviews.length) 
      : 0,
    completed: allInterviews.filter(i => i.status === 'completed').length,
    topScore: allInterviews.length > 0 ? Math.max(...allInterviews.map(i => i.overallScore || 0)) : 0
  };

  // Loading state
  if (loading) {
    return (
      <AuthenticatedLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Loading interviews...</p>
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
            <h2 className="text-2xl font-bold text-white mb-2">Failed to Load Interviews</h2>
            <p className="text-red-200 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }

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
              Your Interviews 📊
            </h1>
            <p className="text-blue-200 dark:text-blue-300 text-lg">
              Track your progress and review past interviews
            </p>
          </motion.div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Interviews', value: stats.total, icon: Target, color: 'from-blue-500 to-cyan-500' },
              { label: 'Average Score', value: `${stats.avgScore}%`, icon: Award, color: 'from-purple-500 to-pink-500' },
              { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'from-green-500 to-emerald-500' },
              { label: 'Top Score', value: `${stats.topScore}%`, icon: TrendingUp, color: 'from-orange-500 to-red-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="text-white" size={16} />
                  </div>
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="text-sm text-blue-200 dark:text-blue-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by role or type..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all"
                >
                  <Filter size={20} />
                  <span>Filter: {filterType === 'all' ? 'All' : filterType}</span>
                  <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 right-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-xl border border-white/20 p-2 min-w-[150px] z-10"
                    >
                      {['all', 'technical', 'behavioral'].map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setFilterType(type);
                            setShowFilters(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            filterType === type
                              ? 'bg-blue-500 text-white'
                              : 'text-white hover:bg-white/10'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 cursor-pointer"
              >
                <option value="recent" className="bg-gray-800">Most Recent</option>
                <option value="oldest" className="bg-gray-800">Oldest First</option>
                <option value="highest" className="bg-gray-800">Highest Score</option>
                <option value="lowest" className="bg-gray-800">Lowest Score</option>
              </select>
            </div>
          </motion.div>

          {/* Interviews List */}
          <div className="space-y-4">
            {filteredInterviews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center"
              >
                <p className="text-white text-lg mb-2">No interviews found</p>
                <p className="text-blue-200 dark:text-blue-300 mb-4">Try adjusting your search or filters</p>
                <Button onClick={() => navigate('/setup-interview')}>
                  Start New Interview
                </Button>
              </motion.div>
            ) : (
              filteredInterviews.map((interview, index) => (
                <motion.div
                  key={interview._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all cursor-pointer"
                  onClick={() => navigate(`/feedback?id=${interview._id}`)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Interview Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        interview.overallScore >= 85 ? 'bg-green-500/20' : 
                        interview.overallScore >= 70 ? 'bg-orange-500/20' : 'bg-red-500/20'
                      }`}>
                        {interview.overallScore >= 85 ? (
                          <CheckCircle2 className="text-green-400" size={28} />
                        ) : (
                          <XCircle className="text-orange-400" size={28} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{interview.config?.role || 'Interview'}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-blue-200 dark:text-blue-300">
                          <span className="flex items-center gap-1">
                            <Target size={14} />
                            {interview.config?.type || 'Technical'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(interview.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {interview.config?.duration || 0} min
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Score and Action */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-4xl font-bold text-white mb-1">
                          {interview.overallScore || 0}%
                        </div>
                        <div className="text-sm text-blue-200 dark:text-blue-300">
                          Overall Score
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={Eye}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/feedback?id=${interview._id}`);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {interview.summary && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-sm text-blue-200 dark:text-blue-300">{interview.summary}</p>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
    </AuthenticatedLayout>
  );
};

export default InterviewsPage;
