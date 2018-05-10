import momemnt from 'moment';
import models from '../models';

class Order {
  static makeOrder(request, response) {
    const {
      meals,
      processed,
      quantity,
      deliveryAddress,
    } = request.body;
    const { id: userId } = request.user;
    const date = new Date();

    models.Order.create({
      processed: false, quantity, deliveryAddress, date, userId,
    }).then((createdOrder) => {
      createdOrder.addMeals(meals).then(() => {
        response.send(createdOrder);
      });
    });
  }

  static getOrders(request, response) {
    return models.Order.findAll({
      include: [{
        model: models.Meal,
        as: 'meals',
      }],
    }).then((orders) => {
      if (orders.length === 0) {
        response.status(404).json({ message: 'No ' });
      } else {
        response.send(orders);
      }
    });
  }

  static updateOrder(request, response) {
    const id = parseInt(request.params.id, 10);

    return models.Order.findById(id).then((order) => {
      if (order) {
        order.update({
          quantity: request.body.quantity || order.quantity,
          processed: request.body.processed ? true : order.processed,
        }).then((updatedOrder) => {
          response.send(updatedOrder);
        });
      } else {
        response.status(404).send({ message: 'Order not found' });
      }
    });
  }

  static cancelOrder(request, response) {
    const id = parseInt(request.params.id, 10);

    models.Order.findById(id).then((order) => {
      if (order) {
        order.destroy().then((deletedOrder) => {
          response.send({ message: 'Order successfully removed' });
        });
      } else {
        response.status(404).send({ message: `order with id ${id} not found` });
      }
    });
  }
}

export default Order;
