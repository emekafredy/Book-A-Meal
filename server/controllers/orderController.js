import meals from '../data/meals';
import order from '../data/order';

class Order {
  static makeOrder(request, response) {
    const mealFound = meals.find(meal => meal.title === request.body.title);

    if (mealFound) {
      const orderFound = order.find(meal => meal.title === request.body.title);

      if (!orderFound) {
        order.push(mealFound);
        response.status(201).send({
          message: 'Order successfully selected',
          order,
        });
      } else {
        response.status(409).send({
          message: 'Order already selected',
        });
      }
    }
  }

  static getOrders(request, response) {
    if (order.length < 1) {
      response.status(409).send({
        message: 'No Order Available',
      });
    }
    response.status(200).send({
      success: 'true',
      message: 'Orders retrieved successfully',
      order,
    });
  }

  static getAnOrder(request, response) {
    const id = parseInt(request.params.id, 10);

    order.map((orders) => {
      if (orders.id === id) {
        return response.status(200).send({
          message: 'Order retrieved successfully',
          order,
        });
      }
      return null;
    });

    return response.status(404).send({
      message: 'Order does not exist',
    });
  }

  static updateOrder(request, response) {
    const id = parseInt(request.params.id, 10);

    let orderFound;
    let orderIndex;

    order.map((orders, index) => {
      if (orders.id === id) {
        orderFound = order;
        orderIndex = index;
      }
      return null;
    });

    if (!orderFound) {
      return response.status(404).send({
        message: 'Order not found',
      });
    }

    if (!request.body.quantity) {
      return response.status(400).send({
        message: 'Please enter an appropriate quantity',
      });
    }

    const updatedOrder = {
      title: request.body.title || orderFound.title,
      description: request.body.description || orderFound.description,
      imageUrl: request.body.imageUrl || orderFound.imageUrl,
      price: request.body.price || orderFound.price,
      id: request.body.id || orderFound.id,
      quantity: request.body.quantity || orderFound.quantity,
      totalPrice: request.body.totalPrice || orderFound.totalPrice,
    };

    order.splice(orderIndex, 1, updatedOrder);

    return response.status(201).send({
      message: 'order updated successfully',
      updatedOrder,
    });
  }
}

export default Order;
