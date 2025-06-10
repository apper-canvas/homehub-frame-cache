import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const propertyTypes = [
    'House',
    'Apartment',
    'Condo',
    'Townhouse',
    'Villa',
    'Studio'
  ];

  const handleLocalFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePropertyTypeToggle = (type) => {
    const currentTypes = localFilters.propertyTypes || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    handleLocalFilterChange('propertyTypes', newTypes);
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    } else {
      return `$${price}`;
    }
  };

  const formatSquareFeet = (sqft) => {
    if (sqft >= 1000) {
      return `${(sqft / 1000).toFixed(1)}K`;
    }
    return sqft.toString();
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-lg font-heading font-semibold text-gray-900">Filters</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onClearFilters}
            className="text-sm text-accent hover:text-primary transition-colors duration-200"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4">Price Range</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Min: {formatPrice(localFilters.priceMin)}
              </label>
              <input
                type="range"
                min="0"
                max="2000000"
                step="50000"
                value={localFilters.priceMin}
                onChange={(e) => handleLocalFilterChange('priceMin', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Max: {formatPrice(localFilters.priceMax)}
              </label>
              <input
                type="range"
                min="0"
                max="2000000"
                step="50000"
                value={localFilters.priceMax}
                onChange={(e) => handleLocalFilterChange('priceMax', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4">Property Type</h3>
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map((type) => {
              const isSelected = (localFilters.propertyTypes || []).includes(type);
              return (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePropertyTypeToggle(type)}
                  className={`p-3 text-sm rounded-lg border transition-all duration-200 ${
                    isSelected
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-accent'
                  }`}
                >
                  {type}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Minimum Bedrooms: {localFilters.bedroomsMin === 0 ? 'Any' : localFilters.bedroomsMin}
          </h3>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <motion.button
                key={num}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLocalFilterChange('bedroomsMin', num)}
                className={`w-12 h-12 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  localFilters.bedroomsMin === num
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-accent'
                }`}
              >
                {num === 0 ? 'Any' : num}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Minimum Bathrooms: {localFilters.bathroomsMin === 0 ? 'Any' : localFilters.bathroomsMin}
          </h3>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <motion.button
                key={num}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLocalFilterChange('bathroomsMin', num)}
                className={`w-12 h-12 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  localFilters.bathroomsMin === num
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-accent'
                }`}
              >
                {num === 0 ? 'Any' : num}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Square Feet */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Minimum Square Feet: {localFilters.squareFeetMin === 0 ? 'Any' : formatSquareFeet(localFilters.squareFeetMin)}
          </h3>
          <input
            type="range"
            min="0"
            max="5000"
            step="250"
            value={localFilters.squareFeetMin}
            onChange={(e) => handleLocalFilterChange('squareFeetMin', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Any</span>
            <span>5K+ sq ft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;