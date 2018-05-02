import Menu from '../data/menu';

const customerOrder = [];

class Order {
  makeOrder(request, response) {
    const orderFound = Menu.find((m) => {
      return m.mealTitle.toLowerCase() === request.body.mealTitle.toLowerCase();
    })
  
    if(orderFound) {
      const foundCustomerOrder = customerOrder.find((m) => {
        return m.mealTitle.toLowerCase() === request.body.mealTitle.toLowerCase();
      })
      
      if(!foundCustomerOrder) {
        customerOrder.push(orderFound);
        response.status(201).send({
          message: 'Order successfully selected',
          menu: customerOrder
        })
      } else {
        response.status(409).send({
          message: 'Order already selected'
        })
      }
    }
  }

  getOrders(request, response) {
    if (customerOrder.length < 1) {
      response.status(409).send({
        message: 'No Order Available',
      })
    }
    response.status(200).send({
      success: 'true',
      message: 'Orders retrieved successfully',
      orders: customerOrder
    })
  }

  getAnOrder(request, response) {
    const id = parseInt(request.params.id, 10);

    customerOrder.map((order) => {
      if(order.id === id) {
        return response.status(200).send({
          message: 'Order retrieved successfully',
          order: order
        });
      }
    });

    return response.status(404).send({
      message: `Order does not exist`
    });
  }

  updateOrder(request, response) {
    const id = parseInt(request.params.id, 10);

    let orderFound;
    let orderIndex;

    customerOrder.map((order, index) => {
      if (order.id === id) {
        orderFound = order;
        orderIndex = index;
      }  
    });

    if (!orderFound) {
      return response.status(404).send({
        message: 'Order not found'
      });
    }

    if (!request.body.quantity) {
      return response.status(400).send({
        message: 'Please enter an appropriate quantity'
      });
    }

    const updatedOrder = {
      mealTitle: request.body.mealTitle || orderFound.mealTitle,
      description: request.body.description || orderFound.description,
      price: request.body.price || orderFound.price,
      imageUrl: request.body.imageUrl || orderFound.imageUrl,
      category: request.body.category || orderFound.category,
      id: request.body.id || orderFound.id,
      quantity:  request.body.quantity || orderFound.quantity,
      totalPrice: request.body.totalPrice  || orderFound.totalPrice
    }

    customerOrder.splice(orderIndex, 1, updatedOrder);

    return response.status(201).send({
      message: 'order updated successfully',
      updatedOrder,
    });
  }
}

export default Order;