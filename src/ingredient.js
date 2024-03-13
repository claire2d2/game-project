class Ingredient {
  constructor(gameContainer, corianderDifficulty) {
    this.gameContainer = gameContainer;
    this.corianderDifficulty = corianderDifficulty;
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
        name: "bok choi",
        probability: 10,
        points: 2,
        messageType: "positive",
      },
      tofu: {
        name: "tofu",
        probability: 8,
        points: 3,
        messageType: "positive",
      },
      pepper: {
        name: "chili pepper",
        probability: 2,
        points: 10,
        messageType: "hot",
      },
      meat: {
        name: "a slice of beef",
        probability: 5,
        points: 5,
        messageType: "positive",
      },
      water: {
        name: "a glass of water",
        probability: 5,
        points: 0,
        messageType: "negative",
      },
      ginger: {
        name: "some ginger",
        probability: 2,
        points: 20,
        messageType: "hot",
      },
      coriander: {
        name: "coriander",
        probability: this.corianderDifficulty,
        points: -5,
        messageType: "negative",
      },
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

  generateMessage(type) {
    // generate start and ending of message based on whether ingredient taken was good or bad
    const mood = this.types[type].messageType;
    const messageStarts = {
      positive: ["Yum!", "Super!", "Way to go!"],
      negative: ["Uh oh...", "Why would you do that?", "Oh no..."],
      hot: ["YEAH!", "Incredible!", "ON FIRE!", "Whoop whoop!"],
    };
    const messageStart = this.randomMessagePart(messageStarts[mood]);

    let punctuation = ".";
    switch (mood) {
      case "positive":
        punctuation = "!";
        break;
      case "negative":
        punctuation = "...";
        break;
      case "hot":
        punctuation = "!!!!";
        break;
    }

    // show what ingredient was taken
    const ingr = this.types[type].name;
    const ingrOptions = [
      `You got ${ingr}: `,
      `Seems like ${ingr}; `,
      `${ingr.charAt(0).toUpperCase() + ingr.slice(1)}: `,
    ];
    const ingredient = this.randomMessagePart(ingrOptions);

    // show how many points
    const pts = this.types[type].points;
    const ptsOptions = [`you won ${pts}`, `+${pts}`];
    const pointsWon = this.randomMessagePart(ptsOptions);

    return `${messageStart} ${ingredient} ${pointsWon}pts${punctuation}`;
  }

  randomMessagePart(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

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
      Math.random() * this.gameContainer.getBoundingClientRect().width - 30;
    this.position.y =
      Math.random() * this.gameContainer.getBoundingClientRect().height - 30;
  }
}
export default Ingredient;
