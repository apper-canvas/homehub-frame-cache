import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCard from '@/components/molecules/PropertyCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import StateMessage from '@/components/molecules/StateMessage';

const PropertyGridOrList = ({
  properties,
  viewMode,
  loading,
  error,
  onFavoriteToggle,
  onClearFilters,
  onRetryLoad,
  searchQuery,
  hasActiveFilters
}) => {
  if (loading) {
    return <SkeletonLoader count={viewMode === 'grid' ? 6 : 3} />;
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

  if (properties.length === 0) {
    return (
      <StateMessage
        title="No properties found"
        description="Try adjusting your search criteria or filters to find more properties."
        actionLabel="Clear Filters"
        onAction={onClearFilters}
      />
    );
  }

  return (
    <motion.div
      layout
      className={`grid gap-6 ${
        viewMode === 'grid'
          ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
          : 'grid-cols-1 max-w-4xl mx-auto'
      }`}
    >
      <AnimatePresence>
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.05 }}
          >
            <PropertyCard
              property={property}
              viewMode={viewMode}
              onFavoriteToggle={onFavoriteToggle}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default PropertyGridOrList;