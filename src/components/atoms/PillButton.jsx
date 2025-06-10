import React from 'react';
import { motion } from 'framer-motion';

const PillButton = ({ children, onClick, isSelected, className = '', ...motionProps }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-3 text-sm rounded-lg border transition-all duration-200 ${
        isSelected
          ? 'bg-primary text-white border-primary'
          : 'bg-white text-gray-700 border-gray-300 hover:border-accent'
      } ${className}`}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
};

export default PillButton;