import Meal from '../controllers/mealController';
import Menu from '../controllers/menuController';
import Order from './../controllers/orderController';
import User from '../controllers/userController';

const routes = (app) => {
  // MEALS
  app.get('/api/v1/meals', Meal.getMeals);
  app.post('/api/v1/meals', Meal.addMeal);
  app.put('/api/v1/meals/:id', Meal.updateMeal);
  app.delete('/api/v1/meals/:id', Meal.deleteMeal);

  // MENU
  app.post('/api/v1/menu', Menu.setMenu);
  app.get('/api/v1/menu/:id', Menu.getByMenuId);
  app.get('/api/v1/menu', Menu.getMenu);

  // ORDERS
  app.post('/api/v1/orders', Order.makeOrder);
  app.get('/api/v1/orders', Order.getOrders);
  app.get('/api/v1/orders/:id', Order.getAnOrder);
  app.put('/api/v1/orders/:id', Order.updateOrder);

  // USERS
  app.post('/api/v1/auth/signup', User.userSignUp);
  app.post('/api/v1/auth/login', User.userLogin);
};

export default routes;
