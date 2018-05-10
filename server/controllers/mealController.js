import models from '../models/';

class Meal {
  static getMeals(request, response) {
    models.Meal.findAll().then((meal) => {
      response.send(meal);
    }).catch((error) => {
      response.status(500).json({ message: 'Bad request' });
    });
  }

  static addMeal(request, response) {
    const meals = {
      title: request.body.title,
      description: request.body.description,
      imageUrl: request.body.imageUrl,
      price: request.body.price,
    };

    return models.Meal.findOne({ where: { title: request.body.title } }).then((foundMeal) => {
      if (foundMeal) {
        response.status(409).json({
          message: 'Meal already exists, check the meals list',
        });
      } else {
        models.Meal.create(meals).then((meal) => {
          response.send(meal);
        }).catch((error) => {
          response.status(500).json({ message: 'Bad request' });
        });
      }
    }).catch((error) => {
      response.status(500).json({ message: 'Bad request' });
    });
  }

  static updateMeal(request, response) {
    const id = parseInt(request.params.id, 10);


    models.Meal.findById(id).then((meal) => {
      if (meal) {
        meal.update({
          title: request.body.title || meal.title,
          description: request.body.description || meal.description,
          imageUrl: request.body.imageUrl || meal.imageUrl,
          price: request.body.price || meal.price,
        }).then((updatedMeal) => {
          response.send(updatedMeal);
        }).catch((error) => {
          response.status(500).json({ message: 'Bad request' });
        });
      }
    }).catch((error) => {
      response.status(500).json({ message: 'Bad request' });
    });
  }

  static deleteMeal(request, response) {
    const id = parseInt(request.params.id, 10);

    models.Meals.findById(id).then((meal) => {
      if (meal) {
        meal.destroy().then((deletedMeal) => {
          response.status(201).json({
            message: 'Deleted successfully',
          }).catch((error) => {
            response.status(500).json({ message: 'Bad request' });
          });
        }).catch((error) => {
          response.status(500).json({ message: 'Bad request' });
        });
      } else {
        response.status(404).json({
          message: `Meal with id ${id} does not exist`,
        });
      }
    });
  }
}

export default Meal;
