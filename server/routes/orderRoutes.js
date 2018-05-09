import OrderController from '../controllers/orderController';
import UserMiddleware from '../middlewares/user';

const orderRoutes = (app) => {
  app.post('/api/v1/orders', UserMiddleware.getUser, OrderController.makeOrder);
  app.get('/api/v1/orders', UserMiddleware.getUser, UserMiddleware.checkAdmin, OrderController.getOrders);
  app.put('/api/v1/orders/:id', UserMiddleware.getUser, OrderController.updateOrder);
  app.delete('/api/v1/orders/:id', UserMiddleware.getUser, UserMiddleware.checkUser, OrderController.cancelOrder);
};

export default orderRoutes;
