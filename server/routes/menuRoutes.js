import MenuController from '../controllers/menuController';
import UserMiddleware from '../middlewares/user';

const menuRoutes = (app) => {
  app.post('/api/v1/menu', MenuController.setMenu);
  app.get('/api/v1/menu', MenuController.getMenu);
};

export default menuRoutes;
