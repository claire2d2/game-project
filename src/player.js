import Follower from "./follower.js";
/*
* 1 // create Object for player:


*/

class Player {
  constructor(gameContainer, speed) {
    this.gameContainer = gameContainer;
    this.speed = speed;
    this.element = document.getElementById("player");
    this.body = [];
    this.element.classList = "player";
    // this.heading = "right"
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

    switch (direction) {
      case "right":
        this.historicPosition.x = this.position.x;
        this.historicPosition.y = this.position.y;
        this.position.x += this.direction.x * this.speed;
        break;
      case "left":
        this.historicPosition.x = this.position.x;
        this.historicPosition.y = this.position.y;
        this.position.x -= this.direction.x * this.speed;
        break;
      case "top":
        this.historicPosition.y = this.position.y;
        this.historicPosition.x = this.position.x;
        this.position.y -= this.direction.y * this.speed;
        break;
      case "down":
        this.historicPosition.y = this.position.y;
        this.historicPosition.x = this.position.x;
        this.position.y += this.direction.y * this.speed;
        break;
    }
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    // TODO
    if (this.body.length > 0) {
      this.body[0].historicPosition.x = this.body[0].position.x;
      this.body[0].historicPosition.y = this.body[0].position.y;
      this.body[0].position.x = this.historicPosition.x;
      this.body[0].position.y = this.historicPosition.y;
      this.body[0].element.style.left = `${this.body[0].position.x}px`;
      this.body[0].element.style.top = `${this.body[0].position.y}px`;
      for (let i = 1; i < this.body.length - 1; i++) {
        this.body[i].historicPosition = { ...this.body[i].position };
        this.body[i].position = { ...this.body[i - 1].historicPosition };
        this.body[i].element.style.left = `${this.body[i].position.x}px`;
        this.body[i].element.style.top = `${this.body[i].position.y}px`;
      }
    }

    // 0 takes historic position of the player
    // starting from 1, take historic position of element - 1
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

  // method to check whether player is touching an ingredient

  touchElement(element) {
    return (
      this.position.x < element.position.x + 20 &&
      this.position.x + 20 > element.position.x &&
      this.position.y < element.position.y + 20 &&
      this.position.y + 20 > element.position.y
    );
  }

  // method to check whether the player is touching its tail
}

export default Player;
