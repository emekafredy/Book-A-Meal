import moment from 'moment';
import models from '../models';

/**
 * Represents the Menu controller
 * @class
 */
class Menu {
  /**
   * Set Menu for the day
   * @method
   * @param {object} request - Send request to set menu
   * @param {object} response  - Get response
   */
  static setMenu(request, response) {
    const { meals } = request.body;
    const date = new Date();

    return models.Menu.findOne({ where: { date } }).then((menu) => {
      if (menu) {
        return response.status(409).json({ message: `Menu for ${date} already created` });
      }
      return models.Menu.create({ meals, date }).then((createdMenu) => {
        createdMenu.addMeals(meals).then((menus) => {
          const modifiedDate = moment(date).format('ddd, YYYY-MM-DD');
          response.status(201).json({ message: ` Menu for ${modifiedDate} successfully created`, createdMenu });
        }).catch(error => response.status(400).send(error));
      }).catch(error => response.status(400).json(error));
    }).catch(error => response.status(400).json(error));
  }

  /**
   * Get All set Menu
   * @method
   * @param {object} request - Send request to get menu
   * @param {object} response  - Get response
   */
  static getMenu(request, response) {
    const date = moment().format('YYYY-MM-DD');
    return models.Menu.findAll({
      where: { date },
    }).then((menus) => {
      if (menus) {
        const menuTime = moment(menus.createdAt);
        const setExpiration = moment();
        const difference = setExpiration.diff(menuTime, 'h');
        if (difference < 12) {
          return models.Menu.findOne({
            include: [{
              model: models.Meal,
              as: 'meals',
            }],
          }).then((menu) => {
            response.send(menu);
          }).catch((error) => {
            response.status(500).json(error);
          });
        }
        return response.status().json({ message: 'Menu no longer available' });
      }
      return response.send({ message: 'Menu not available yet' });
    });
  }
}

export default Menu;
