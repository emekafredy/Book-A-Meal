import MealController from '../controllers/mealController';
import MenuController from '../controllers/menuController';
import OrderController from '../controllers/orderController';

const routes = (app) => {
  
  // MEALS
  app.get('/api/v1/meals', MealController.getMeals);

  app.get('/api/v1/meals/:id', MealController.getAMeal);

  app.post('/api/v1/meals', MealController.addMeal);

  app.put('/api/v1/meals/:id', MealController.updateMeal);

  app.delete('/api/v1/meals/:id', MealController.deleteMeal);

  // MENU
  app.post('/api/v1/menu', MenuController.setMenu);

  app.get('/api/v1/menu', MenuController.getMenu);

  // ORDERS
  app.post('/api/v1/orders', OrderController.makeOrder);
  
  app.get('/api/v1/orders', OrderController.getOrders);

  app.get('/api/v1/orders/:id', OrderController.getAnOrder);
  
  app.put('/api/v1/orders/:id', OrderController.updateOrder);

};


export default routes;