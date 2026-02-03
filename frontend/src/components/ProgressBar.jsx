import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Progress Bar Component
 */
const ProgressBar = ({ value, color = 'from-blue-500 to-purple-600', delay = 0 }) => {
  return (
    <div className="w-full h-3 bg-white/10 dark:bg-black/20 rounded-full overflow-hidden backdrop-blur-xl border border-white/20 dark:border-white/10">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.5, delay, ease: 'easeOut' }}
        className={`h-full bg-gradient-to-r ${color} shadow-lg`}
      />
    </div>
  );
};

export default ProgressBar;
