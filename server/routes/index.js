import mealRoutes from '../routes/mealRoutes';
import menuRoutes from '../routes/menuRoutes';
import orderRoutes from '../routes/orderRoutes';
import userRoutes from '../routes/userRoutes';

const routes = (app) => {
  mealRoutes(app);
  menuRoutes(app);
  orderRoutes(app);
  userRoutes(app);
};

export default routes;
