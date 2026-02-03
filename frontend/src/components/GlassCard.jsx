import React from 'react';
import { motion } from 'framer-motion';

/**
 * Glass Card Component
 * Glassmorphism card with backdrop blur
 */
const GlassCard = ({ 
  children, 
  onClick, 
  className = '',
  hoverable = false,
  selected = false,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hoverable ? { scale: 1.02, y: -5 } : {}}
      onClick={onClick}
      className={`
        bg-white/10 dark:bg-white/5 backdrop-blur-xl 
        border border-white/20 dark:border-white/10
        rounded-2xl shadow-xl p-6
        ${hoverable ? 'cursor-pointer transition-all duration-300' : ''}
        ${selected ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-2xl bg-white/20 dark:bg-white/10' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
