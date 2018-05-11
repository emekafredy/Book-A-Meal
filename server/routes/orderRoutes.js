import OrderController from '../controllers/orderController';
import UserMiddleware from '../middlewares/user';

const orderRoutes = (app) => {
  app.post('/api/v1/orders', UserMiddleware.checkUser, OrderController.makeOrder);
  app.get('/api/v1/orders', UserMiddleware.checkUser, UserMiddleware.checkAdmin, OrderController.getOrders);
  app.put('/api/v1/orders/:id', UserMiddleware.checkUser, OrderController.updateOrder);
  app.delete('/api/v1/orders/:id', UserMiddleware.checkUser, OrderController.cancelOrder);
};

export default orderRoutes;
