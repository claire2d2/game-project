import Player from "./player.js";
import Ingredient from "./ingredient.js";
import PlatedFood from "./platedFood.js";

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
    this.gameSpeed = 3;
    this.player = new Player(this.gameContainer, this.gameSpeed);
    // calls to create new ingredients (array because more than one ingredient will be called)
    this.ingredients = [];
    this.platedFoods = [];
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

      // make tail follow player

      // const follower = new PlatedFood(this.gameContainer);
      // follower.element.style.left = `${this.player.historicPosition.x}px`;
      // follower.element.style.top = `${this.player.historicPosition.y}px`;

      // ! Loop for when condition for touching items will be created
      // for (let i = 0; i < this.platedFoods.length; i++) {
      //   platedFoods[
      //     i
      //   ].element.style.left = `${this.player.historicPosition.x}px`;
      //   platedFoods[
      //     i
      //   ].element.style.top = `${this.player.historicPosition.y}px`;
      //   console.log(plateFoods[i]);
      // }

      // ! make food items eventually disappear
      for (const ingredient of this.ingredients) {
        if (this.player.touchIngredient(ingredient)) {
          console.log("removed!");
          ingredient.element.remove();
        }
        // increment ingredient timer by one every second
        ingredient.ingredientTimeCount++;
        // verify if item touches ingredient

        // if cooldown is over, ingredient is eliminated
        ingredient.status();
      }

      // Test

      //TODO : creation of tail

      // logic: if player takes item, player takes places of item, and new item takes place of player
      // when player moves, last item fills the gap just behind the player

      // TODO : if player hits item then

      // const newFollower = new PlatedFood(this.gameContainer, this.speed);
      // this.platedFoods.push(newFollower);

      //  // ? TEST for making a follower behind the player

      //  // ? END OF TEST
      // function to check whether the player is touching the border
      if (this.player.touchBorder()) {
        this.endGame();
      }

      // TODO pauses game if pause button is clicked
      //   const pauseButton = document.getElementById("pause-button");
      //   pauseButton.addEventListener("click", () => {
      //     this.pauseGame();
      // });
    }, 1000 / 60);

    // ? BONUS : generate different food items worth different points
  }

  // TODO: function to show the chronometer during the game (and then be able to send how much time at the end)

  // ! Function to end the game

  endGame() {
    this.score = this.intervalId;
    console.log(this.score);
    clearTimeout(this.intervalId);
    // this.gameOn = false;
    // this.intervalId = null;
    // game over if player touches border
  }

  resetGame() {
    // TODO : reset a whole new game
  }
  // BONUS : generate different food items worth different points

  pauseGame() {
    // TODO find a method to restart the game without resetting
    clearTimeout(this.intervalId);
  }

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
