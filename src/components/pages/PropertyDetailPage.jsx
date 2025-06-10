import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import MediaGallery from '@/components/molecules/MediaGallery';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import StateMessage from '@/components/molecules/StateMessage';
import PropertyHeaderBlock from '@/components/organisms/PropertyHeaderBlock';
import PropertyDetailsOverview from '@/components/organisms/PropertyDetailsOverview';
import PropertyListingInfo from '@/components/organisms/PropertyListingInfo';
import ContactForm from '@/components/organisms/ContactForm';
import propertyService from '@/services/api/propertyService';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await propertyService.getById(id);
      if (!result) {
        throw new Error('Property not found');
      }
      setProperty(result);
    } catch (err) {
      setError(err.message || 'Failed to load property');
      toast.error('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!property) return;
    
    try {
      const updatedProperty = await propertyService.update(property.id, { 
        isFavorite: !property.isFavorite 
      });
      setProperty(updatedProperty);
      toast.success(updatedProperty.isFavorite ? 'Added to favorites' : 'Removed from favorites');
    } catch (err) {
      toast.error('Failed to update favorite');
    }
  };

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

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SkeletonLoader count={1} />
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StateMessage 
            variant="error"
            message={error || 'Property not found'}
            onAction={() => navigate('/')}
            actionLabel="Back to Browse"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyHeaderBlock
          property={property}
          formatPrice={formatPrice}
          onFavoriteToggle={handleFavoriteToggle}
          onBackClick={() => navigate('/')}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <MediaGallery 
            images={property.images} 
            title={property.title}
          />
        </motion.div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <PropertyDetailsOverview
            property={property}
            formatSquareFeet={formatSquareFeet}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <PropertyListingInfo
              property={property}
              formatPrice={formatPrice}
            />
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;