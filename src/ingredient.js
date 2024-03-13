import { randomIndex } from "../math.js";

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
      x:
        Math.random() * (this.gameContainer.getBoundingClientRect().width - 30),
      y:
        Math.random() *
        (this.gameContainer.getBoundingClientRect().height - 30),
    };
    this.type = null;
    this.types = {
      bokchoi: {
        probability: 10,
        points: 2,
        message: ["Yum! You got bokchoi! +5 pts", "Bokchoi! +5 pts"],
      },
      pepper: {
        probability: 2,
        points: 10,
        message: ["HOT! +10 points!!", "Incredible! Take 10 pts for pepper."],
      },
      meat: {
        probability: 5,
        points: 5,
        message: ["Yum! You got meat! + 5pts"],
      },
      water: {
        probability: 5,
        points: 0,
        message: [
          "Eh ... at least you're hydrated. +0pts",
          "That wasn't strategic ...",
        ],
      },
      ginger: {
        probability: 1,
        points: 20,
        message: ["JACKPOT!", "Way to go! Your palate is refreshed"],
      },
      coriander: { probability: 2, points: 0, message: ["Ugh... coriander"] },
    };
    this.ingredientTimeCount = 1;
    this.ingredientTimer = null;
  }

  status() {
    // makes element disappear after a certain time
    if (this.ingredientTimeCount > 420) {
      this.element.remove();
    }

    // check whether the ingredient has been taken by the player
    // ingredientTaken() {}
  }

  // TODO randomize if one or two items appear

  generate() {
    // randomize which ingredient appears
    const probArr = Object.keys(this.types).reduce((acc, ingredient) => {
      for (let i = 0; i < this.types[ingredient].probability; i++) {
        acc.push(ingredient);
      }
      return acc;
    }, []);
    const randomIndex = Math.floor(Math.random() * probArr.length);
    const randomIngredient = probArr[randomIndex];
    this.type = randomIngredient;
    // position and style ingredient
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
    this.element.classList.add(this.type);
  }

  // generateMessage(type, li) {
  //   const messageArray = this.types[type].message;
  //   li.textContent = messageArray[randomIndex(messageArray)];
  // }

  touchOtherIngredient(arrayOfOtherIngredient) {
    for (let otherIngredient of arrayOfOtherIngredient) {
      if (
        this.position.x < otherIngredient.position.x + 30 &&
        this.position.x + 30 > otherIngredient.position.x &&
        this.position.y < otherIngredient.position.y + 30 &&
        this.position.y + 30 > otherIngredient.position.y
      )
        return true;
    }
    return false;
  }

  uniquePosition() {
    this.position.x =
      Math.random() * (this.gameContainer.getBoundingClientRect().width - 30);
    this.position.y =
      Math.random() * (this.gameContainer.getBoundingClientRect().height - 30);
  }

  style() {
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }
}
export default Ingredient;
