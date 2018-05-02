import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes';




// Set up the express app
const app = express();
const port = process.env.PORT || 4500;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('UI'));



router(app);

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});

export default app;
