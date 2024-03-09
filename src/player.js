/*
* 1 // create Object for player:


*/

class Player {
  constructor(gameContainer, speed) {
    this.gameContainer = gameContainer;
<<<<<<< HEAD
    this.speed = speed;
=======
>>>>>>> 35d9c50f4abc928dd422d2ff16422767bf05eb05
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
<<<<<<< HEAD
          this.position.x -= this.direction.x * this.speed;
        } else {
          this.position.x += this.direction.x * this.speed;
=======
          this.position.x--;
        } else {
          this.position.x++;
>>>>>>> 35d9c50f4abc928dd422d2ff16422767bf05eb05
        }
        break;
      case "left":
        if (playerBoundaries.left <= containerBoundaries.left) {
<<<<<<< HEAD
          this.position.x += this.direction.x * this.speed;
        } else {
          this.position.x -= this.direction.x * this.speed;
=======
          this.position.x++;
        } else {
          this.position.x--;
>>>>>>> 35d9c50f4abc928dd422d2ff16422767bf05eb05
        }
        break;
      case "top":
        if (playerBoundaries.top <= containerBoundaries.top) {
<<<<<<< HEAD
          this.position.y += this.direction.y * this.speed;
        } else {
          this.position.y -= this.direction.y * this.speed;
=======
          this.position.y++;
        } else {
          this.position.y--;
>>>>>>> 35d9c50f4abc928dd422d2ff16422767bf05eb05
        }
        break;
      case "down":
        if (playerBoundaries.bottom >= containerBoundaries.bottom) {
<<<<<<< HEAD
          this.position.y -= this.direction.y * this.speed;
        } else {
          this.position.y += this.direction.y * this.speed;
=======
          this.position.y--;
        } else {
          this.position.y++;
>>>>>>> 35d9c50f4abc928dd422d2ff16422767bf05eb05
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
