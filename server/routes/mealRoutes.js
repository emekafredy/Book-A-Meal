import MealController from '../controllers/mealController';
import UserMiddleware from '../middlewares/user';

const mealRoutes = (app) => {
  app.get('/api/v1/meals', UserMiddleware.getUser, UserMiddleware.checkAdmin, MealController.getMeals);
  app.post('/api/v1/meals', UserMiddleware.getUser, UserMiddleware.checkAdmin, MealController.addMeal);
  app.put('/api/v1/meals/:id', UserMiddleware.getUser, UserMiddleware.checkAdmin, MealController.updateMeal);
  app.delete('/api/v1/meals/:id', UserMiddleware.getUser, UserMiddleware.checkAdmin, MealController.deleteMeal);
};

export default mealRoutes;
