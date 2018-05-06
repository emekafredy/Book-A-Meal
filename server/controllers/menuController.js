import models from '../models';

class Menu {
  static setMenu(request, response) {
    const menuObject = {
      name: request.body.name,
      date: new Date(),
    };
    models.Menu.create(menuObject).then((menu) => {
      response.send(menu);
    });
  }

  static getMenu(request, response) {
    models.Menu.findAll().then((menu) => {
      response.send(menu);
    });
  }

  static getByMenuId(request, response) {
    models.Menu.findById(request.params.id).then((menu) => {
      if (menu) {
        response.send(menu);
      } else {
        response.status(404).send({ message: 'Menu not found' });
      }
    });
  }
}

export default Menu;
