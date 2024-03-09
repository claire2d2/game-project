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
        }
        break;
      case "left":
        if (playerBoundaries.left <= containerBoundaries.left) {
          this.position.x += this.direction.x * this.speed;
        } else {
          this.position.x -= this.direction.x * this.speed;
        }
        break;
      case "top":
        if (playerBoundaries.top <= containerBoundaries.top) {
          this.position.y += this.direction.y * this.speed;
        } else {
          this.position.y -= this.direction.y * this.speed;
        }
        break;
      case "down":
        if (playerBoundaries.bottom >= containerBoundaries.bottom) {
          this.position.y -= this.direction.y * this.speed;
        } else {
          this.position.y += this.direction.y * this.speed;
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
}

export default Player;
