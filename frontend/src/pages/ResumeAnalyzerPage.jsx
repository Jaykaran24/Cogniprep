import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  Star,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Award,
  X,
  FileCheck,
  Target,
  Zap,
  ArrowLeft
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

/**
 * ResumeAnalyzerPage Component
 * Upload and analyze resume with AI-powered feedback
 */
const ResumeAnalyzerPage = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Mock analysis results
  const analysisResults = {
    overallScore: 78,
    sections: [
      { name: 'Contact Information', score: 95, status: 'excellent' },
      { name: 'Professional Summary', score: 85, status: 'good' },
      { name: 'Work Experience', score: 75, status: 'good' },
      { name: 'Skills', score: 70, status: 'average' },
      { name: 'Education', score: 90, status: 'excellent' },
      { name: 'Format & Layout', score: 65, status: 'needs-improvement' }
    ],
    strengths: [
      'Clear and professional contact information',
      'Strong educational background with relevant coursework',
      'Well-structured work experience with dates',
      'Quantifiable achievements in recent roles'
    ],
    improvements: [
      'Add more action verbs to describe responsibilities',
      'Include specific metrics and numbers in achievements',
      'Expand technical skills section with proficiency levels',
      'Consider adding a projects or certifications section',
      'Improve formatting consistency across sections'
    ],
    keywords: {
      found: ['JavaScript', 'React', 'Node.js', 'Team Leadership', 'Project Management'],
      missing: ['TypeScript', 'Cloud Services', 'CI/CD', 'Agile', 'REST APIs']
    },
    atsScore: 72,
    recommendations: [
      'Use standard section headings (e.g., "Work Experience" instead of "Career Journey")',
      'Avoid using tables or complex formatting that may not parse well',
      'Include keywords from job descriptions you\'re targeting',
      'Keep file format as .docx or .pdf for best compatibility'
    ]
  };

  const handleFileUpload = (file) => {
    if (file && (file.type === 'application/pdf' || 
        file.type === 'application/msword' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setUploadedFile(file);
      setAnalysisComplete(false);
    } else {
      alert('Please upload a PDF or Word document');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle2 className="text-green-400" size={20} />;
      case 'good':
        return <Star className="text-blue-400" size={20} />;
      case 'average':
        return <AlertCircle className="text-yellow-400" size={20} />;
      case 'needs-improvement':
        return <AlertTriangle className="text-red-400" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-blue-950 dark:to-black">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/prepare')}
              className="flex items-center gap-2 text-blue-300 hover:text-blue-200 mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Prepare
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <FileCheck className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Resume Analyzer 📄
                </h1>
                <p className="text-blue-200 dark:text-blue-300 text-lg mt-2">
                  Get AI-powered feedback to improve your resume and increase interview chances
                </p>
              </div>
            </div>
          </motion.div>

          {/* Upload Section */}
          {!analysisComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mb-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Upload size={24} />
                Upload Your Resume
              </h2>

              {!uploadedFile ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                    isDragging 
                      ? 'border-blue-400 bg-blue-500/10' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Upload className="text-white" size={40} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Drag & drop your resume here
                  </h3>
                  <p className="text-blue-200 dark:text-blue-300 mb-6">
                    or click to browse your files
                  </p>
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                    className="hidden"
                  />
                  <label htmlFor="resume-upload">
                    <Button
                      as="span"
                      variant="primary"
                      size="lg"
                      icon={Upload}
                    >
                      Choose File
                    </Button>
                  </label>
                  <p className="text-sm text-blue-300 dark:text-blue-400 mt-4">
                    Supported formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* File Preview */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <FileText className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{uploadedFile.name}</h3>
                          <p className="text-sm text-blue-300">
                            {(uploadedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setUploadedFile(null);
                          setAnalysisComplete(false);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <X className="text-white" size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Analyze Button */}
                  {!isAnalyzing ? (
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      icon={Zap}
                      onClick={handleAnalyze}
                    >
                      Analyze Resume
                    </Button>
                  ) : (
                    <div className="text-center py-8">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <p className="text-white font-semibold text-lg">Analyzing your resume...</p>
                      <p className="text-blue-300 text-sm mt-2">This may take a few moments</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Analysis Results */}
          <AnimatePresence>
            {analysisComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Overall Score */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="12"
                            fill="none"
                          />
                          <motion.circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="url(#gradient)"
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "0 352" }}
                            animate={{ strokeDasharray: `${(analysisResults.overallScore / 100) * 352} 352` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#8B5CF6" />
                              <stop offset="100%" stopColor="#EC4899" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-4xl font-bold ${getScoreColor(analysisResults.overallScore)}`}>
                            {analysisResults.overallScore}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Overall Score</h2>
                        <p className="text-blue-200 dark:text-blue-300">
                          Your resume is {analysisResults.overallScore >= 80 ? 'excellent' : 
                            analysisResults.overallScore >= 60 ? 'good' : 'needs improvement'}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <Award className="text-yellow-400" size={20} />
                          <span className="text-sm text-blue-200">ATS Compatibility: {analysisResults.atsScore}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="secondary"
                        size="lg"
                        icon={Download}
                      >
                        Download Report
                      </Button>
                      <Button
                        variant="primary"
                        size="lg"
                        icon={Upload}
                        onClick={() => {
                          setUploadedFile(null);
                          setAnalysisComplete(false);
                        }}
                      >
                        Analyze Another
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Section Scores */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Target size={24} />
                    Section Analysis
                  </h2>
                  <div className="space-y-4">
                    {analysisResults.sections.map((section, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        className="bg-white/5 rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(section.status)}
                            <span className="text-white font-medium">{section.name}</span>
                          </div>
                          <span className={`text-lg font-bold ${getScoreColor(section.score)}`}>
                            {section.score}%
                          </span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${section.score}%` }}
                            transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                            className={`h-full ${
                              section.score >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                              section.score >= 60 ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                              'bg-gradient-to-r from-orange-500 to-red-600'
                            }`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Strengths & Improvements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <CheckCircle2 className="text-green-400" size={24} />
                      Strengths
                    </h2>
                    <ul className="space-y-3">
                      {analysisResults.strengths.map((strength, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                          className="flex items-start gap-3 text-blue-200"
                        >
                          <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                          <span>{strength}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Areas for Improvement */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <Lightbulb className="text-yellow-400" size={24} />
                      Areas for Improvement
                    </h2>
                    <ul className="space-y-3">
                      {analysisResults.improvements.map((improvement, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                          className="flex items-start gap-3 text-blue-200"
                        >
                          <Lightbulb className="text-yellow-400 flex-shrink-0 mt-0.5" size={18} />
                          <span>{improvement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Keywords Analysis */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <TrendingUp size={24} />
                    Keywords Analysis
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle2 size={18} />
                        Found Keywords
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysisResults?.keywords?.found && analysisResults.keywords.found.length > 0 ? (
                          analysisResults.keywords.found.map((keyword, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-sm"
                            >
                              {keyword}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-400">No keywords found</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-orange-400 font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle size={18} />
                        Missing Keywords
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysisResults?.keywords?.missing && analysisResults.keywords.missing.length > 0 ? (
                          analysisResults.keywords.missing.map((keyword, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-lg text-sm"
                            >
                              {keyword}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-400">None</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ATS Recommendations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Star size={24} />
                    ATS Optimization Tips
                  </h2>
                  <ul className="space-y-3">
                    {analysisResults.recommendations.map((rec, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                        className="flex items-start gap-3 text-blue-200"
                      >
                        <Star className="text-blue-400 flex-shrink-0 mt-0.5" size={18} />
                        <span>{rec}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzerPage;
