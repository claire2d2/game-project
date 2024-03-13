import Player from "./player.js";
import Ingredient from "./ingredient.js";
import Follower from "./follower.js";
// import Chronometer from "./chronometer.js";

class Game {
  // ? takes for argument speed (later, if implementing levels)
  constructor() {
    this.gameContainer = document.querySelector(".game-container");
    this.intervalId = null;
    this.gameOn = false;
    this.gameOff = true;
    this.score = 0;
    this.gameSpeed = 30; // 30 = width of player
    this.player = new Player(this.gameContainer, this.gameSpeed);
    this.pauseMessage = document.getElementById("game-paused");
    // calls to create new ingredients (array because more than one ingredient will be called)
    this.ingredients = [];
    // object that contains the different messages to
    this.eatenItems = [];
    this.pointsArray = [];
    this.messages = [];
    this.pressedKeys = {
      right: true,
      left: false,
      top: false,
      down: false,
      space: false,
    };
    this.counter = 1;
  }

  // ! Function to start the game
  startGame() {
    // if game is already running, no need for the rest to follow
    if (this.gameOn) return;

    // make player move according to arrow keys, start game and enable pausing
    this.arrowKeysPressed();
    this.gameOn = true;
    this.gameOff = false;
    this.initiatePause();

    // generate food items randomly, each worth one point
    this.intervalId = setInterval(() => {
      //generate an ingredient ever few seconds
      if (this.counter % 10 === 0) {
        // introduce while loop, while !newIngredient.uniquePosition, remove NewIngredient and generate new const
        const newIngredient = new Ingredient(this.gameContainer);
        let ingredientOverlap =
          this.player.touchElement(newIngredient) ||
          newIngredient.touchOtherIngredient(this.ingredients);
        while (ingredientOverlap) {
          // call out method to generate new coordinates for the ingredient
          newIngredient.uniquePosition();
          ingredientOverlap =
            this.player.touchElement(newIngredient) ||
            newIngredient.touchOtherIngredient(this.ingredients);
        }
        // calling method to determine the type for the ingredient
        newIngredient.generate();
        this.ingredients.push(newIngredient);
      }
      this.counter++;

      // make player and tail move
      for (const direction in this.pressedKeys) {
        if (this.pressedKeys[direction]) {
          this.player.move(direction);
        }
      }

      // make food items eventually disappear
      for (let i = 0; i < [...this.ingredients].length; i++) {
        const currentIngredient = this.ingredients[i];
        currentIngredient.ingredientTimeCount++;
        // ingredients disappear after cooldown
        if (currentIngredient.ingredientTimeCount > 60) {
          currentIngredient.element.remove();
          this.ingredients.splice(i, 1);
          continue;
        }
        // ingredients disappear if touched by player
        if (this.player.touchElement(currentIngredient)) {
          // set conditions for the message to appear on the right
          this.createMessage(
            currentIngredient.generateMessage(currentIngredient.type)
          );

          // depending on ingredients, different nb of followers is generated
          const nbIterations = this.howManyFollowers(currentIngredient.type);

          for (let i = 0; i < nbIterations; i++) {
            this.generateFollower();
          }
          // remove ingredient
          currentIngredient.element.remove();
          // push into an array the points associated to the type of ingredient eaten

          // this.pointsArray.push(
          //   currentIngredient.types[currentIngredient.type].points
          // );
          // push the element into the original array to count how many items have been "eaten"
          this.eatenItems.push(this.ingredients.splice(i, 1));
        }
      }

      // ! If player touches border, end game
      if (this.player.touchBorder()) {
        this.endGame("You left the restaurant! Game over.");
      }
      // ! If player touches tail, end game
      for (let follower of this.player.body) {
        if (this.player.touchElement(follower)) {
          this.endGame("Oops! You made all your plates fall! Game over.");
        }
      }
    }, 100);
  }

  // TODO: function to show the chronometer during the game (and then be able to send how much time at the end)

  // ! Function to end the game
  endGame(message) {
    this.score = this.eatenItems.length;
    // console.log(this.pointsArray);
    clearTimeout(this.intervalId);
    this.gameOn = false;
    this.gameOff = true;
    this.player.element.remove();
    this.emptyArray(this.ingredients);
    this.emptyArray(this.player.body);
    this.eatenItems = [];
    this.pointsArray = [];
    this.createMessage(message);
  }

  emptyArray(array) {
    array.forEach((item) => item.element.remove());
  }

  resetGame() {
    // TODO : reset a whole new game
  }
  // BONUS : generate different food items worth different points

  initiatePause() {
    // const pauseButton = document.getElementById("pause-button");
    // pauseButton.addEventListener("click", () => {
    //   this.pauseGame();
    // });
    document.addEventListener("keydown", (event) => {
      if (event.key == " " && !this.pressedKeys.space && !this.gameOff) {
        this.pressedKeys.space = true;
        if (this.gameOn) {
          this.gameOn = false;
          this.pauseGame();
          this.pauseMessage.hidden = false;
        } else {
          this.startGame();
          console.log("unpausing game");
          this.pauseMessage.hidden = true;
        }
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.key == " ") {
        this.pressedKeys.space = false;
      }
    });
  }
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

  createMessage(content) {
    const messageList = document.getElementById("message-list");
    const li = document.createElement("li");
    li.textContent = content;
    messageList.append(li);
    this.messages.push(li);
    console.log(this.messages);
    if (this.messages.length > 15) {
      this.messages[0].remove();
      this.messages.splice(0, 1);
    }
  }

  howManyFollowers(ingredientType) {
    if (ingredientType === "coriander") {
      this.endGame("Disgusting! The meal is ruined now.");
    } else if (ingredientType === "water") {
      return 2;
    } else if (ingredientType === "ginger") {
      this.player.body.forEach((follower) => {
        follower.element.remove();
      });
      this.player.body = [];
      return 0;
    }
    return 1;
  }

  generateFollower() {
    const position = !this.player.body.length
      ? this.player.historicPosition
      : this.player.body.at(-1).historicPosition;
    const newFollower = new Follower(position);
    this.player.body.push(newFollower);
    newFollower.element.style.left = `${newFollower.position.x}px`;
    newFollower.element.style.top = `${newFollower.position.y}px`;
    this.gameContainer.append(newFollower.element);
  }

  // ! function for listening to the arrow keys being pressed
  // BONUS :
  // tally the score by how much the ingredient is worth
  // add little animation of score appearing
  arrowKeysPressed() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowRight":
          this.pressedKeys = {
            right: true,
            left: false,
            top: false,
            down: false,
          };
          break;
        case "ArrowLeft":
          this.pressedKeys = {
            right: false,
            left: true,
            top: false,
            down: false,
          };
          break;
        case "ArrowUp":
          this.pressedKeys = {
            right: false,
            left: false,
            top: true,
            down: false,
          };
          break;
        case "ArrowDown":
          this.pressedKeys = {
            right: false,
            left: false,
            top: false,
            down: true,
          };
          break;
      }
    });
  }
}

export default Game;
