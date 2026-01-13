import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

/**
 * Theme Toggle Component
 * Switches between light and dark mode
 */
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-full p-1 transition-colors duration-300 border border-white/30 dark:border-white/10"
    >
      <motion.div
        className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-blue-400 dark:to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon size={12} className="text-white" />
        ) : (
          <Sun size={12} className="text-white" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
