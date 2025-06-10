import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import PropertyStat from '@/components/atoms/PropertyStat';

const PropertyDetailsOverview = ({ property, formatSquareFeet }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="lg:col-span-2 space-y-8"
    >
      {/* Quick Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-heading font-semibold mb-4">Property Details</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <PropertyStat iconName="Bed" value={property.bedrooms} label="Bedrooms" />
          <PropertyStat iconName="Bath" value={property.bathrooms} label="Bathrooms" />
          <PropertyStat iconName="Home" value={formatSquareFeet(property.squareFeet)} label="Sq Ft" />
          <PropertyStat iconName="Calendar" value={property.yearBuilt} label="Year Built" />
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-heading font-semibold mb-4">Description</h2>
        <p className="text-gray-700 leading-relaxed break-words">
          {property.description}
        </p>
      </div>

      {/* Amenities */}
      {property.amenities && property.amenities.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-heading font-semibold mb-4">Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3">
                <ApperIcon name="Check" className="w-5 h-5 text-success" />
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PropertyDetailsOverview;