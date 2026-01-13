import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBubble from '../components/ChatBubble';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import { Send, Mic, StopCircle, Clock, Video, VideoOff } from 'lucide-react';

/**
 * Premium Interview Page with Timer
 */
const InterviewPage = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
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

  const sampleQuestions = [
    "Great! Let's start with an introduction. Tell me about yourself and your background.",
    "What interests you most about this role?",
    "Can you describe a challenging project you've worked on?",
    "How do you handle tight deadlines and pressure?",
    "Where do you see yourself in the next 3 years?",
  ];

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        } else {
          const aiMessage = {
            type: 'ai',
            message: 'Thank you for completing the interview! Let me analyze your responses and prepare your feedback.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, aiMessage]);
          
          setTimeout(() => {
            navigate('/feedback');
          }, 2000);
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
    setIsVideoOn(!isVideoOn);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black flex flex-col">
      <Navbar />

      {/* Interview Header with Timer */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border-b border-white/20 dark:border-white/10 mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Interview in Progress</h1>
              <p className="text-sm text-purple-200 dark:text-purple-300">
                Question {questionCount + 1} of {sampleQuestions.length}
              </p>
            </div>
            
            {/* Timer */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20"
            >
              <Clock className="text-purple-300" size={20} />
              <span className="text-white font-mono font-bold">{formatTime(timer)}</span>
            </motion.div>
          </div>

          {/* Progress bar */}
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

      {/* Chat Messages Area */}
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

      {/* Sticky Input Area with Glassmorphism */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky bottom-0 bg-white/10 dark:bg-white/5 backdrop-blur-2xl border-t border-white/20 dark:border-white/10 shadow-2xl"
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-end gap-3">
            {/* Text Input */}
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

            {/* Camera Button */}
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

            {/* Voice Button */}
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

            {/* Send Button */}
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              icon={Send}
              className="flex-shrink-0 h-12"
            >
              Send
            </Button>
          </div>

          {/* Hint Text */}
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
  );
};

export default InterviewPage;
