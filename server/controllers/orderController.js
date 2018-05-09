import models from '../models';

class Order {
  static makeOrder(request, response) {
    const { mealId, quantity } = request.body;

    if (!mealId) {
      return response.status(400).send({ message: 'Enter a meal ID' });
    }

    return models.Meals.findById(mealId).then((meal) => {
      if (meal) {
        models.Order.create({
          mealId, userId: 1, processed: false, quantity, date: new Date(),
        }).then((order) => {
          response.send(order);
        });
      } else {
        response.status(404).send({ message: 'Meal not found' });
      }
    });
  }

  static getOrders(request, response) {
    return models.Order.findAll({
      include: [{
        model: models.Meals,
      }],
    }).then((orders) => {
      response.send(orders);
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
          response.send({ message: 'Order successfully deleted' });
        });
      } else {
        response.status(404).send({ message: `order with id ${id} not found` });
      }
    });
  }
}

export default Order;
