import models from '../models';

class Menu {
  static setMenu(request, response) {
    const { title, isCurrent, meals } = request.body;
    const date = new Date();

    models.Menu.findOne({ where: { title: request.body.title } }).then((menuTitle) => {
      if (menuTitle) {
        response.json({ message: `${title} already created` });
      } else {
        models.Menu.create({ title, isCurrent, date }).then((createdMenu) => {
          createdMenu.addMeals(meals).then((menus) => {
            response.status(500).json({ message: 'Bad request' });
          });
        }).catch((error) => {
          response.status(500).json({ message: 'Bad request' });
        });
      }
    }).catch((error) => {
      response.status(500).json({ message: 'Bad request' });
    });
  }

  static getMenu(request, response) {
    models.Menu.findAll({
      include: [{
        model: models.Meal,
        as: 'meals',
      }],
    }).then((menu) => {
      response.send(menu);
    }).catch((error) => {
      response.status(500).json({ message: 'Bad request' });
    });
  }
}

export default Menu;
