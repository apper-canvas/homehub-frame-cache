import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import PropertyCard from '../components/PropertyCard';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import propertyService from '../services/api/propertyService';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const allProperties = await propertyService.getAll();
      const favoriteProperties = allProperties.filter(property => property.isFavorite);
      setFavorites(favoriteProperties);
    } catch (err) {
      setError(err.message || 'Failed to load favorites');
      toast.error('Failed to load favorite properties');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async (propertyId, newFavoriteStatus) => {
    try {
      await propertyService.update(propertyId, { 
        isFavorite: newFavoriteStatus 
      });
      
      if (!newFavoriteStatus) {
        setFavorites(prev => prev.filter(property => property.id !== propertyId));
        toast.success('Removed from favorites');
      }
    } catch (err) {
      toast.error('Failed to update favorite');
    }
  };

  const clearAllFavorites = async () => {
    if (favorites.length === 0) return;
    
    const confirmClear = window.confirm(
      'Are you sure you want to remove all properties from your favorites?'
    );
    
    if (!confirmClear) return;

    try {
      await Promise.all(
        favorites.map(property => 
          propertyService.update(property.id, { isFavorite: false })
        )
      );
      setFavorites([]);
      toast.success('All favorites cleared');
    } catch (err) {
      toast.error('Failed to clear favorites');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <SkeletonLoader count={4} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorState 
            message={error}
            onRetry={loadFavorites}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
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
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearAllFavorites}
                className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
                Clear All
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <EmptyState
            icon="Heart"
            title="No favorite properties yet"
            description="Start browsing properties and save the ones you love to see them here."
            actionLabel="Browse Properties"
            onAction={() => window.location.href = '/'}
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
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;