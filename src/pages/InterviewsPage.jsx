import React, { useState } from 'react';
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
  Eye
} from 'lucide-react';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import Button from '../components/Button';

/**
 * Interviews Page Component
 * Shows complete interview history with filtering and search
 */
const InterviewsPage = () => {
  const navigate = useNavigate();
  
  // Mock interview data - in production, this would come from API
  const [allInterviews] = useState([
    {
      id: 1,
      role: 'Frontend Developer',
      type: 'Technical',
      date: '2026-01-10',
      score: 88,
      status: 'completed',
      duration: '25 min',
      strengths: ['React', 'CSS', 'Problem Solving'],
      improvements: ['Performance Optimization']
    },
    {
      id: 2,
      role: 'Full Stack Developer',
      type: 'Behavioral',
      date: '2026-01-08',
      score: 82,
      status: 'completed',
      duration: '30 min',
      strengths: ['Communication', 'Leadership'],
      improvements: ['Conflict Resolution']
    },
    {
      id: 3,
      role: 'Backend Engineer',
      type: 'Technical',
      date: '2026-01-05',
      score: 85,
      status: 'completed',
      duration: '28 min',
      strengths: ['System Design', 'Databases'],
      improvements: ['API Design']
    },
    {
      id: 4,
      role: 'Senior Frontend Developer',
      type: 'Technical',
      date: '2026-01-03',
      score: 79,
      status: 'completed',
      duration: '35 min',
      strengths: ['JavaScript', 'TypeScript'],
      improvements: ['Testing', 'Architecture']
    },
    {
      id: 5,
      role: 'Product Manager',
      type: 'Behavioral',
      date: '2025-12-28',
      score: 91,
      status: 'completed',
      duration: '32 min',
      strengths: ['Strategy', 'Communication', 'Leadership'],
      improvements: ['Technical Knowledge']
    },
    {
      id: 6,
      role: 'DevOps Engineer',
      type: 'Technical',
      date: '2025-12-25',
      score: 76,
      status: 'completed',
      duration: '40 min',
      strengths: ['Docker', 'CI/CD'],
      improvements: ['Kubernetes', 'Monitoring']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort logic
  const filteredInterviews = allInterviews
    .filter(interview => {
      const matchesSearch = interview.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           interview.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || interview.type.toLowerCase() === filterType.toLowerCase();
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'highest') return b.score - a.score;
      if (sortBy === 'lowest') return a.score - b.score;
      return 0;
    });

  const stats = {
    total: allInterviews.length,
    avgScore: Math.round(allInterviews.reduce((sum, i) => sum + i.score, 0) / allInterviews.length),
    completed: allInterviews.filter(i => i.status === 'completed').length,
    topScore: Math.max(...allInterviews.map(i => i.score))
  };

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
                <p className="text-blue-200 dark:text-blue-300">Try adjusting your search or filters</p>
              </motion.div>
            ) : (
              filteredInterviews.map((interview, index) => (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all cursor-pointer"
                  onClick={() => navigate(`/feedback?id=${interview.id}`)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Interview Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        interview.score >= 85 ? 'bg-green-500/20' : 
                        interview.score >= 70 ? 'bg-orange-500/20' : 'bg-red-500/20'
                      }`}>
                        {interview.score >= 85 ? (
                          <CheckCircle2 className="text-green-400" size={28} />
                        ) : (
                          <XCircle className="text-orange-400" size={28} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{interview.role}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-blue-200 dark:text-blue-300">
                          <span className="flex items-center gap-1">
                            <Target size={14} />
                            {interview.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(interview.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {interview.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Score and Action */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-4xl font-bold text-white mb-1">
                          {interview.score}%
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
                          navigate(`/feedback?id=${interview.id}`);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </div>

                  {/* Strengths & Improvements Preview */}
                  <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-green-400 mb-2">Strengths</h4>
                      <div className="flex flex-wrap gap-2">
                        {interview.strengths.map((strength, i) => (
                          <span key={i} className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-lg">
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-orange-400 mb-2">Focus Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {interview.improvements.map((improvement, i) => (
                          <span key={i} className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-lg">
                            {improvement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
    </AuthenticatedLayout>
  );
};

export default InterviewsPage;
