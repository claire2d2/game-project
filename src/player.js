/*
* 1 // create Object for player:


*/

class Player {
  constructor(gameContainer, speed) {
    this.gameContainer = gameContainer;
    this.speed = speed;
    this.element = document.getElementById("player");
    this.element.classList = "player";
    this.position = {
      x: this.gameContainer.getBoundingClientRect().width / 2,
      y: this.gameContainer.getBoundingClientRect().height / 2,
    };
    // will be used to register the player's position for followers to take place
    this.historicPosition = {
      x: 0,
      y: 0,
    };
    this.direction = {
      x: 1,
      y: 1,
    };
  }

  // Methods

  // function to move the player according to the arrows
  // Function to move according to the direction
  move(direction) {
    // define element "borders" (to check for collision later on
    // if conditions ensure that ball does not get out of borders (IMPROVE later if possible)
    const playerBoundaries = this.element.getBoundingClientRect();
    const containerBoundaries = this.gameContainer.getBoundingClientRect();

    switch (direction) {
      case "right":
        if (playerBoundaries.right >= containerBoundaries.right) {
          this.position.x -= this.direction.x * this.speed;
        } else {
          this.position.x += this.direction.x * this.speed;
          this.historicPosition.x = this.position.x - 30;
          this.historicPosition.y = this.position.y;
        }
        break;
      case "left":
        if (playerBoundaries.left <= containerBoundaries.left) {
          this.position.x += this.direction.x * this.speed;
        } else {
          this.position.x -= this.direction.x * this.speed;
          this.historicPosition.x = this.position.x + 30;
          this.historicPosition.y = this.position.y;
        }
        break;
      case "top":
        if (playerBoundaries.top <= containerBoundaries.top) {
          this.position.y += this.direction.y * this.speed;
        } else {
          this.position.y -= this.direction.y * this.speed;
          this.historicPosition.y = this.position.y + 30;
          this.historicPosition.x = this.position.x;
        }
        break;
      case "down":
        if (playerBoundaries.bottom >= containerBoundaries.bottom) {
          this.position.y -= this.direction.y * this.speed;
        } else {
          this.position.y += this.direction.y * this.speed;
          this.historicPosition.y = this.position.y - 30;
          this.historicPosition.x = this.position.x;
        }
        break;
    }

    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }

  // function to check whether the player is located at the edges (use getBoundingClientRect())
  touchBorder() {
    const playerBoundaries = this.element.getBoundingClientRect();
    const containerBoundaries = this.gameContainer.getBoundingClientRect();
    // strict comparison so that the game does not end when the player is moving along the edges
    return (
      playerBoundaries.right > containerBoundaries.right ||
      playerBoundaries.left < containerBoundaries.left ||
      playerBoundaries.top < containerBoundaries.top ||
      playerBoundaries.bottom > containerBoundaries.bottom
    );
  }

  // function to check whether player is colliding (use getBoundingClientRect())

  // TODO REVIEW THE CONDITIONS
  touchIngredient(ingredient) {
    const playerBoundaries = this.element.getBoundingClientRect();
    const ingredientBoundaries = ingredient.element.getBoundingClientRect();
    return (
      this.position.x < ingredient.position.x + 30 &&
      this.position.x + 30 > ingredient.position.x &&
      this.position.y < ingredient.position.y + 30 &&
      this.position.y + 30 > ingredient.position.y
    );
    //X-Horizontal check formula :
    // (a.x < (b.x + b.width)) && ((a.x + a.width) > b.x);
    // y-Vertical check formula :
    // (a.y < (b.y+b.height)) && ((a.y + a.height) > b.y);
  }
}

export default Player;
