import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import PropertyCard from '@/components/molecules/PropertyCard';
import StateMessage from '@/components/molecules/StateMessage';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';

const FavoritesDisplay = ({
  favorites,
  loading,
  error,
  onFavoriteToggle,
  onClearAllFavorites,
  onRetryLoad,
  onBrowseProperties,
}) => {
  if (loading) {
    return (
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        <SkeletonLoader count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <StateMessage
        variant="error"
        message={error}
        onAction={onRetryLoad}
        actionLabel="Try Again"
      />
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2 flex items-center gap-3">
              <ApperIcon name="Heart" className="w-8 h-8 text-red-500 fill-current" />
              Your Favorites
            </h1>
            <p className="text-gray-600">
              {favorites.length === 0
                ? 'No favorite properties yet'
                : `${favorites.length} favorite ${favorites.length === 1 ? 'property' : 'properties'}`
              }
            </p>
          </div>
          
          {favorites.length > 0 && (
            <Button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClearAllFavorites}
              className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
              Clear All
            </Button>
          )}
        </div>
      </motion.div>

      {favorites.length === 0 ? (
        <StateMessage
          icon="Heart"
          title="No favorite properties yet"
          description="Start browsing properties and save the ones you love to see them here."
          actionLabel="Browse Properties"
          onAction={onBrowseProperties}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {favorites.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <PropertyCard
                property={property}
                viewMode="grid"
                onFavoriteToggle={onFavoriteToggle}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default FavoritesDisplay;