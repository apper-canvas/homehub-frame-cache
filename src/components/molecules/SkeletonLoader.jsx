import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          {/* Image Skeleton */}
          <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
          
          {/* Content Skeleton */}
          <div className="p-5 space-y-3">
            {/* Title and Price */}
            <div className="flex justify-between items-start">
              <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
            
            {/* Address */}
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;