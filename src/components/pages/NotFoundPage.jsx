import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import StateMessage from '@/components/molecules/StateMessage';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="mx-auto mb-8"
          >
            <ApperIcon name="Home" className="w-24 h-24 text-gray-300 mx-auto" />
          </motion.div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-heading font-semibold text-gray-700 mb-4">
            Property Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, the property you're looking for doesn't exist or has been removed from our listings.
          </p>
          
          <div className="space-y-4">
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
            >
              Back to Browse
            </Button>
            
            <Button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/favorites')}
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
            >
              View Favorites
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;