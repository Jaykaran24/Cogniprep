import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBubble from '../components/ChatBubble';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import { Send, Mic, StopCircle, Clock, Video, VideoOff, Camera, AlertTriangle, Eye, Volume2, VolumeX } from 'lucide-react';

/**
 * Premium Interview Page with AI Voice and Facial Analysis
 */
const InterviewPage = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const behaviorCheckInterval = useRef(null);
  
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      message: 'Hello! I\'m your AI Interviewer. I\'ll be asking you some questions today. Take your time to answer, and remember - there are no wrong answers, just learning opportunities. Are you ready to begin?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAIVoiceEnabled, setIsAIVoiceEnabled] = useState(true);
  const [behaviorWarnings, setBehaviorWarnings] = useState([]);
  const [permissionError, setPermissionError] = useState('');

  const sampleQuestions = [
    "Great! Let's start with an introduction. Tell me about yourself and your background.",
    "What interests you most about this role?",
    "Can you describe a challenging project you've worked on?",
    "How do you handle tight deadlines and pressure?",
    "Where do you see yourself in the next 3 years?",
  ];

  /**
   * Text-to-Speech for AI responses
   */
  const speakMessage = (text) => {
    if (!isAIVoiceEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.lang.startsWith('en')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  /**
   * Start camera for facial analysis
   */
  const startCamera = async () => {
    try {
      // First, make sure any existing stream is stopped
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      // Wait a moment for camera to be released
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false 
      });
      
      console.log('Camera stream obtained:', stream);
      console.log('Video tracks:', stream.getVideoTracks());
      
      streamRef.current = stream;
      setIsVideoOn(true);
      setPermissionError('');
      
      // Small delay to ensure state updates and DOM is ready
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          console.log('Video srcObject set');
          
          videoRef.current.play()
            .then(() => {
              console.log('Video playing successfully');
              startBehaviorMonitoring();
            })
            .catch(err => {
              console.error('Video play error:', err);
            });
        } else {
          console.error('videoRef.current is null');
        }
      }, 100);
    } catch (err) {
      console.error('Error accessing camera:', err);
      
      let errorMessage = 'Camera access failed. ';
      if (err.name === 'NotReadableError') {
        errorMessage += 'Camera is being used by another application. Please close other apps using the camera and try again.';
      } else if (err.name === 'NotAllowedError') {
        errorMessage += 'Camera permission denied. Please allow camera access in your browser settings.';
      } else if (err.name === 'NotFoundError') {
        errorMessage += 'No camera detected. Please connect a camera and try again.';
      } else {
        errorMessage += err.message;
      }
      
      setPermissionError(errorMessage);
      setIsVideoOn(false);
    }
  };

  /**
   * Stop camera
   */
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsVideoOn(false);
    stopBehaviorMonitoring();
  };

  /**
   * Capture frame from video and send to AI for analysis
   */
  const captureAndAnalyzeFrame = async () => {
    if (!videoRef.current || !streamRef.current) return;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);
      
      const imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.8));
      
      const formData = new FormData();
      formData.append('frame', imageBlob, 'frame.jpg');
      
      const response = await fetch('http://localhost:8000/analyze-facial-expression', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const analysis = await response.json();
        console.log('AI Analysis:', analysis);
        
        // Process analysis results
        if (analysis.warnings && analysis.warnings.length > 0) {
          analysis.warnings.forEach(warning => {
            setBehaviorWarnings(prev => [{
              id: warning.type,
              message: warning.message,
              severity: warning.severity || 'info',
              timestamp: Date.now()
            }, ...prev].slice(0, 5));
          });
        }
      }
    } catch (err) {
      console.error('Error analyzing frame:', err);
    }
  };

  /**
   * Start behavior analysis monitoring
   */
  const startBehaviorMonitoring = () => {
    // Analyze frame every 3 seconds
    behaviorCheckInterval.current = setInterval(() => {
      captureAndAnalyzeFrame();
    }, 3000);
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
   * Initialize Speech Synthesis
   */
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };

      setTimeout(() => {
        speakMessage(messages[0].message);
      }, 500);
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => {
      stopCamera();
      stopBehaviorMonitoring();
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = {
        type: 'user',
        message: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');

      setTimeout(() => {
        if (questionCount < sampleQuestions.length - 1) {
          const aiMessage = {
            type: 'ai',
            message: sampleQuestions[questionCount + 1],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, aiMessage]);
          setQuestionCount(prev => prev + 1);
          
          speakMessage(sampleQuestions[questionCount + 1]);
        } else {
          const aiMessage = {
            type: 'ai',
            message: 'Thank you for completing the interview! Let me analyze your responses and prepare your feedback.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, aiMessage]);
          speakMessage(aiMessage.message);
          
          setTimeout(() => {
            navigate('/feedback');
          }, 3000);
        }
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const toggleVideo = () => {
    if (isVideoOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const toggleAIVoice = () => {
    if (isAIVoiceEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setIsAIVoiceEnabled(!isAIVoiceEnabled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black flex flex-col">
      <Navbar />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border-b border-white/20 dark:border-white/10 mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-xl font-bold text-white">AI Interview in Progress</h1>
              <p className="text-sm text-purple-200 dark:text-purple-300">
                Question {questionCount + 1} of {sampleQuestions.length}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleAIVoice}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 backdrop-blur-xl border transition-all ${
                  isAIVoiceEnabled
                    ? 'bg-green-500/20 border-green-400/50 text-green-300'
                    : 'bg-white/10 border-white/20 text-white'
                }`}
              >
                {isAIVoiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                <span className="text-sm font-medium">AI Voice</span>
              </motion.button>

              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/20"
              >
                <Clock className="text-purple-300" size={20} />
                <span className="text-white font-mono font-bold">{formatTime(timer)}</span>
              </motion.div>
            </div>
          </div>

          <div className="mt-3 h-2 bg-white/10 dark:bg-black/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((questionCount + 1) / sampleQuestions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </div>
      </motion.div>

      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        <AnimatePresence>
          {isVideoOn && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-80 flex-shrink-0"
            >
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/20 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="text-green-400" size={20} />
                  <h3 className="text-white font-semibold">Facial Analysis</h3>
                </div>
                
                <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-3" style={{ height: '240px', width: '100%' }}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transform: 'scaleX(-1)',
                      display: 'block',
                      backgroundColor: '#000'
                    }}
                  />
                  {isSpeaking && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute top-3 right-3 bg-purple-500/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      <Volume2 size={14} className="text-white" />
                      <span className="text-white text-xs font-semibold">AI Speaking...</span>
                    </motion.div>
                  )}
                </div>

                <div className="text-xs text-green-300 flex items-center gap-1 mb-3">
                  <Eye size={14} />
                  <span>Analyzing body language and expressions</span>
                </div>

                <AnimatePresence>
                  {behaviorWarnings.map((warning, index) => (
                    <motion.div
                      key={`${warning.id}-${warning.timestamp}-${index}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`mb-2 p-2 rounded-lg backdrop-blur-xl text-xs ${
                        warning.severity === 'warning'
                          ? 'bg-orange-500/20 border border-orange-400/50 text-orange-300'
                          : 'bg-blue-500/20 border border-blue-400/50 text-blue-300'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {warning.severity === 'warning' ? (
                          <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                        ) : (
                          <Eye size={14} className="flex-shrink-0 mt-0.5" />
                        )}
                        <span>{warning.message}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {permissionError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-500/20 border border-red-400/50 text-red-300 p-2 rounded-lg text-xs"
                  >
                    {permissionError}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <div className="max-w-4xl mx-auto">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <ChatBubble
                    key={index}
                    type={msg.type}
                    message={msg.message}
                    timestamp={msg.timestamp}
                  />
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl border-t border-white/20 dark:border-white/10 shadow-2xl"
          >
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your answer here..."
                    rows="2"
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl border-2 border-white/20 dark:border-white/10 rounded-2xl focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 resize-none transition-all duration-200 text-white placeholder-purple-200 dark:placeholder-purple-300"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleVideo}
                  className={`
                    flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-xl border-2
                    ${isVideoOn 
                      ? 'bg-green-500 border-green-400' 
                      : 'bg-white/10 dark:bg-white/5 border-white/20 hover:bg-white/20'
                    }
                  `}
                >
                  {isVideoOn ? <Video size={24} className="text-white" /> : <VideoOff size={24} className="text-white" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleRecording}
                  className={`
                    flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-xl border-2
                    ${isRecording 
                      ? 'bg-red-500 border-red-400 animate-pulse' 
                      : 'bg-white/10 dark:bg-white/5 border-white/20 hover:bg-white/20'
                    }
                  `}
                >
                  {isRecording ? <StopCircle size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
                </motion.button>

                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  icon={Send}
                  className="flex-shrink-0 h-12"
                >
                  Send
                </Button>
              </div>

              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-purple-200 dark:text-purple-300">
                  Press Enter to send • Shift + Enter for new line
                </p>
                <div className="flex items-center gap-4">
                  {isVideoOn && (
                    <motion.p
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xs text-green-300 font-semibold"
                    >
                      🎥 Camera On
                    </motion.p>
                  )}
                  {isRecording && (
                    <motion.p
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xs text-red-300 font-semibold"
                    >
                      🔴 Recording...
                    </motion.p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
