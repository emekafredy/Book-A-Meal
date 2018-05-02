import Meals from '../data/meals';

class Meal {

  getMeals(request, response) {
    response.status(200).send({
      message: 'Meals retrieved successfully',
      Meals
    })
  }

  addMeal(request, response) {

    const meal = {
      id: Meals.length + 1,
      title: request.body.title,
      description: request.body.description,
      imageUrl: request.body.imageUrl,
      price: request.body.price
    }

    if(!request.body.title || !request.body.description || !request.body.price) {
      return response.status(400).send({
        message: 'Please fill out the required fields'
      });
    }
    
    Meals.push(meal);
    return response.status(201).send({
      message: 'Meal successfully added',
      meal
    });
  }

  updateMeal(request, response) {
    const id = parseInt(request.params.id, 10);

    let mealFound;
    let mealIndex;

    

    Meals.map((meal, index) => {
      if (meal.id === id) {
        mealFound = meal;
        mealIndex = index;
      }  
    });

    if (!request.body.title || !request.body.description || !request.body.price) {
      return response.status(400).send({
        message: 'Please fill out the required fields'
      });
    }

    const updatedMeal = {
      id: mealFound.id,
      title: request.body.title || mealFound.title,
      description: request.body.description || mealFound.description,
      imageUrl: request.body.imageUrl || mealFound.imageUrl,
      price: request.body.price || mealFound.price
    }

    

    Meals.splice(mealIndex, 1, updatedMeal);

    return response.status(201).send({
      message: 'meal updated successfully',
      updatedMeal,
    });
  }

  deleteMeal(request, response) {
    const id = parseInt(request.params.id, 10);
    Meals.map((meal, index) => {
      if(meal.id === id) {
        Meals.splice(index, 1);
        return response.status(200).send({
          message: 'Meal option successfully deleted'
        });
      }
    });

    return response.status(404).send({
      message: 'Meal option not found'
    })
  }

}



export default Meal;