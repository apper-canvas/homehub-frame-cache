import Home from '../pages/Home';
import PropertyDetail from '../pages/PropertyDetail';
import Favorites from '../pages/Favorites';

export const routes = {
  home: {
    id: 'home',
    label: 'Browse',
    path: '/',
    icon: 'Search',
    component: Home
  },
  favorites: {
    id: 'favorites',
    label: 'Favorites',
    path: '/favorites',
    icon: 'Heart',
    component: Favorites
  }
};

export const routeArray = Object.values(routes);