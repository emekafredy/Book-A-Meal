import Menu from '../data/menu';

const catererMenu = [];
const MenuController = {

  setMenu(req, res) {
    
    const foundInMenu = Menu.find((m) => {
      return m.mealTitle.toLowerCase() === req.body.mealTitle.toLowerCase()
    })
  
    if(foundInMenu) {
      const foundInCatererMenu = catererMenu.find((m) => {
        return m.mealTitle.toLowerCase() === req.body.mealTitle.toLowerCase()
      })
      
      if(!foundInCatererMenu) {
        catererMenu.push(foundInMenu)
        res.status(201).send({
          success: 'true',
          message: 'Meal successfully added to menu',
          menu: catererMenu
        })
      } else {
        res.status(409).send({
          message: 'Meal already exists'
        })
      }
    } else {
      res.status(404).send({
        message: 'Meal does not exist'
      })
    }
  },

  getMenu(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'Menu retrieved successfully',
      menu: catererMenu
    })
  }

}

export default MenuController;