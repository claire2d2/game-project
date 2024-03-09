import Player from "./player.js";
import Ingredient from "./ingredient.js";
// import Food from "./platedFood";

/*

METHODS :
- look at method example (attach event listeners)
- start game 
    if running, return
- get score
- pause game (rules reappear during game)
*/
class Game {
  // takes for argument speed (later, if implementing levels)
  constructor() {
    this.gameContainer = document.querySelector(".game-container");
    this.intervalId = null;
    this.gameOn = false;
    this.score = 0;
    this.chronometer = 0;
    this.gameSpeed = 3;
    this.player = new Player(this.gameContainer, this.gameSpeed);
    // calls to create new ingredients (array because more than one ingredient will be called)
    this.ingredients = [];
    // this.ingredients = new Ingredient(this.gameContainer);
    // this.platedFoods = new platedFood(this.gameContainer);
    this.pressedKeys = {
      right: false,
      left: false,
      top: false,
      down: false,
    };
    this.counter = 1;
  }

  /* 
  METHODS
  */

  // ! Function to start the game

  // put methods here
  startGame() {
    console.log("test");
    // if game is already running, no need for the rest to follow
    if (this.gameOn) return;

    // make player move according to arrow keys
    this.arrowKeysPressed();

    this.gameOn = true;
    // generate food items randomly, each worth one point
    this.intervalId = setInterval(() => {
      //generate an ingredient ever 10 seconds
      if (this.counter % 60 === 0) {
        this.counter = 0;
        const newIngredient = new Ingredient(this.gameContainer);
        newIngredient.element.style.left = `${newIngredient.position.x}px`;
        newIngredient.element.style.top = `${newIngredient.position.y}px`;
        this.ingredients.push(newIngredient);
        // start ingredient cooldown
      }
      this.counter++;
      // generate food items randomly, each worth one point
      for (const direction in this.pressedKeys) {
        if (this.pressedKeys[direction]) {
          this.player.move(direction);
        }
      }
      // make element eventually disappear
      for (const ingredient of this.ingredients) {
        // increment ingredient timer by one every second
        ingredient.ingredientTimeCount++;
        // if cooldown is over, ingredient is eliminated
        ingredient.status();
      }
      if (this.player.touchBorder()) {
        this.endGame();
      }
    }, 1000 / 60);

    // TODO: test function to check whether the player is touching the border

    // BONUS : generate different food items worth different points
  }

  // function to show the chronometer during the game (and then be able to send how much time at the end)
  chronometer() {}

  // ! Function to end the game

  endGame() {
    console.log("you lost!");
    this.score = this.intervalId;
    console.log(this.score);
    clearTimeout(this.intervalId);
    // this.gameOn = false;
    // this.intervalId = null;
    // game over if player touches border
  }

  resetGame() {}
  // BONUS : generate different food items worth different points

  takeIngredient() {
    // function for when the player "hits" an ingredient
    // tally the score by one
    // makes ingredient disappear
    // ? BONUS :
    // ? tally the score by how much the ingredient is worth
    // ? add little animation of score appearing
  }

  // ! function for listening to the arrow keys being pressed
  // BONUS :
  // tally the score by how much the ingredient is worth
  // add little animation of score appearing

  // function for listening to the arrow keys being pressed
  // only one key can be pressed at the same time
  arrowKeysPressed() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowRight":
          this.pressedKeys.right = true;
          this.pressedKeys.left = false;
          this.pressedKeys.top = false;
          this.pressedKeys.down = false;
          break;
        case "ArrowLeft":
          this.pressedKeys.left = true;
          this.pressedKeys.right = false;
          this.pressedKeys.top = false;
          this.pressedKeys.down = false;
          break;
        case "ArrowUp":
          this.pressedKeys.top = true;
          this.pressedKeys.left = false;
          this.pressedKeys.right = false;
          this.pressedKeys.down = false;
          break;
        case "ArrowDown":
          this.pressedKeys.down = true;
          this.pressedKeys.left = false;
          this.pressedKeys.top = false;
          this.pressedKeys.right = false;
          break;
      }
    });
  }
}

export default Game;
