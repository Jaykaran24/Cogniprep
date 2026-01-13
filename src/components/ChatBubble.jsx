import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

/**
 * ChatBubble Component with Animations
 * Glassmorphism chat bubbles
 */
const ChatBubble = ({ type, message, timestamp }) => {
  const isAI = type === 'ai';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isAI ? -50 : 50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`flex items-start gap-3 mb-4 ${isAI ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`
          flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg
          ${isAI 
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
            : 'bg-gradient-to-br from-purple-500 to-pink-600'
          }
        `}
      >
        {isAI ? <Bot size={20} className="text-white" /> : <User size={20} className="text-white" />}
      </motion.div>
      
      {/* Message Bubble */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`
          max-w-[70%] rounded-2xl px-4 py-3 shadow-lg backdrop-blur-xl
          ${isAI 
            ? 'bg-white/20 dark:bg-white/10 text-gray-900 dark:text-gray-100 border border-white/30 dark:border-white/10 rounded-tl-none' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none border border-transparent'
          }
        `}
      >
        <p className="text-sm md:text-base leading-relaxed">{message}</p>
        {timestamp && (
          <p className={`text-xs mt-1 ${isAI ? 'text-gray-600 dark:text-gray-400' : 'text-blue-100'}`}>
            {timestamp}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ChatBubble;
