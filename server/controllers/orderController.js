import moment from 'moment';
import models from '../models';

/**
 * Represents the Orders controller
 * @class
 */
class Order {
  /**
   * Make Order from options in Menu
   * @method
   * @param {object} request - Send request to make an order
   * @param {object} response  - Get response
   */
  static makeOrder(request, response) {
    const {
      mealId,
      processed,
      deliveryAddress,
    } = request.body;
    const { id: userId } = request.user;
    const date = moment().format('dddd, MMM Do YYYY, h:mm:ss a');

    models.Meal.findById().then((meals) => {
      models.Order.create({
        processed: false, deliveryAddress, date, userId, mealId,
      }).then((createdOrder) => {
        response.send(createdOrder);
      }).catch(error => response.status(400).send(error));
    });
  }

  /**
   * Get Customer Orders
   * @method
   * @param {object} request - Request to see orders by the caterer
   * @param {object} response  - Get a response
   */
  static getOrders(request, response) {
    return models.Order.findAll().then((order) => {
      response.send(order);
    }).catch((error) => {
      response.status(400).json(error);
    });
  }

  /**
   * Update customer orders
   * @method
   * @param {object} request - Request to update order by users
   * @param {object} response  - Get a response
   */
  static updateOrder(request, response) {
    const id = parseInt(request.params.id, 10);

    return models.Order.findById(id).then((order) => {
      if (order) {
        const orderTime = moment(order.createdAt);
        const setExpiration = moment();
        const difference = setExpiration.diff(orderTime, 'h');
        if (difference < 1) {
          order.update({
            quantity: request.body.quantity || order.quantity,
            processed: request.body.processed ? true : order.processed,
          }).then(updatedOrder => response.send(updatedOrder));
        } else {
          return response.status(504).send({ message: 'You can no longer update this order' });
        }
      } else {
        response.status(404).send({ message: 'Order not found' });
      }
      return null;
    });
  }

  /**
   * Remove order from the table
   * @method
   * @param {object} request - Send request to delete an order
   * @param {object} response  - Get response
   * @param {number} id - ID of order to be deleted
   */
  static cancelOrder(request, response) {
    const id = parseInt(request.params.id, 10);

    return models.Order.findById(id).then((order) => {
      if (order) {
        const orderTime = moment(order.createdAt);
        const setExpiration = moment();
        const difference = setExpiration.diff(orderTime, 'h');
        if (difference < 1) {
          order.destroy().then((deletedOrder) => {
            response.status(201).json({
              message: 'Order successfully removed',
            });
          }).catch((error) => {
            response.status(500).json(error);
          });
        } else {
          return response.status(504).json({ message: 'You can no longer cancel this order' });
        }
      } else {
        response.status(404).json({
          message: 'Order does not exist',
        });
      }
      return null;
    });
  }
}

export default Order;
