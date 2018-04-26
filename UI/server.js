import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes';




// Set up the express app
const app = express();
const port = process.env.PORT || 4500;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



router(app);

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});

export default app;


// // ORDER


// //GET OREDERS

// // PUT - Update the information of a meal option
// app.put('/api/v1/orders/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);

//   let orderFound;
//   let orderIndex;

//   Orders.map((order, index) => {
//     if (order.id === id) {
//       orderFound = order;
//       orderIndex = index;
//     }  
//   });

//   if (!orderFound) {
//     return res.status(404).send({
//       success: 'false',
//       message: 'Order not found'
//     });
//   }

//   if (!req.body.quantity) {
//     return res.status(400).send({
//       success: 'false',
//       message: 'Please enter an appropriate quantity'
//     });
//   }

//   const updatedOrder = {
//     id: req.body.id || orderFound.id,
//     mealTitle: req.body.title || orderFound.title,
//     description: req.body.description || orderFound.description,
//     price: req.body.price || orderFound.price,
//     quantity:  req.body.quantity || orderFound.quantity,
//     totalPrice: req.body.totalPrice  || orderFound.totalPrice,
//   }

//   Meals.splice(orderIndex, 1, updatedOrder);

//   return res.status(201).send({
//     success: 'true',
//     message: 'order updated successfully',
//     updatedOrder,
//   });
// });
