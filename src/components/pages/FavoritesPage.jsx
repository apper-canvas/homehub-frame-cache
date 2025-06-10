import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import propertyService from '@/services/api/propertyService';
import FavoritesDisplay from '@/components/organisms/FavoritesDisplay';

const FavoritesPage = () => {
  const navigate = useNavigate();
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

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FavoritesDisplay
          favorites={favorites}
          loading={loading}
          error={error}
          onFavoriteToggle={handleFavoriteToggle}
          onClearAllFavorites={clearAllFavorites}
          onRetryLoad={loadFavorites}
          onBrowseProperties={() => navigate('/')}
        />
      </div>
    </div>
  );
};

export default FavoritesPage;