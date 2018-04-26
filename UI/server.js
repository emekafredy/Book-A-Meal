import express from 'express';
import bodyParser from 'body-parser';

import Meals from './database/meals';
import Menu from './database/menu';
import Orders from './database/order'

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//MEALS

// GET all the meal options
app.get('/api/v1/meals', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'meals retrieved successfully',
    meals: Meals
  })
});

// GET- Get a specific meal option
app.get('/api/v1/meals/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  Meals.map((meal) => {
    if(meal.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'Meal retrieved successfully',
        meal: meal
      });
    }
  });

  return res.status(404).send({
    success: 'false',
    message: `Meal Option does not exist`
  });
});

// POST - Add a meal option
app.post('/api/v1/meals', (req, res) => {
  if(!req.body.title || !req.body.description || !req.body.price) {
    return res.status(400).send({
      success: 'false',
      message: 'Please fill out the required fields'
    });
  }
  const meal = {
    id: Meals.length + 1,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price
  }
  Meals.push(meal);
  return res.status(201).send({
    success: 'true',
    message: 'Meal successfully added',
    meal
  });
});

// PUT - Update the information of a meal option
app.put('/api/v1/meals/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  let mealFound;
  let mealIndex;

  Meals.map((meal, index) => {
    if (meal.id === id) {
      mealFound = meal;
      mealIndex = index;
    }  
  });

  if (!mealFound) {
    return res.status(404).send({
      success: 'false',
      message: 'Meal not found'
    });
  }

  if (!req.body.title || !req.body.description || !req.body.price) {
    return res.status(400).send({
      success: 'false',
      message: 'Please fill out the required fields'
    });
  }

  const updatedMeal = {
    id: mealFound.id,
    title: req.body.title || mealFound.title,
    description: req.body.description || mealFound.description,
    imageUrl: req.body.imageUrl || mealFound.imageUrl,
    price: req.body.price || mealFound.price
  }

  Meals.splice(mealIndex, 1, updatedMeal);

  return res.status(201).send({
    success: 'true',
    message: 'meal updated successfully',
    updatedMeal,
  });
});

//DELETE - Remove a meal option
app.delete('/api/v1/meals/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  Meals.map((meal, index) => {
    if(meal.id === id) {
      Meals.splice(index, 1);
      return res.status(200).send({
        success: 'true',
        message: 'Meal option successfully deleted'
      });
    }
  });

  return res.status(404).send({
    success: 'false',
    message: 'Meal option not found'
  })
});



//MENU


//GET - Get the menu for the day
app.get('/api/v1/menu', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Menu retrieved successfully',
    menu: Menu
  })
});


//POST - Setup the menu for the day
const catererMenu = [];
app.post('/api/v1/menu', (req, res) => {

  const foundInMenu = Menu.find((m) => {
    return m.mealTitle.toLowerCase() === req.body.mealTitle.toLowerCase()
  })

  if(foundInMenu) {
    const foundInCatererMenu = catererMenu.find((m) => {
      return m.mealTitle.toLowerCase() === req.body.mealTitle.toLowerCase()
    })
    
    if(!foundInCatererMenu) {
      catererMenu.push(foundInMenu)
      res.status(201).send({
        success: 'true',
        message: 'Meal successfully added to menu',
        menu: catererMenu
      })
    } else {
      res.status(409).send({
        message: 'Meal already exists'
      })
    }
  } else {
    res.status(404).send({
      message: 'Meal does not exist'
    })
  }
});


// ORDER

//POST - Select Meal option from Menu
const customerOrder = [];
app.post('/api/v1/orders', (req, res) => {

  const orderFound = Menu.find((m) => {
    return m.mealTitle.toLowerCase() === req.body.mealTitle.toLowerCase()
  })

  if(orderFound) {
    const foundCustomerOrder = customerOrder.find((m) => {
      return m.mealTitle.toLowerCase() === req.body.mealTitle.toLowerCase()
    })
    
    if(!foundCustomerOrder) {
      orderFound.orderId = customerOrder.length + 1;
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
});

//GET OREDERS
app.get('/api/v1/orders', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Orders retrieved successfully',
    orders: Orders
  })
});

app.get('/api/v1/orders/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  Orders.map((order) => {
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
});

// PUT - Update the information of a meal option
app.put('/api/v1/orders/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  let orderFound;
  let orderIndex;

  Orders.map((order, index) => {
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
    id: req.body.id || orderFound.id,
    mealTitle: req.body.title || orderFound.title,
    description: req.body.description || orderFound.description,
    price: req.body.price || orderFound.price,
    quantity:  req.body.quantity || orderFound.quantity,
    totalPrice: req.body.totalPrice  || orderFound.totalPrice,
  }

  Meals.splice(orderIndex, 1, updatedOrder);

  return res.status(201).send({
    success: 'true',
    message: 'order updated successfully',
    updatedOrder,
  });
});





const port = 4500;

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});