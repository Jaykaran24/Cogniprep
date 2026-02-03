import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, TrendingUp, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import SignupForm from '../components/SignupForm';

/**
 * SignupPage Component
 * Authentication page with glassmorphism design and floating background
 */
const SignupPage = () => {
  // Floating background icons
  const floatingIcons = [
    { Icon: Sparkles, delay: 0, duration: 20, x: '10%', y: '15%' },
    { Icon: Target, delay: 2, duration: 25, x: '80%', y: '20%' },
    { Icon: TrendingUp, delay: 4, duration: 22, x: '15%', y: '75%' },
    { Icon: Zap, delay: 6, duration: 18, x: '85%', y: '70%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-blue-950 dark:to-black overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Floating Background Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute text-white/10 dark:text-white/5 pointer-events-none"
          style={{ left: item.x, top: item.y }}
        >
          <item.Icon size={80} />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
            {/* Left Side - Marketing Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 max-w-lg text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Join{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Cogniprep AI
                  </span>
                </h1>
                <p className="text-xl text-blue-200 dark:text-blue-300 mb-8 leading-relaxed">
                  Master your interviews with AI-powered practice sessions, 
                  get instant feedback, and land your dream job.
                </p>
              </motion.div>

              {/* Feature List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-4"
              >
                {[
                  { icon: Sparkles, text: 'AI-Powered Interview Simulations' },
                  { icon: Target, text: 'Role-Specific Question Bank' },
                  { icon: TrendingUp, text: 'Track Your Progress Over Time' },
                  { icon: Zap, text: 'Instant Detailed Feedback' },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 text-left"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <feature.icon className="text-white" size={24} />
                    </div>
                    <p className="text-lg text-white font-medium">
                      {feature.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full max-w-md"
            >
              <SignupForm />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
