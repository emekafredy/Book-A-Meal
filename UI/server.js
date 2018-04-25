import express from 'express';


import db from './database/meals';

// Set up the express app
const app = express();


//MEALS

// GET all the meal options
app.get('/api/v1/meals', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'meals retrieved successfully',
    todos: db
  })
});





const port = 4500;

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});