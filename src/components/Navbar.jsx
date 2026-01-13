import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, LogIn, LogOut, User, ChevronDown, Settings, TrendingUp, Trophy } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Button from './Button';

/**
 * Enhanced Navbar Component
 * Glassmorphism navbar with navigation links and auth options
 */
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showPerformanceDropdown, setShowPerformanceDropdown] = useState(false);

  // Check auth state on mount and location change
  useEffect(() => {
    const authState = localStorage.getItem('isAuthenticated') === 'true';
    const storedName = localStorage.getItem('userName') || 'User';
    setIsLoggedIn(authState);
    setUserName(storedName);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/', showWhen: 'always' },
    { name: 'Features', path: '/#features', showWhen: 'loggedOut' },
    { name: 'How It Works', path: '/#how-it-works', showWhen: 'loggedOut' },
    { name: 'FAQs', path: '/#faqs', showWhen: 'loggedOut' },
  ];

  const scrollToSection = (path) => {
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      if (location.pathname !== route && route) {
        navigate(route);
        setTimeout(() => {
          const element = document.getElementById(hash);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear auth state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('User');
    setIsMobileMenuOpen(false);
    // Navigate to home
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-black/10 backdrop-blur-xl border-b border-white/20 dark:border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Cogniprep AI
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Nav Links */}
            {navLinks
              .filter(link => 
                link.showWhen === 'always' || 
                (link.showWhen === 'loggedIn' && isLoggedIn) || 
                (link.showWhen === 'loggedOut' && !isLoggedIn)
              )
              .map((link) => (
                <motion.button
                  key={link.name}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    if (link.path.includes('#')) {
                      scrollToSection(link.path);
                    } else {
                      navigate(link.path);
                    }
                  }}
                  className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}

            {/* Start Now Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                if (location.pathname === '/') {
                  const element = document.getElementById('start-practice');
                  element?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/#start-practice');
                }
              }}
            >
              Start Now
            </Button>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                {/* Performance Dropdown */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowPerformanceDropdown(!showPerformanceDropdown)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-lg border border-white/20 hover:border-white/40 transition-all"
                  >
                    <TrendingUp size={16} className="text-gray-800 dark:text-gray-200" />
                    <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">Performance</span>
                    <ChevronDown size={14} className={`text-gray-800 dark:text-gray-200 transition-transform ${showPerformanceDropdown ? 'rotate-180' : ''}`} />
                  </motion.button>

                  {/* Performance Dropdown Menu */}
                  <AnimatePresence>
                    {showPerformanceDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 right-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-xl border border-white/20 p-2 min-w-[180px] z-50 shadow-2xl"
                      >
                        <button
                          onClick={() => {
                            navigate('/analytics');
                            setShowPerformanceDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                          <TrendingUp size={16} />
                          Analytics
                        </button>
                        <button
                          onClick={() => {
                            navigate('/leaderboard');
                            setShowPerformanceDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                          <Trophy size={16} />
                          Leaderboards
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Account Dropdown */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-lg border border-white/20 hover:border-white/40 transition-all"
                  >
                    <User size={16} className="text-gray-800 dark:text-gray-200" />
                    <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{userName}</span>
                    <ChevronDown size={14} className={`text-gray-800 dark:text-gray-200 transition-transform ${showAccountDropdown ? 'rotate-180' : ''}`} />
                  </motion.button>

                  {/* Account Dropdown Menu */}
                  <AnimatePresence>
                    {showAccountDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 right-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-xl border border-white/20 p-2 min-w-[180px] z-50 shadow-2xl"
                      >
                        <button
                          onClick={() => {
                            navigate('/profile');
                            setShowAccountDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                          <User size={16} />
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            navigate('/settings');
                            setShowAccountDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                          <Settings size={16} />
                          Settings
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={LogOut}
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                icon={LogIn}
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20"
            >
              {isMobileMenuOpen ? (
                <X className="text-gray-800 dark:text-gray-200" size={24} />
              ) : (
                <Menu className="text-gray-800 dark:text-gray-200" size={24} />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/10 dark:bg-black/10 backdrop-blur-xl border-t border-white/20 dark:border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Nav Links */}
              {navLinks
                .filter(link => 
                  link.showWhen === 'always' || 
                  (link.showWhen === 'loggedIn' && isLoggedIn) || 
                  (link.showWhen === 'loggedOut' && !isLoggedIn)
                )
                .map((link) => (
                  <motion.button
                    key={link.name}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (link.path.includes('#')) {
                        scrollToSection(link.path);
                      } else {
                        navigate(link.path);
                      }
                    }}
                    className="block w-full text-left px-4 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-white/10 dark:hover:bg-white/5 font-medium transition-colors"
                  >
                    {link.name}
                  </motion.button>
                ))}

              {/* Mobile Buttons */}
              <div className="pt-3 space-y-2 border-t border-white/20">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (location.pathname === '/') {
                      const element = document.getElementById('start-practice');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate('/#start-practice');
                    }
                  }}
                >
                  Start Now
                </Button>

                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-lg border border-white/20">
                      <User size={16} className="text-gray-800 dark:text-gray-200" />
                      <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{userName}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="secondary"
                        size="md"
                        icon={TrendingUp}
                        onClick={() => {
                          navigate('/analytics');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Analytics
                      </Button>
                      <Button
                        variant="secondary"
                        size="md"
                        icon={Trophy}
                        onClick={() => {
                          navigate('/leaderboard');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Leaderboard
                      </Button>
                      <Button
                        variant="secondary"
                        size="md"
                        icon={User}
                        onClick={() => {
                          navigate('/profile');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Profile
                      </Button>
                      <Button
                        variant="secondary"
                        size="md"
                        icon={Settings}
                        onClick={() => {
                          navigate('/settings');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Settings
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="md"
                      fullWidth
                      icon={LogOut}
                      onClick={handleLogout}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    icon={LogIn}
                    onClick={() => {
                      navigate('/signup');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
