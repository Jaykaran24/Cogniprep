import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video,
  VideoOff,
  Mic,
  MicOff,
  PlayCircle,
  StopCircle,
  Camera,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Eye,
  Lightbulb
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

/**
 * LiveInterviewPage Component
 * Real-time interview with camera preview and speech-to-text transcription
 */
const LiveInterviewPage = () => {
  // State management
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [permissionError, setPermissionError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [behaviorWarnings, setBehaviorWarnings] = useState([]);
  const [showRoleSelection, setShowRoleSelection] = useState(true);

  // Refs
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);
  const transcriptEndRef = useRef(null);
  const behaviorCheckInterval = useRef(null);
  const questionTimerRef = useRef(null);

  // Role-specific question banks
  const questionBanks = {
    frontend: [
      'Tell me about your experience with React and modern frontend frameworks.',
      'How do you approach responsive design and cross-browser compatibility?',
      'Explain the difference between controlled and uncontrolled components in React.',
      'What are your strategies for optimizing web application performance?',
      'How do you manage state in large-scale React applications?',
      'Describe your experience with CSS preprocessors and modern CSS techniques.',
      'How do you ensure accessibility in your web applications?',
      'What testing frameworks have you used for frontend development?',
      'Explain how you would implement lazy loading in a React application.',
      'How do you handle API integration and error handling in frontend apps?'
    ],
    backend: [
      'Tell me about your experience with server-side technologies and frameworks.',
      'How do you design and implement RESTful APIs?',
      'Explain your approach to database schema design and optimization.',
      'What strategies do you use for handling authentication and authorization?',
      'How do you ensure API security and prevent common vulnerabilities?',
      'Describe your experience with microservices architecture.',
      'How do you handle error logging and monitoring in production?',
      'What caching strategies have you implemented in your projects?',
      'Explain how you would optimize database queries for better performance.',
      'How do you approach API versioning and backward compatibility?'
    ],
    fullstack: [
      'Tell me about your experience working across the full technology stack.',
      'How do you decide between client-side and server-side rendering?',
      'Describe your approach to building scalable web applications.',
      'How do you ensure seamless communication between frontend and backend?',
      'What deployment strategies and CI/CD pipelines have you worked with?',
      'How do you balance frontend performance with backend efficiency?',
      'Describe your experience with real-time features like WebSockets.',
      'How do you approach testing across the full stack?',
      'What cloud services and infrastructure have you worked with?',
      'How do you handle state synchronization between client and server?'
    ],
    'data-science': [
      'Tell me about your experience with machine learning algorithms.',
      'How do you approach data preprocessing and feature engineering?',
      'Explain your process for model selection and evaluation.',
      'What Python libraries do you use most frequently for data analysis?',
      'How do you handle imbalanced datasets in classification problems?',
      'Describe your experience with deep learning frameworks.',
      'How do you ensure model interpretability and explainability?',
      'What strategies do you use for hyperparameter tuning?',
      'How do you approach big data processing and distributed computing?',
      'Describe your experience deploying ML models to production.'
    ],
    devops: [
      'Tell me about your experience with containerization and orchestration.',
      'How do you design and implement CI/CD pipelines?',
      'Explain your approach to infrastructure as code.',
      'What monitoring and alerting strategies do you implement?',
      'How do you ensure high availability and disaster recovery?',
      'Describe your experience with cloud platforms like AWS, Azure, or GCP.',
      'How do you approach security in DevOps practices?',
      'What strategies do you use for managing secrets and credentials?',
      'How do you optimize infrastructure costs while maintaining performance?',
      'Explain your experience with automated testing and deployment.'
    ]
  };

  // Get current questions based on selected role
  const getCurrentQuestions = () => {
    return selectedRole ? questionBanks[selectedRole] : [];
  };

  // Behavior analysis warnings (simulated)
  const behaviorChecks = [
    { id: 'posture', message: 'Please sit up straight and maintain good posture', severity: 'warning' },
    { id: 'eye-contact', message: 'Try to look at the camera more frequently', severity: 'info' },
    { id: 'lighting', message: 'Your lighting could be better. Consider facing a light source', severity: 'info' },
    { id: 'background', message: 'Ensure your background is professional and distraction-free', severity: 'warning' },
    { id: 'fidgeting', message: 'Try to minimize hand movements and stay calm', severity: 'info' },
    { id: 'speaking', message: 'Speak clearly and at a moderate pace', severity: 'info' },
    { id: 'confidence', message: 'Maintain confident body language - shoulders back, chin up', severity: 'info' },
    { id: 'professionalism', message: 'Remember to use professional language throughout the interview', severity: 'warning' }
  ];

  /**
   * Initialize Speech Recognition
   */
  useEffect(() => {
    // Check browser compatibility
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setPermissionError('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    // Create recognition instance
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    // Handle recognition results
    recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          final += transcript + ' ';
        } else {
          interim += transcript;
        }
      }

      if (final) {
        setTranscripts(prev => [...prev, {
          id: Date.now(),
          text: final.trim(),
          timestamp: new Date().toLocaleTimeString(),
          type: 'user'
        }]);
        setInterimTranscript('');
      } else {
        setInterimTranscript(interim);
      }
    };

    // Handle errors
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setPermissionError('Microphone access denied. Please allow microphone access and try again.');
        setIsMicOn(false);
        setIsListening(false);
      } else if (event.error === 'no-speech') {
        // No speech detected - this is normal, just continue
        console.log('No speech detected');
      }
    };

    // Handle end of recognition
    recognition.onend = () => {
      if (isInterviewActive && isMicOn) {
        // Restart recognition if interview is still active
        try {
          recognition.start();
        } catch (error) {
          console.log('Recognition restart prevented:', error);
        }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isInterviewActive, isMicOn]);

  /**
   * Auto-scroll to latest transcript
   */
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcripts, interimTranscript]);

  /**
   * Cleanup on component unmount
   */
  useEffect(() => {
    return () => {
      // Stop all media streams on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      // Stop speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  /**
   * Handle video stream when camera turns on
   */
  useEffect(() => {
    if (videoRef.current && streamRef.current && isCameraOn) {
      videoRef.current.srcObject = streamRef.current;
      // Ensure video plays
      videoRef.current.play().catch(err => {
        console.error('Error playing video:', err);
      });
    }
  }, [isCameraOn]);

  /**
   * Start camera and microphone
   */
  const startMediaDevices = async () => {
    try {
      // Stop any existing streams first
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      // Request camera and microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      streamRef.current = stream;

      // Set video stream and play
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch (playError) {
          console.error('Error playing video:', playError);
        }
      }

      setIsCameraOn(true);
      setIsMicOn(true);
      setPermissionError('');

      return true;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setPermissionError('Camera/Microphone access denied. Please allow access in your browser settings and refresh the page.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setPermissionError('No camera or microphone found. Please connect a device and try again.');
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        setPermissionError('Camera/Microphone is already in use by another application. Please close other apps and try again.');
      } else {
        setPermissionError(`Unable to access camera/microphone: ${error.message}. Please check your device settings.`);
      }
      
      return false;
    }
  };

  /**
   * Stop camera and microphone
   */
  const stopMediaDevices = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraOn(false);
    setIsMicOn(false);
  };

  /**
   * Start speech recognition
   */
  const startSpeechRecognition = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  /**
   * Stop speech recognition
   */
  const stopSpeechRecognition = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  /**
   * Start behavior analysis monitoring
   */
  const startBehaviorMonitoring = () => {
    // Simulate behavior analysis every 15-30 seconds
    behaviorCheckInterval.current = setInterval(() => {
      // Randomly select 1-2 warnings to simulate AI analysis
      const randomWarnings = [];
      const numWarnings = Math.random() > 0.7 ? 2 : 1;
      
      for (let i = 0; i < numWarnings; i++) {
        const randomCheck = behaviorChecks[Math.floor(Math.random() * behaviorChecks.length)];
        if (!randomWarnings.find(w => w.id === randomCheck.id)) {
          randomWarnings.push({
            ...randomCheck,
            timestamp: Date.now()
          });
        }
      }
      
      if (randomWarnings.length > 0) {
        setBehaviorWarnings(prev => [...randomWarnings, ...prev].slice(0, 5));
      }
    }, Math.random() * 15000 + 15000); // Random interval between 15-30 seconds
  };

  /**
   * Stop behavior monitoring
   */
  const stopBehaviorMonitoring = () => {
    if (behaviorCheckInterval.current) {
      clearInterval(behaviorCheckInterval.current);
      behaviorCheckInterval.current = null;
    }
  };

  /**
   * Ask next question
   */
  const askNextQuestion = () => {
    const questions = getCurrentQuestions();
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      setTranscripts(prev => [...prev, {
        id: Date.now(),
        text: questions[nextIndex],
        timestamp: new Date().toLocaleTimeString(),
        type: 'interviewer'
      }]);
    } else {
      // Interview complete
      setTranscripts(prev => [...prev, {
        id: Date.now(),
        text: 'That was the final question. Great job! You can end the interview now.',
        timestamp: new Date().toLocaleTimeString(),
        type: 'system'
      }]);
    }
  };

  /**
   * Start automatic question progression (every 2 minutes)
   */
  const startQuestionTimer = () => {
    questionTimerRef.current = setInterval(() => {
      askNextQuestion();
    }, 120000); // 2 minutes per question
  };

  /**
   * Stop question timer
   */
  const stopQuestionTimer = () => {
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }
  };

  /**
   * Handle Start Interview
   */
  const handleStartInterview = async () => {
    if (!selectedRole) {
      setPermissionError('Please select a role before starting the interview.');
      return;
    }

    const mediaStarted = await startMediaDevices();
    
    if (mediaStarted) {
      setIsInterviewActive(true);
      setShowRoleSelection(false);
      startSpeechRecognition();
      startBehaviorMonitoring();
      startQuestionTimer();
      
      const questions = getCurrentQuestions();
      // Add welcome message with first question
      setTranscripts([
        {
          id: Date.now(),
          text: `Welcome to your ${selectedRole.replace('-', ' ')} interview! Let's begin.`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'system'
        },
        {
          id: Date.now() + 1,
          text: questions[0],
          timestamp: new Date().toLocaleTimeString(),
          type: 'interviewer'
        }
      ]);
      setCurrentQuestionIndex(0);
    }
  };

  /**
   * Handle Stop Interview
   */
  const handleStopInterview = () => {
    stopSpeechRecognition();
    stopMediaDevices();
    stopBehaviorMonitoring();
    stopQuestionTimer();
    setIsInterviewActive(false);
    setInterimTranscript('');
    
    // Add closing message
    setTranscripts(prev => [...prev, {
      id: Date.now() + 1,
      text: 'Interview ended. Thank you for your time! Your performance has been recorded.',
      timestamp: new Date().toLocaleTimeString(),
      type: 'system'
    }]);
  };

  /**
   * Toggle Microphone
   */
  const toggleMicrophone = () => {
    if (isMicOn) {
      stopSpeechRecognition();
      setIsMicOn(false);
    } else {
      startSpeechRecognition();
      setIsMicOn(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-blue-950 dark:to-black">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <Sparkles className="text-yellow-400" />
              Live AI Interview
              <Video className="text-blue-400" />
            </h1>
            <p className="text-blue-200 dark:text-blue-300 text-lg">
              Real-time interview with AI-powered behavior analysis and role-specific questions
            </p>
          </motion.div>

          {/* Role Selection */}
          <AnimatePresence>
            {showRoleSelection && !isInterviewActive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto mb-6 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
              >
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="text-yellow-400" />
                  Select Your Interview Role
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.keys(questionBanks).map((role) => (
                    <motion.button
                      key={role}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedRole(role);
                        setPermissionError('');
                      }}
                      className={`p-4 rounded-xl font-semibold transition-all ${
                        selectedRole === role
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      {role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </motion.button>
                  ))}
                </div>
                {selectedRole && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-blue-200 text-sm"
                  >
                    ✓ Selected: <span className="font-semibold text-white">
                      {selectedRole.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span> - {getCurrentQuestions().length} questions prepared
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Permission Error Alert */}
          <AnimatePresence>
            {permissionError && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto mb-6 bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-start gap-3"
              >
                <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="text-red-300 font-semibold mb-1">Error</h3>
                  <p className="text-red-200 text-sm">{permissionError}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Behavior Warnings */}
          <AnimatePresence>
            {behaviorWarnings.length > 0 && isInterviewActive && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto mb-6"
              >
                <div className="space-y-2">
                  {behaviorWarnings.slice(0, 3).map((warning, index) => (
                    <motion.div
                      key={warning.timestamp}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-start gap-3 p-4 rounded-xl backdrop-blur-xl border ${
                        warning.severity === 'warning'
                          ? 'bg-orange-500/20 border-orange-500/50'
                          : 'bg-blue-500/20 border-blue-500/50'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {warning.severity === 'warning' ? (
                          <AlertTriangle className="text-orange-400" size={20} />
                        ) : (
                          <Eye className="text-blue-400" size={20} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-1 text-sm ${
                          warning.severity === 'warning' ? 'text-orange-300' : 'text-blue-300'
                        }`}>
                          {warning.severity === 'warning' ? 'Behavior Tip' : 'AI Suggestion'}
                        </h3>
                        <p className={`text-sm ${
                          warning.severity === 'warning' ? 'text-orange-200' : 'text-blue-200'
                        }`}>
                          {warning.message}
                        </p>
                      </div>
                      <button
                        onClick={() => setBehaviorWarnings(prev => prev.filter(w => w.timestamp !== warning.timestamp))}
                        className="flex-shrink-0 text-white/50 hover:text-white transition-colors"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Interview Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Camera & Controls */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Camera Preview */}
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Camera size={24} />
                  Camera Preview
                </h2>
                
                <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                  {isCameraOn ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                        onLoadedMetadata={(e) => {
                          // Ensure video plays when metadata is loaded
                          e.target.play().catch(err => console.error('Play error:', err));
                        }}
                      />
                      
                      {/* Microphone Indicator */}
                      <AnimatePresence>
                        {isListening && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute top-4 right-4 bg-red-500 rounded-full p-3 shadow-lg"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Mic className="text-white" size={20} />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Recording Status */}
                      {isInterviewActive && (
                        <div className="absolute bottom-4 left-4 bg-red-500 px-3 py-1 rounded-full flex items-center gap-2">
                          <motion.div
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                          <span className="text-white text-sm font-semibold">REC</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                      <VideoOff size={64} className="mb-4 opacity-50" />
                      <p className="text-lg">Camera Off</p>
                      <p className="text-sm">Click "Start Interview" to begin</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-bold text-white mb-4">Controls</h2>
                
                <div className="space-y-3">
                  {!isInterviewActive ? (
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      icon={PlayCircle}
                      onClick={handleStartInterview}
                    >
                      Start Interview
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="secondary"
                        size="lg"
                        fullWidth
                        icon={isMicOn ? Mic : MicOff}
                        onClick={toggleMicrophone}
                      >
                        {isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
                      </Button>

                      <Button
                        variant="secondary"
                        size="lg"
                        fullWidth
                        icon={MessageSquare}
                        onClick={askNextQuestion}
                        disabled={currentQuestionIndex >= getCurrentQuestions().length - 1}
                      >
                        Next Question
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="lg"
                        fullWidth
                        icon={StopCircle}
                        onClick={handleStopInterview}
                      >
                        Stop Interview
                      </Button>
                    </>
                  )}
                </div>

                {/* Interview Progress */}
                {isInterviewActive && (
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-semibold">Interview Progress</span>
                      <span className="text-blue-300 text-sm">
                        {currentQuestionIndex + 1} / {getCurrentQuestions().length}
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIndex + 1) / getCurrentQuestions().length) * 100}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                      />
                    </div>
                    <p className="text-xs text-blue-200 mt-2">
                      Role: {selectedRole.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </p>
                  </div>
                )}

                {/* Status Indicators */}
                <div className="mt-6 pt-6 border-t border-white/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Camera</span>
                    <div className="flex items-center gap-2">
                      {isCameraOn ? (
                        <>
                          <CheckCircle2 className="text-green-400" size={18} />
                          <span className="text-green-400 text-sm font-semibold">Active</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="text-gray-400" size={18} />
                          <span className="text-gray-400 text-sm font-semibold">Inactive</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Microphone</span>
                    <div className="flex items-center gap-2">
                      {isMicOn && isListening ? (
                        <>
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <Mic className="text-red-400" size={18} />
                          </motion.div>
                          <span className="text-red-400 text-sm font-semibold">Listening...</span>
                        </>
                      ) : (
                        <>
                          <MicOff className="text-gray-400" size={18} />
                          <span className="text-gray-400 text-sm font-semibold">Inactive</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Transcript Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare size={24} />
                Interview Transcript
              </h2>

              {/* Transcript Messages */}
              <div className="bg-black/20 rounded-xl p-4 h-[600px] overflow-y-auto space-y-4">
                {transcripts.length === 0 && !isInterviewActive && (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <MessageSquare size={48} className="mb-3 opacity-50" />
                    <p className="text-center">Start the interview to see the transcript</p>
                  </div>
                )}

                {transcripts.map((transcript) => (
                  <motion.div
                    key={transcript.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${transcript.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl px-4 py-3 ${
                        transcript.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : transcript.type === 'interviewer'
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-500 text-white'
                      }`}
                    >
                      <p className="text-sm mb-1">{transcript.text}</p>
                      <span className="text-xs opacity-70">{transcript.timestamp}</span>
                    </div>
                  </motion.div>
                ))}

                {/* Interim Transcript (real-time, not finalized) */}
                {interimTranscript && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[80%] rounded-xl px-4 py-3 bg-blue-400/50 text-white border-2 border-blue-400 border-dashed">
                      <p className="text-sm italic">{interimTranscript}</p>
                      <span className="text-xs opacity-70">Speaking...</span>
                    </div>
                  </motion.div>
                )}

                <div ref={transcriptEndRef} />
              </div>

              {/* Transcript Stats */}
              {isInterviewActive && (
                <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Total Messages</p>
                    <p className="text-white text-xl font-bold">{transcripts.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Your Responses</p>
                    <p className="text-white text-xl font-bold">
                      {transcripts.filter(t => t.type === 'user').length}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Browser Compatibility Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 text-center text-sm text-blue-300"
          >
            <p>
              💡 Best experience in Chrome, Edge, or Safari. Please allow camera and microphone permissions.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LiveInterviewPage;
