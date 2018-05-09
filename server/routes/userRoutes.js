import UserController from '../controllers/userController';
import UserMiddleware from '../middlewares/user';

const userRoutes = (app) => {
  app.post('/api/v1/auth/signup', UserController.userSignUp);
  app.post('/api/v1/auth/login', UserController.userLogin);
};

export default userRoutes;
