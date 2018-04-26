import express from 'express';
import bodyParser from 'body-parser';

import Meals from './database/meals';

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
    todos: Meals
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


const port = 4500;

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});