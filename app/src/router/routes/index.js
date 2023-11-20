// Import required route files
import about from './about';
import site from './site';
import member from './member';
import catchall from './catchall';

// Add routes in order of precedence
const routes = [
  ...about,
  ...site,
  ...member,
  ...catchall // Keep catchall last
]

// Export full route object to Quasar/Vue Router
export default routes;
