import models from '../models/';
/**
 * Represents the Meals controller
 * @class
 */
class Meal {
  /**
   * Get Meals from the database
   * @method
   * @param {object} request - Send request to get meals
   * @param {object} response  - Get response
   */
  static getMeals(request, response) {
    models.Meal.findAll().then((meal) => {
      response.send(meal);
    }).catch((error) => {
      response.status(400).json(error);
    });
  }

  /**
   * Validate entry for meals
   * @method
   */
  static validate(request, response) {
    let isValid = true;
    const errors = {};

    if (!request.body.title) {
      errors.title = 'Add a title';
      isValid = false;
    }

    if (!request.body.description) {
      errors.description = 'Add a description';
      isValid = false;
    }

    if (!request.body.price) {
      errors.price = 'Add a price';
      isValid = false;
    }

    if (request.body.price && Number.isNaN(request.body.price)) {
      errors.price = 'Price is not a number';
      isValid = false;
    }

    if (isValid) {
      return isValid;
    }

    return response.status(500).json(errors);
  }

  /**
   * Add a meal to the table
   * @method
   * @param {object} request - Send request to add meal
   * @param {object} response  - Get response
   */
  static addMeal(request, response) {
    const meals = {
      title: request.body.title,
      description: request.body.description,
      imageUrl: request.body.imageUrl,
      price: request.body.price,
    };

    if (Meal.validate(request, response)) {
      return models.Meal.findOne({ where: { title: request.body.title } }).then((foundMeal) => {
        if (foundMeal) {
          return response.status(409).json({
            message: 'Meal already exists, check the meals list',
          });
        }
        return models.Meal.create(meals)
          .then(meal => response.send(meal))
          .catch((error) => {
            response.status(500).json(error);
          });
      }).catch(error => response.status(400).json(error));
    }

    return null;
  }

  /**
   * Update an existing meal
   * @method
   * @param {object} request - Send request for meal update
   * @param {object} response  - Get response
   * @param {number} id - ID of meal to be updated
   */
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

  /**
   * Remove meal from the table
   * @method
   * @param {object} request - Send request to delete a meal
   * @param {object} response  - Get response
   * @param {number} id - ID of meal to be deleted
   */
  static deleteMeal(request, response) {
    const id = parseInt(request.params.id, 10);

    models.Meal.findById(id).then((meal) => {
      if (meal) {
        meal.destroy().then((deletedMeal) => {
          response.status(201).json({
            message: 'Deleted successfully',
          }).catch((error) => {
            response.status(500).json(error);
          });
        }).catch((error) => {
          response.status(500).json(error);
        });
      } else {
        response.status(404).json({
          message: 'Meal does not exist',
        });
      }
    });
  }
}

export default Meal;
