import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const PropertyHeaderBlock = ({ property, formatPrice, onFavoriteToggle, onBackClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Button
        onClick={onBackClick}
        className="flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors duration-200 px-0 py-0"
      >
        <ApperIcon name="ArrowLeft" className="w-5 h-5" />
        Back to Browse
      </Button>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            {property.title}
          </h1>
          <p className="text-lg text-gray-600 flex items-center gap-2">
            <ApperIcon name="MapPin" className="w-5 h-5" />
            {property.address}, {property.city}, {property.state} {property.zipCode}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(property.price)}
          </span>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onFavoriteToggle}
            className={`p-3 rounded-full border-2 transition-all duration-200 ${
              property.isFavorite
                ? 'border-red-500 bg-red-500 text-white'
                : 'border-gray-300 text-gray-500 hover:border-red-500 hover:text-red-500'
            }`}
          >
            <ApperIcon 
              name="Heart" 
              className={`w-6 h-6 ${property.isFavorite ? 'fill-current' : ''}`} 
            />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyHeaderBlock;