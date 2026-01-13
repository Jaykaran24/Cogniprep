import React from 'react';

/**
 * Reusable Card Component
 * Used for displaying content in a card layout with hover effects
 */
const Card = ({ 
  children, 
  onClick, 
  className = '',
  hoverable = false,
  selected = false 
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-md p-6
        ${hoverable ? 'cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1' : ''}
        ${selected ? 'ring-2 ring-blue-500 shadow-lg' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
