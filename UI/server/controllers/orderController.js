import Menu from '../data/menu';

const customerOrder = [];
const OrderController = {

  makeOrder(req, res) {
    const orderFound = Menu.find((m) => {
      return m.mealTitle.toLowerCase() === req.body.mealTitle.toLowerCase()
    })
  
    if(orderFound) {
      const foundCustomerOrder = customerOrder.find((m) => {
        return m.mealTitle.toLowerCase() === req.body.mealTitle.toLowerCase()
      })
      
      if(!foundCustomerOrder) {
        orderFound.id = customerOrder.length + 1;
        orderFound.quantity = 2;
        orderFound.totalPrice = orderFound.quantity * orderFound.price;
        customerOrder.push(orderFound)
        res.status(201).send({
          success: 'true',
          message: 'Order selected',
          menu: customerOrder
        })
      } else {
        res.status(409).send({
          message: 'Order already selected'
        })
      }
    }
  },

  getOrders(req, res) {
    if (customerOrder.length < 1) {
      res.status(409).send({
        success: 'false',
        message: 'No Order Available',
      })
    }
    res.status(200).send({
      success: 'true',
      message: 'Orders retrieved successfully',
      orders: customerOrder
    })
  },

  getAnOrder(req, res) {
    const id = parseInt(req.params.id, 10);

    customerOrder.map((order) => {
      if(order.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'Order retrieved successfully',
          order: order
        });
      }
    });

    return res.status(404).send({
      success: 'false',
      message: `Order does not exist`
    });
  },

  updateOrder(req, res) {
    const id = parseInt(req.params.id, 10);

    let orderFound;
    let orderIndex;

    customerOrder.map((order, index) => {
      if (order.id === id) {
        orderFound = order;
        orderIndex = index;
      }  
    });

    if (!orderFound) {
      return res.status(404).send({
        success: 'false',
        message: 'Order not found'
      });
    }

    if (!req.body.quantity) {
      return res.status(400).send({
        success: 'false',
        message: 'Please enter an appropriate quantity'
      });
    }

    const updatedOrder = {
      mealTitle: req.body.mealTitle || orderFound.mealTitle,
      description: req.body.description || orderFound.description,
      price: req.body.price || orderFound.price,
      imageUrl: req.body.imageUrl || orderFound.imageUrl,
      category: req.body.category || orderFound.category,
      id: req.body.id || orderFound.id,
      quantity:  req.body.quantity || orderFound.quantity,
      totalPrice: req.body.totalPrice  || orderFound.totalPrice
    }

    customerOrder.splice(orderIndex, 1, updatedOrder);

    return res.status(201).send({
      success: 'true',
      message: 'order updated successfully',
      updatedOrder,
    });
  }
  
}

export default OrderController;