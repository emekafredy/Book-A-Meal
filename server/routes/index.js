import Meal from '../controllers/mealController';
import Menu from '../controllers/menuController';
import Order from './../controllers/orderController';
import User from '../controllers/userController';

import UserMiddleware from '../middlewares/user';

const routes = (app) => {
  // MEALS
  app.get('/api/v1/meals', UserMiddleware.getUser, UserMiddleware.checkAdmin, Meal.getMeals);
  app.post('/api/v1/meals', UserMiddleware.getUser, UserMiddleware.checkAdmin, Meal.addMeal);
  app.put('/api/v1/meals/:id', UserMiddleware.getUser, UserMiddleware.checkAdmin, Meal.updateMeal);
  app.delete('/api/v1/meals/:id', Meal.deleteMeal);

  // MENU
  app.post('/api/v1/menu', UserMiddleware.getUser, UserMiddleware.checkAdmin, Menu.setMenu);
  app.get('/api/v1/menu', UserMiddleware.getUser, Menu.getMenu);

  // ORDERS
  app.post('/api/v1/orders', UserMiddleware.getUser, Order.makeOrder);
  app.get('/api/v1/orders', UserMiddleware.getUser, UserMiddleware.checkAdmin, Order.getOrders);
  app.put('/api/v1/orders/:id', UserMiddleware.getUser, Order.updateOrder);

  // USERS
  app.post('/api/v1/auth/signup', User.userSignUp);
  app.post('/api/v1/auth/login', User.userLogin);
};

export default routes;
