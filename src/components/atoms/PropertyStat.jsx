import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const PropertyStat = ({ iconName, value, label }) => {
  return (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
      <ApperIcon name={iconName} className="w-6 h-6 mx-auto mb-2 text-primary" />
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

export default PropertyStat;