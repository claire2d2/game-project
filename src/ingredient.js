/* 2 // Create CLASS for food item

takes for argument:
- game container

and has :
- class for element : food item
- another class for that element : which food item
- position (x,y)

METHODS :
- randomize how many items appear
- randomize the position at which item appears
- make item appear on the container in an unoccupied space
- randomize which item appears
- how long the food item appears for

*/

// export

class Ingredient {
  constructor(gameContainer) {
    this.gameContainer = gameContainer;
    // create ingredient to make appear
    this.element = document.createElement("div");
    // add "ingredient" class to be able to style it in css
    this.element.classList.add("ingredient");
    // append ingredient to game container
    this.gameContainer.append(this.element);
    // generate random position (add condition of other elements not existing in the place in Game method)
    this.position = {
      x: Math.random() * this.gameContainer.getBoundingClientRect().width,
      y: Math.random() * this.gameContainer.getBoundingClientRect().height,
    };
    // the higher the value of the ingredient key is, the more chance there is of the ingredient appearing
    this.category = {
      bokchoi: 10,
      coriander: 1,
    };
    this.ingredientTimeCount = 1;
    this.ingredientTimer = null;
  }

  // randomize if one or two items appear

  status() {
    // makes element disappear after a certain time
    if (this.ingredientTimeCount > 420) {
      this.element.remove();
    }

    // check whether the ingredient has been taken by the player
    // ingredientTaken() {}
  }
  // check whether the ingredient has been there for more than a given amount of seconds (here, 4)
  ingredientCoolDown() {
    //to define
  }
}
export default Ingredient;
