import models from '../models';

class Menu {
  static setMenu(request, response) {
    const { mealId } = request.body;

    if (!mealId) {
      return response.status(400).send({ message: 'Enter a meal ID' });
    }

    return models.Meals.findById(mealId).then((meal) => {
      if (meal) {
        models.Menu.create({ mealId }).then((mealMenu) => {
          response.send(mealMenu);
        });
      } else {
        response.status(404).send({ message: 'Meal not found' });
      }
    });
  }

  static getMenu(request, response) {
    console.log('user', request.user);

    models.Menu.findAll({
      include: [{
        model: models.Meals,
        // as: 'meal',
      }],
    }).then((menu) => {
      response.send(menu);
    });
  }
}

export default Menu;
