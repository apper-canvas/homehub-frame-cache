import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import FilterPanel from '@/components/organisms/FilterPanel';
import PropertyGridOrList from '@/components/organisms/PropertyGridOrList';
import propertyService from '@/services/api/propertyService';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 2000000,
    bedroomsMin: 0,
    bathroomsMin: 0,
    squareFeetMin: 0,
    propertyTypes: [],
  });

  useEffect(() => {
    loadProperties();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...properties];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query) ||
        property.state.toLowerCase().includes(query)
      );
    }

    // Price filter
    filtered = filtered.filter(property => 
      property.price >= filters.priceMin && property.price <= filters.priceMax
    );

    // Bedrooms filter
    if (filters.bedroomsMin > 0) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedroomsMin);
    }

    // Bathrooms filter
    if (filters.bathroomsMin > 0) {
      filtered = filtered.filter(property => property.bathrooms >= filters.bathroomsMin);
    }

    // Square feet filter
    if (filters.squareFeetMin > 0) {
      filtered = filtered.filter(property => property.squareFeet >= filters.squareFeetMin);
    }

    // Property type filter
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter(property => 
        filters.propertyTypes.includes(property.propertyType)
      );
    }

    setFilteredProperties(filtered);
  }, [properties, filters, searchQuery]);

  useEffect(() => {
    applyFilters();
  }, [properties, filters, searchQuery, applyFilters]);

  const loadProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await propertyService.getAll();
      setProperties(result);
    } catch (err) {
      setError(err.message || 'Failed to load properties');
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async (propertyId, newFavoriteStatus) => {
    try {
      const updatedProperty = await propertyService.update(propertyId, { 
        isFavorite: newFavoriteStatus 
      });
      
      setProperties(prev => prev.map(property => 
        property.id === propertyId ? updatedProperty : property
      ));
      
      toast.success(newFavoriteStatus ? 'Added to favorites' : 'Removed from favorites');
    } catch (err) {
      toast.error('Failed to update favorite');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      priceMin: 0,
      priceMax: 2000000,
      bedroomsMin: 0,
      bathroomsMin: 0,
      squareFeetMin: 0,
      propertyTypes: [],
    });
    setSearchQuery('');
  };

  const hasActiveFilters = searchQuery || filters.priceMin > 0 || filters.propertyTypes.length > 0 || filters.bedroomsMin > 0 || filters.bathroomsMin > 0 || filters.squareFeetMin > 0;

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Filter Sidebar */}
      <AnimatePresence>
        {showFilters && (
          <>
            {/* Mobile overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
            
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed lg:static inset-y-0 left-0 w-80 bg-white shadow-xl z-50 lg:z-0 lg:shadow-none border-r border-gray-200"
            >
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                onClose={() => setShowFilters(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <ApperIcon 
                  name="Search" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                />
                <Input
                  type="text"
                  placeholder="Search by location, property type, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3" // Apply specific padding/positioning through this className
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <ApperIcon name="Filter" className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <Button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ApperIcon name="Grid3X3" className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ApperIcon name="List" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              {filteredProperties.length} properties found
              {searchQuery && ` for "${searchQuery}"`}
            </span>
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                className="text-accent hover:text-primary transition-colors duration-200 px-0 py-0"
              >
                Clear all filters
              </Button>
            )}
          </div>
        </div>

        {/* Property Grid */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <PropertyGridOrList
            properties={filteredProperties}
            viewMode={viewMode}
            loading={loading}
            error={error}
            onFavoriteToggle={handleFavoriteToggle}
            onClearFilters={clearFilters}
            onRetryLoad={loadProperties}
            searchQuery={searchQuery}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;