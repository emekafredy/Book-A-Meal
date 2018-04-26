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




const port = 4500;

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});