import Meals from '../data/meals';

const catererMenu = [];

class Menu {
  setMenu(request, response) {
    
    const foundInMenu = Meals.find((m) => {
      return m.title.toLowerCase() === request.body.title.toLowerCase()
    })
  
    if(foundInMenu) {
      const foundInCatererMenu = catererMenu.find((m) => {
        return m.title.toLowerCase() === request.body.title.toLowerCase()
      })
      
      if(!foundInCatererMenu) {
        catererMenu.push(foundInMenu)
        response.status(201).send({
          message: 'Meal successfully added to menu',
          menu: catererMenu
        })
      } 
    } 
    
      response.status(409).send({
        message: 'Meal already exists'
      })
  }

  getMenu(request, response) {
    if (catererMenu.length == 0) {
      response.status(404).send({
        message: 'Menu Box is empty please add meals to menu'
      })
    }
    response.status(200).send({
      message: 'Menu retrieved successfully',
      menu: catererMenu
    })
  }

}


export default Menu;