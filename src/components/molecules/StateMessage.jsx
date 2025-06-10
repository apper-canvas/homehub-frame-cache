import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const StateMessage = ({ 
  icon = 'Search', 
  title, 
  description, 
  actionLabel, 
  onAction,
  variant = 'empty' // 'empty' or 'error'
}) => {
  const iconMotionProps = variant === 'empty' 
    ? { 
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      }
    : {
        scale: [1, 1.1, 1],
        rotate: [0, -10, 10, 0]
      };
  
  const iconTransitionProps = variant === 'empty'
    ? { 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    : { 
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3
      };

  const iconColorClass = variant === 'error' ? 'text-error' : 'text-gray-300';
  const defaultTitle = variant === 'error' ? 'Oops! Something went wrong' : 'No results found';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <motion.div
        animate={iconMotionProps}
        transition={iconTransitionProps}
        className="mb-6"
      >
        <ApperIcon name={icon} className={`w-16 h-16 mx-auto ${iconColorClass}`} />
      </motion.div>
      
      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
        {title || defaultTitle}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md break-words">
        {description}
      </p>
      
      {onAction && (
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default StateMessage;