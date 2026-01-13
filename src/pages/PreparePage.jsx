import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench,
  BookOpen,
  Clock,
  FileText,
  Headphones,
  Video,
  Lightbulb,
  CheckSquare,
  Calendar,
  Target,
  Code,
  MessageSquare,
  TrendingUp,
  Zap,
  Play,
  Download,
  ExternalLink,
  ChevronRight,
  FileCheck
} from 'lucide-react';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import Button from '../components/Button';

/**
 * PreparePage Component
 * Comprehensive preparation resources and tools for interview success
 */
const PreparePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tools');

  // Tools data
  const tools = [
    {
      id: 1,
      icon: FileCheck,
      title: 'Resume Analyzer',
      description: 'Upload your resume and get AI-powered feedback to improve it for better interview chances',
      color: 'from-purple-500 to-pink-500',
      action: 'Analyze Resume',
      category: 'analysis',
      features: ['ATS compatibility check', 'Section-wise scoring', 'Keyword optimization'],
      route: '/resume-analyzer'
    },
    {
      id: 2,
      icon: Clock,
      title: 'Interview Timer',
      description: 'Practice with timed sessions to improve your pacing and time management skills',
      color: 'from-blue-500 to-cyan-500',
      action: 'Start Timer',
      category: 'practice',
      features: ['Customizable duration', 'Pause/Resume', 'Session history']
    },
    {
      id: 3,
      icon: FileText,
      title: 'Notes & Flashcards',
      description: 'Create and organize study notes, flashcards for quick revision before interviews',
      color: 'from-indigo-500 to-purple-500',
      action: 'Create Notes',
      category: 'study',
      features: ['Rich text editor', 'Tagging system', 'Quick search']
    },
    {
      id: 4,
      icon: Video,
      title: 'Mock Video Interview',
      description: 'Record yourself answering questions to review body language and presentation',
      color: 'from-green-500 to-emerald-500',
      action: 'Start Recording',
      category: 'practice',
      features: ['HD recording', 'Playback analysis', 'Save & review']
    },
    {
      id: 5,
      icon: Headphones,
      title: 'Voice Analyzer',
      description: 'Analyze your speech patterns, tone, and clarity to sound more confident',
      color: 'from-orange-500 to-red-500',
      action: 'Analyze Voice',
      category: 'analysis',
      features: ['Clarity score', 'Pace detection', 'Filler words counter']
    },
    {
      id: 6,
      icon: CheckSquare,
      title: 'Checklist Builder',
      description: 'Create personalized interview preparation checklists and track your progress',
      color: 'from-blue-500 to-indigo-500',
      action: 'Build Checklist',
      category: 'planning',
      features: ['Custom templates', 'Progress tracking', 'Reminders']
    },
    {
      id: 7,
      icon: Target,
      title: 'Goal Tracker',
      description: 'Set and monitor your interview preparation goals with detailed analytics',
      color: 'from-pink-500 to-rose-500',
      action: 'Set Goals',
      category: 'planning',
      features: ['SMART goals', 'Progress charts', 'Milestone tracking']
    }
  ];

  // Preparation resources data
  const prepareResources = [
    {
      id: 1,
      icon: Code,
      title: 'Technical Interview Guide',
      description: 'Comprehensive guide covering data structures, algorithms, system design, and coding best practices',
      color: 'from-blue-500 to-cyan-500',
      difficulty: 'Intermediate',
      duration: '45 min read',
      topics: ['DSA', 'System Design', 'Coding Patterns', 'Big O Notation'],
      action: 'Read Guide'
    },
    {
      id: 2,
      icon: MessageSquare,
      title: 'Behavioral Questions Bank',
      description: 'Collection of 100+ common behavioral questions with STAR method framework and sample answers',
      color: 'from-purple-500 to-pink-500',
      difficulty: 'Beginner',
      duration: '30 min read',
      topics: ['STAR Method', 'Leadership', 'Teamwork', 'Conflict Resolution'],
      action: 'View Questions'
    },
    {
      id: 3,
      icon: Lightbulb,
      title: 'Problem-Solving Strategies',
      description: 'Learn proven frameworks for breaking down complex problems during technical interviews',
      color: 'from-green-500 to-emerald-500',
      difficulty: 'Advanced',
      duration: '60 min read',
      topics: ['Problem Breakdown', 'Pattern Recognition', 'Edge Cases', 'Optimization'],
      action: 'Learn More'
    },
    {
      id: 4,
      icon: TrendingUp,
      title: 'Salary Negotiation Tips',
      description: 'Master the art of negotiating compensation packages with real-world examples and scripts',
      color: 'from-orange-500 to-red-500',
      difficulty: 'Intermediate',
      duration: '25 min read',
      topics: ['Market Research', 'Counter Offers', 'Benefits', 'Timing'],
      action: 'Read Tips'
    },
    {
      id: 5,
      icon: Calendar,
      title: '30-Day Prep Plan',
      description: 'Structured 30-day interview preparation roadmap with daily tasks and milestones',
      color: 'from-indigo-500 to-blue-500',
      difficulty: 'Beginner',
      duration: '15 min read',
      topics: ['Week 1-4 Plans', 'Daily Tasks', 'Resources', 'Mock Interviews'],
      action: 'Download Plan'
    },
    {
      id: 6,
      icon: Zap,
      title: 'Interview Day Checklist',
      description: 'Last-minute preparation guide covering what to do 24 hours before your interview',
      color: 'from-pink-500 to-rose-500',
      difficulty: 'Beginner',
      duration: '10 min read',
      topics: ['Final Review', 'Mental Prep', 'Logistics', 'Emergency Tips'],
      action: 'View Checklist'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-300';
      case 'Intermediate': return 'bg-orange-500/20 text-orange-300';
      case 'Advanced': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
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
              Preparation Hub 🎯
            </h1>
            <p className="text-blue-200 dark:text-blue-300 text-lg">
              Access powerful tools and resources to ace your interviews
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/20 mb-8 inline-flex gap-2"
          >
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'tools'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Wrench size={20} />
              Tools
            </button>
            <button
              onClick={() => setActiveTab('prepare')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'prepare'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <BookOpen size={20} />
              Prepare
            </button>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {activeTab === 'tools' ? (
              <motion.div
                key="tools"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Practice & Analysis Tools
                  </h2>
                  <p className="text-blue-200 dark:text-blue-300">
                    Enhance your preparation with these interactive tools
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all cursor-pointer group"
                      onClick={() => {
                        console.log(`Opening tool: ${tool.title}`);
                        // In production, navigate to tool or open modal
                      }}
                    >
                      {/* Icon */}
                      <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <tool.icon className="text-white" size={28} />
                      </div>

                      {/* Category Badge */}
                      <div className="mb-3">
                        <span className="text-xs font-semibold px-2 py-1 bg-white/10 rounded-lg text-blue-200 dark:text-blue-300">
                          {tool.category.toUpperCase()}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-blue-200 dark:text-blue-300 text-sm mb-4 leading-relaxed">
                        {tool.description}
                      </p>

                      {/* Features */}
                      <div className="mb-4 space-y-1">
                        {tool.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-blue-200 dark:text-blue-300">
                            <ChevronRight size={14} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => {
                          if (tool.route) {
                            navigate(tool.route);
                          } else {
                            console.log(`Opening tool: ${tool.title}`);
                          }
                        }}
                        className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl py-2.5 font-semibold flex items-center justify-center gap-2 transition-all border border-white/20"
                      >
                        <Play size={16} />
                        {tool.action}
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="prepare"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Study Resources & Guides
                  </h2>
                  <p className="text-blue-200 dark:text-blue-300">
                    Comprehensive materials to master every aspect of interviews
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {prepareResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all cursor-pointer group"
                      onClick={() => {
                        console.log(`Opening resource: ${resource.title}`);
                        // In production, navigate to resource or open content
                      }}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <resource.icon className="text-white" size={24} />
                        </div>

                        {/* Title & Meta */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                            {resource.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${getDifficultyColor(resource.difficulty)}`}>
                              {resource.difficulty}
                            </span>
                            <span className="text-xs text-blue-200 dark:text-blue-300 flex items-center gap-1">
                              <Clock size={12} />
                              {resource.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-blue-200 dark:text-blue-300 text-sm mb-4 leading-relaxed">
                        {resource.description}
                      </p>

                      {/* Topics */}
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-white mb-2">TOPICS COVERED:</h4>
                        <div className="flex flex-wrap gap-2">
                          {resource.topics.map((topic, i) => (
                            <span key={i} className="text-xs bg-white/10 text-blue-200 dark:text-blue-300 px-2 py-1 rounded-lg">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl py-2.5 font-semibold flex items-center justify-center gap-2 transition-all"
                        >
                          <ExternalLink size={16} />
                          {resource.action}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="w-12 h-10 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center justify-center transition-all border border-white/20"
                        >
                          <Download size={18} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Start CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Ready to Start Practicing?
                </h3>
                <p className="text-blue-200 dark:text-blue-300">
                  Put your preparation into action with our AI-powered interview simulator
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => navigate('/setup')}
                icon={Zap}
              >
                Start Interview Now
              </Button>
            </div>
          </motion.div>
        </div>
    </AuthenticatedLayout>
  );
};

export default PreparePage;
