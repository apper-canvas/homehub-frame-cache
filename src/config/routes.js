import HomePage from '@/components/pages/HomePage';
import FavoritesPage from '@/components/pages/FavoritesPage';

export const routes = {
  home: {
    id: 'home',
    label: 'Browse',
    path: '/',
    icon: 'Search',
component: HomePage
  },
  favorites: {
    id: 'favorites',
    label: 'Favorites',
    path: '/favorites',
    icon: 'Heart',
component: FavoritesPage
  }
};

export const routeArray = Object.values(routes);