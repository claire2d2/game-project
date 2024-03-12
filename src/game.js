import Player from "./player.js";
import Ingredient from "./ingredient.js";
import Follower from "./follower.js";

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
    this.gameSpeed = 20;
    this.player = new Player(this.gameContainer, this.gameSpeed);
    // calls to create new ingredients (array because more than one ingredient will be called)
    this.ingredients = [];
    // object that contains the different messages to show
    this.messages = {
      water:
        "Uh-oh that was not strategic. You have less space in your stomach and gained 0 points!",
      ginger: "Way to go! +10 points and your palate is refreshed!",
      bokchoi: "Yum! +5 points",
    };
    this.eatenItems = [];
    this.pointsArray = [];
    this.pressedKeys = {
      right: true,
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
      if (this.counter % 10 === 0) {
        console.log(this.player.element.getBoundingClientRect());
        this.counter = 0;

        // introduce while loop, while !newIngredient.uniquePosition, remove NewIngredient and generate new const
        const newIngredient = new Ingredient(this.gameContainer);
        while (
          this.player.touchElement(newIngredient) ||
          newIngredient.touchOtherIngredient(this.ingredients)
        ) {
          if (
            !(
              this.player.touchElement(newIngredient) ||
              newIngredient.touchOtherIngredient(this.ingredients)
            )
          ) {
            break;
          }
          // call out method to generate new coordinates for the ingredient
          newIngredient.uniquePosition();
        }
        newIngredient.style();
        // calling method to determine the type for the ingredient
        newIngredient.whichIngredient();
        newIngredient.element.classList.add(newIngredient.type);
        this.ingredients.push(newIngredient);
      }
      this.counter++;

      // make player move
      for (const direction in this.pressedKeys) {
        if (this.pressedKeys[direction]) {
          this.player.move(direction);
        }
      }

      // ! make food items eventually disappear
      for (let i = 0; i < [...this.ingredients].length; i++) {
        const currentIngredient = this.ingredients[i];
        currentIngredient.ingredientTimeCount++;
        // ingredients disappear after cooldown
        if (currentIngredient.ingredientTimeCount > 60) {
          currentIngredient.element.remove();
          this.ingredients.splice(i, 1);
          continue;
        }
        if (this.player.touchElement(currentIngredient)) {
          // set conditions for the message to appear on the right
          const messageList = document.getElementById("message-list");
          const li = document.createElement("li");
          messageList.append(li);
          //! If plater touches coriander, end game
          if (currentIngredient.type == "coriander") {
            console.log("Ugh, coriander ...");
            this.endGame();
          }

          let nbIterations = 1;

          // ! If ingredient is water, repeat 3 times
          if (currentIngredient.type === "water") {
            nbIterations = 3;

            li.textContent = this.messages.water;
            // TODO : add message
          } else if (currentIngredient.type === "ginger") {
            nbIterations = 0;
            //TEST
            li.textContent = this.messages.ginger;
          } else if (currentIngredient.type === "bokchoi") {
            li.textContent = this.messages.bokchoi;
          }
          for (let i = 0; i < nbIterations; i++) {
            // ! insert a new follower (make into a function?)
            const position = !this.player.body.length
              ? this.player.historicPosition
              : this.player.body.at(-1).historicPosition;
            const newFollower = new Follower(this.gameContainer, position);
            this.player.body.push(newFollower);
          }

          // ! If ingredient is ginger, reset
          if (currentIngredient.type == "ginger") {
            for (let i = 0; i < this.player.body.length - 1; i++) {
              this.player.body[i].element.remove();
            }
            this.player.body = [];
          }
          currentIngredient.element.remove();
          // push into an array the points associated to the type of ingredient eaten
          console.log(currentIngredient.type);
          this.pointsArray.push(
            currentIngredient.points[currentIngredient.type]
          );
          // push the element into the original array to count how many items have been "eaten"
          this.eatenItems.push(this.ingredients.splice(i, 1));
        }
      }

      // ! If player touches border, end game
      if (this.player.touchBorder()) {
        console.log("player touched border");
        this.endGame();
      }
      // ! If player touches tail, end game
      for (let follower of this.player.body) {
        if (this.player.touchElement(follower)) {
          console.log("player touched tail");
          this.endGame();
        }
      }

      // TODO permit to restart game when reclicking on the pause button
      const pauseButton = document.getElementById("pause-button");
      pauseButton.addEventListener("click", () => {
        this.pauseGame();
      });
    }, 100);

    // ? BONUS : generate different food items worth different points
  }

  // TODO: function to show the chronometer during the game (and then be able to send how much time at the end)

  // ! Function to end the game

  endGame() {
    console.log(this.eatenItems);
    this.score = this.eatenItems.length;
    console.log("Nb eaten: ", this.score);
    console.log(this.pointsArray);
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
    this.gameOn = false;
  }

  takeIngredient() {
    // function for when the player "hits" an ingredient
    // tally the score by one
    // makes ingredient disappear
    // ? BONUS :
    // ? tally the score by how much the ingredient is worth
    // ? add little animation of score appearing
  }

  // condition check whether food items generated coordinates are overlapping

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
