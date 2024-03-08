import Player from "./player.js";
// import Ingredient from "./ingredient";
// import Food from "./platedFood";

/*

METHODS :
- look at method example (attach event listeners)
- start game 
    if running, return
- get score
- pause game (rules reappear during game)


EXPORT
*/
class Game {
  // takes for argument speed (later, if implementing levels)
  constructor() {
    this.gameContainer = document.querySelector(".game-container");
    this.intervalId = null;
    this.gameOn = false;
    this.score = 0;
    this.gameSpeed = 1;
    this.player = new Player(this.gameContainer);
    // this.ingredients = new Ingredient(this.gameContainer);
    // this.platedFoods = new platedFood(this.gameContainer);
    this.pressedKeys = {
      right: false,
      left: false,
      top: false,
      down: false,
    };
  }

  // put methods here
  startGame() {
    console.log("test");
    // if game is already running, no need for the rest to follow
    if (this.gameOn) return;

    // make player move according to arrow keys
    this.arrowKeysPressed();

    console.log(this.pressedKeys);

    this.gameOn = true;
    // generate food items randomly, each worth one point
    this.intervalId = setInterval(() => {
      //generate foooood
      for (const direction in this.pressedKeys) {
        if (this.pressedKeys[direction]) {
          this.player.move(direction);
        }
      }
    });
    // BONUS : generate different food items worth different points
  }

  takeIngredient() {
    // function for when the player "hits" an ingredient
    // tally the score by one
    // makes ingredient disappear
    // BONUS :
    // tally the score by how much the ingredient is worth
    // add little animation of score appearing
  }

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
