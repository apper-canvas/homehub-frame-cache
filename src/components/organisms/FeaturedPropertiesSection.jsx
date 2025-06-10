import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import PropertyCard from '@/components/molecules/PropertyCard';
import Button from '@/components/atoms/Button';
import propertyService from '@/services/api/propertyService'; // Ensure this path is correct

const FeaturedPropertiesSection = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    setLoading(true);
    try {
      const allProperties = await propertyService.getAll();
      // Get 3 random featured properties
      const shuffled = allProperties.sort(() => 0.5 - Math.random());
      setFeaturedProperties(shuffled.slice(0, 3));
    } catch (err) {
      console.error('Failed to load featured properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async (propertyId, newFavoriteStatus) => {
    try {
      await propertyService.update(propertyId, { 
        isFavorite: newFavoriteStatus 
      });
      
      setFeaturedProperties(prev => prev.map(property => 
        property.id === propertyId 
          ? { ...property, isFavorite: newFavoriteStatus }
          : property
      ));
    } catch (err) {
      console.error('Failed to update favorite:', err);
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto animate-pulse mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
          Featured Properties
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover some of our most popular and recently listed properties that offer exceptional value and location.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {featuredProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PropertyCard
              property={property}
              viewMode="grid"
              onFavoriteToggle={handleFavoriteToggle}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8"
      >
        <Button
          onClick={() => window.location.href = '/'} // Direct navigation to homepage for simplicity
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
        >
          <span>View All Properties</span>
          <ApperIcon name="ArrowRight" className="w-5 h-5" />
        </Button>
      </motion.div>
    </section>
  );
};

export default FeaturedPropertiesSection;