/*
* 1 // create Object for player:


*/

class Player {
  constructor(gameContainer, speed) {
    (this.gameContainer = gameContainer), (this.speed = speed);
    this.element = document.getElementById("player");
    this.element.classList = "player";
    this.position = {
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
  move() {}

  // function to check whether the player is located at the edges (use getBoundingClientRect())

  // function to check whether player is colliding (use getBoundingClientRect())
}

export default Player;
