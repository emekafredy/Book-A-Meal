import models from '../models/';

class Meal {
  static getMeals(request, response) {
    models.Meals.findAll().then((meal) => {
      response.send(meal);
    });
  }

  static addMeal(request, response) {
    const meals = {
      title: request.body.title,
      description: request.body.description,
      imageUrl: request.body.imageUrl,
      price: request.body.price,
    };

    models.Meals.create(meals).then((meal) => {
      response.send(meal);
    });
  }

  static updateMeal(request, response) {
    const id = parseInt(request.params.id, 10);


    models.Meals.findById(id).then((meal) => {
      if (meal) {
        meal.update({
          title: request.body.title || meal.title,
          description: request.body.description || meal.description,
          imageUrl: request.body.imageUrl || meal.imageUrl,
          price: request.body.price || meal.price,
        }).then((updatedMeal) => {
          response.send(updatedMeal);
        });
      }
    });
  }

  static deleteMeal(request, response) {
    const id = parseInt(request.params.id, 10);

    models.Meals.findById(id).then((meal) => {
      if (meal) {
        meal.destroy().then((deletedMeal) => {
          response.send({
            message: 'Deleted successfully',
          });
        });
      }
    });
  }
}

export default Meal;
