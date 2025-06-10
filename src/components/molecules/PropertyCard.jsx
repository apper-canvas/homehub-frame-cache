import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const PropertyCard = ({ property, viewMode = 'grid', onFavoriteToggle }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSquareFeet = (sqft) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavoriteToggle(property.id, !property.isFavorite);
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
        onClick={handleCardClick}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative sm:w-80 h-48 sm:h-auto flex-shrink-0">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <Button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm"
            >
              <ApperIcon 
                name="Heart" 
                className={`w-5 h-5 transition-colors duration-200 ${
                  property.isFavorite 
                    ? 'text-red-500 fill-current' 
                    : 'text-gray-600 hover:text-red-500'
                }`} 
              />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-heading font-semibold text-gray-900 break-words">
                {property.title}
              </h3>
              <span className="text-2xl font-bold text-primary ml-4 flex-shrink-0">
                {formatPrice(property.price)}
              </span>
            </div>

            <p className="text-gray-600 mb-4 flex items-center gap-2">
              <ApperIcon name="MapPin" className="w-4 h-4 flex-shrink-0" />
              <span className="break-words">{property.address}, {property.city}, {property.state}</span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <ApperIcon name="Bed" className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{property.bedrooms} beds</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Bath" className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{property.bathrooms} baths</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Home" className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{formatSquareFeet(property.squareFeet)} sq ft</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Tag" className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{property.propertyType}</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm line-clamp-2 break-words">
              {property.description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative h-48">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm"
        >
          <ApperIcon 
            name="Heart" 
            className={`w-5 h-5 transition-colors duration-200 ${
              property.isFavorite 
                ? 'text-red-500 fill-current' 
                : 'text-gray-600 hover:text-red-500'
            }`} 
          />
        </Button>
        <div className="absolute bottom-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
          {property.propertyType}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-heading font-semibold text-gray-900 break-words">
            {property.title}
          </h3>
          <span className="text-xl font-bold text-primary ml-2 flex-shrink-0">
            {formatPrice(property.price)}
          </span>
        </div>

        <p className="text-gray-600 mb-3 text-sm flex items-center gap-2">
          <ApperIcon name="MapPin" className="w-4 h-4 flex-shrink-0" />
          <span className="break-words">{property.address}, {property.city}</span>
        </p>

        <div className="grid grid-cols-3 gap-3 mb-3 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <ApperIcon name="Bed" className="w-4 h-4 text-gray-500" />
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="Bath" className="w-4 h-4 text-gray-500" />
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="Home" className="w-4 h-4 text-gray-500" />
            <span>{formatSquareFeet(property.squareFeet)} sq ft</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 break-words">
          {property.description}
        </p>
      </div>
    </motion.div>
  );
};

export default PropertyCard;