import React from 'react';
import { motion } from 'framer-motion';

/**
 * Premium Button Component
 * Glassmorphism button with animations
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  icon: Icon,
  disabled = false,
  className = ''
}) => {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-xl border';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl border-transparent',
    secondary: 'bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 text-gray-900 dark:text-white border-white/20 dark:border-white/10',
    outline: 'border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 dark:hover:bg-blue-400/10',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-black/10 border-transparent',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {Icon && <Icon size={20} />}
      {children}
    </motion.button>
  );
};

export default Button;
