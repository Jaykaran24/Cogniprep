import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import GlassCard from '../components/GlassCard';
import { Sparkles, Target, TrendingUp, Zap, Code, MessageSquare, Award, Clock, Settings, HelpCircle, ChevronDown, Instagram, Facebook } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

/**
 * Premium Landing Page with Glassmorphism
 */
const LandingPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Check auth state on mount
  React.useEffect(() => {
    const authState = localStorage.getItem('isAuthenticated') === 'true';
    setIsLoggedIn(authState);
  }, []);

  const handleStartInterview = () => {
    if (isLoggedIn) {
      navigate('/setup');
    } else {
      navigate('/signup');
    }
  };

  const features = [
    { 
      icon: Target, 
      title: 'Targeted Practice', 
      description: 'Get role-specific interview questions tailored to your career path. Whether you\'re a Frontend Developer, Backend Engineer, or Full Stack professional, our AI adapts questions to match your chosen role and experience level, ensuring relevant and challenging practice sessions.',
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      icon: Sparkles, 
      title: 'AI-Powered Feedback', 
      description: 'Leverage advanced artificial intelligence to analyze your responses across multiple dimensions. Our AI evaluates your communication skills, technical knowledge depth, problem-solving approach, and confidence level, providing comprehensive insights you can actually use.',
      color: 'from-purple-500 to-pink-500' 
    },
    { 
      icon: TrendingUp, 
      title: 'Track Your Progress', 
      description: 'Monitor your improvement over time with detailed performance metrics and score history. See how your communication, technical skills, and confidence evolve with each practice session. Identify patterns, track weak areas, and celebrate your growth journey.',
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      icon: Zap, 
      title: 'Instant Results', 
      description: 'No waiting required! Get immediate, actionable feedback right after completing your interview. Receive detailed scores, strengths analysis, improvement recommendations, and AI-generated insights within seconds, so you can iterate and improve quickly.',
      color: 'from-orange-500 to-red-500' 
    }
  ];

  const floatingIcons = [Code, MessageSquare, Award, Clock];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 dark:from-blue-900 dark:via-purple-900 dark:to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      {floatingIcons.map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute text-white/5 dark:text-white/10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{ 
            duration: 10 + i * 2, 
            repeat: Infinity,
            delay: i * 0.5 
          }}
          style={{
            top: `${20 + i * 20}%`,
            left: `${10 + i * 20}%`,
          }}
        >
          <Icon size={120} />
        </motion.div>
      ))}

      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Hero Glass Card */}
          <GlassCard className="max-w-5xl mx-auto backdrop-blur-2xl bg-white/10 dark:bg-white/5">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-flex items-center gap-2 bg-white/20 dark:bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/30 dark:border-white/20"
            >
              <Sparkles size={16} className="text-yellow-300" />
              <span className="text-white">Cogniprep AI - Powered by Advanced AI</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Practice Interviews with
              <motion.span
                className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                AI Intelligence
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-blue-100 dark:text-blue-200 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Get instant feedback, improve your skills, and ace your next interview with confidence
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                size="lg" 
                onClick={handleStartInterview}
                icon={Zap}
              >
                Start Interview
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12 pt-8 border-t border-white/20"
            >
              {[
                { value: '500+', label: 'Questions' },
                { value: '1000+', label: 'Users' },
                { value: '4.9★', label: 'Rating' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-blue-200 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Features Section */}
        <motion.div
          id="features"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Why Choose Cogniprep AI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group cursor-pointer"
              >
                <div className="h-full bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:border-white/40 hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-shadow duration-300`}
                    >
                      <feature.icon className="text-white" size={32} />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-blue-200 dark:text-blue-300 text-sm leading-relaxed group-hover:text-white dark:group-hover:text-blue-100 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          id="how-it-works"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Setup Interview',
                description: 'Choose your job role, experience level, and interview type',
                icon: Settings
              },
              {
                step: '2',
                title: 'Practice Live',
                description: 'Answer AI-generated questions in real-time with voice or text',
                icon: MessageSquare
              },
              {
                step: '3',
                title: 'Get Feedback',
                description: 'Receive detailed analysis and personalized improvement tips',
                icon: Award
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group cursor-pointer"
              >
                <div className="h-full bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] text-center relative">
                  <motion.div 
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl border-4 border-blue-900 dark:border-black group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-cyan-400/50 transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.step}
                  </motion.div>
                  <div className="pt-8">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-shadow duration-300"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="text-white" size={32} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">{item.title}</h3>
                    <p className="text-blue-200 dark:text-blue-300 group-hover:text-white dark:group-hover:text-blue-100 transition-colors duration-300">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQs Section */}
        <motion.div
          id="faqs"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl mb-4">
              <HelpCircle className="text-white" size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-blue-200 dark:text-blue-300 text-lg">
              Everything you need to know about Cogniprep AI
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: 'Is Cogniprep AI free to use?',
                answer: 'Yes! Cogniprep AI offers a free tier with access to basic interview practice. Premium features are available with our subscription plans.'
              },
              {
                question: 'What types of interviews can I practice?',
                answer: 'You can practice Technical, HR, and Mixed interviews for various roles including Frontend, Backend, Full Stack, Java, Python, and DevOps positions.'
              },
              {
                question: 'How does the AI provide feedback?',
                answer: 'Our AI analyzes your responses for communication skills, technical knowledge, and confidence. You receive detailed scores and personalized improvement suggestions after each interview.'
              },
              {
                question: 'Can I use voice responses?',
                answer: 'Yes! You can answer questions using voice input or text. The interface supports both microphone recording and typed responses.'
              },
              {
                question: 'How long does an interview session take?',
                answer: 'A typical interview session takes 15-30 minutes, depending on the number of questions and your response time. You can see the timer during your session.'
              },
              {
                question: 'Is my data secure?',
                answer: 'Absolutely! We use industry-standard encryption to protect your data. Your interview sessions and personal information are completely secure and private.'
              }
            ].map((faq, index) => (
              <GlassCard
                key={index}
                delay={1.9 + index * 0.05}
                className="cursor-pointer"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-white flex-shrink-0" size={24} />
                  </motion.div>
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? 'auto' : 0,
                    opacity: openFaq === index ? 1 : 0,
                    marginTop: openFaq === index ? 12 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-blue-200 dark:text-blue-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Start Your Practice Section */}
        <motion.div
          id="start-practice"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Your Practice
              </h2>
              <p className="text-xl text-blue-200 dark:text-blue-300 max-w-2xl mx-auto">
                Choose your path and begin your interview preparation journey
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Code,
                title: 'Technical Interview',
                description: 'Practice coding, algorithms, and system design questions',
                color: 'from-blue-500 to-cyan-500',
                popular: true
              },
              {
                icon: MessageSquare,
                title: 'Behavioral Interview',
                description: 'Master communication, leadership, and soft skills',
                color: 'from-purple-500 to-pink-500',
                popular: false
              },
              {
                icon: Award,
                title: 'Mock Interview',
                description: 'Full interview simulation with comprehensive feedback',
                color: 'from-green-500 to-emerald-500',
                popular: false
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group cursor-pointer relative"
                onClick={handleStartInterview}
              >
                {item.popular && (
                  <div className="absolute -top-3 right-4 z-10">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      POPULAR
                    </span>
                  </div>
                )}
                <div className="h-full bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-shadow duration-300`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="text-white" size={32} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3 text-center group-hover:text-blue-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-blue-200 dark:text-blue-300 text-center group-hover:text-white dark:group-hover:text-blue-100 transition-colors duration-300">
                    {item.description}
                  </p>
                  <motion.div
                    className="mt-6 text-center"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-blue-400 group-hover:text-blue-300 font-semibold inline-flex items-center gap-2">
                      Get Started
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="mt-24"
        >
          <GlassCard className="text-center backdrop-blur-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Ace Your Interview?
            </h2>
            <p className="text-blue-100 dark:text-blue-200 text-lg mb-8">
              Join thousands of successful candidates who practiced with Cogniprep AI
            </p>
            <Button 
              size="lg"
              onClick={handleStartInterview}
              icon={Sparkles}
            >
              Start Your First Interview
            </Button>
          </GlassCard>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="bg-white/5 dark:bg-black/20 backdrop-blur-xl border-t border-white/10 mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center gap-6">
            {/* Social Media Links */}
            <div className="flex items-center gap-6">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-200 hover:text-pink-400 transition-colors"
              >
                <Instagram size={28} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-200 hover:text-blue-400 transition-colors"
              >
                <FaXTwitter size={28} />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-200 hover:text-blue-500 transition-colors"
              >
                <Facebook size={28} />
              </motion.a>
            </div>

            {/* Copyright */}
            <p className="text-center text-blue-100 dark:text-blue-200">
              © 2026 Cogniprep AI. Built with ❤️ for aspiring professionals.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
