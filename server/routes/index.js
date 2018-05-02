import Meal from '../controllers/mealController';
import Menu from '../controllers/menuController';
import Order from './../controllers/orderController';

const meal = new Meal();
const menu = new Menu();
const order = new Order();

const routes = (app) => {
  
  // MEALS
  app.get('/api/v1/meals', meal.getMeals);

  app.post('/api/v1/meals', meal.addMeal);

  app.put('/api/v1/meals/:id', meal.updateMeal);

  app.delete('/api/v1/meals/:id', meal.deleteMeal);

  // MENU
  app.post('/api/v1/menu', menu.setMenu);

  app.get('/api/v1/menu', menu.getMenu);

  // ORDERS
  app.post('/api/v1/orders', order.makeOrder);
  
  app.get('/api/v1/orders', order.getOrders);

  app.get('/api/v1/orders/:id', order.getAnOrder);
  
  app.put('/api/v1/orders/:id', order.updateOrder);

};


export default routes;