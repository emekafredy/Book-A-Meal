import MenuController from '../controllers/menuController';
import UserMiddleware from '../middlewares/user';

const menuRoutes = (app) => {
  app.post('/api/v1/menu', UserMiddleware.getUser, UserMiddleware.checkAdmin, MenuController.setMenu);
  app.get('/api/v1/menu', UserMiddleware.getUser, MenuController.getMenu);
};

export default menuRoutes;
