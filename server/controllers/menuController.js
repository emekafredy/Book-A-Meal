import meals from '../data/meals';
import menu from '../data/menu';

class Menu {
  static setMenu(request, response) {
    const foundInMeal = meals.find(meal => meal.title === request.body.title);

    if (foundInMeal) {
      const foundInMenu = menu.find(meal => meal.title === request.body.title);

      if (!foundInMenu) {
        menu.push(foundInMeal);
        response.status(201).send({
          message: 'Meal successfully added to menu',
          menu,
        });
      }
    }

    response.status(409).send({
      message: 'Meal already exists',
    });
  }

  static getMenu(request, response) {
    if (menu.length === 0) {
      response.status(404).send({
        message: 'Menu Box is empty please add meals to menu',
      });
    }
    response.status(200).send({
      message: 'Menu retrieved successfully',
      menu,
    });
  }
}

export default Menu;
