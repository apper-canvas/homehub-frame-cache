import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const PropertyListingInfo = ({ property, formatPrice }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      {/* Property Type & Listing Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-heading font-semibold mb-4">Listing Information</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Property Type</span>
            <span className="font-medium text-gray-900">{property.propertyType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Listed Date</span>
            <span className="font-medium text-gray-900">
              {format(new Date(property.listingDate), 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Price per Sq Ft</span>
            <span className="font-medium text-gray-900">
              {formatPrice(property.price / property.squareFeet)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyListingInfo;