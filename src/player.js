class Player {
  constructor(gameContainer, speed) {
    this.gameContainer = gameContainer;
    this.speed = speed;
    this.element = document.createElement("div");
    this.element.id = "player";
    this.gameContainer.append(this.element);
    // array to store the plates / followers
    this.body = [];
    this.element.classList = "right";
    this.position = {
      x: this.gameContainer.getBoundingClientRect().width / 2,
      y: this.gameContainer.getBoundingClientRect().height / 2,
    };
    // used to register the player's position for followers to take place
    this.historicPosition = {
      x: 0,
      y: 0,
    };
    this.direction = {
      x: 1,
      y: 1,
    };
  }

  // move the player according to the direction
  move(direction) {
    switch (direction) {
      case "right":
        this.element.classList = "right";
        this.historicPosition.x = this.position.x;
        this.historicPosition.y = this.position.y;
        this.position.x += this.direction.x * this.speed;
        break;
      case "left":
        this.element.classList = "left";
        this.historicPosition.x = this.position.x;
        this.historicPosition.y = this.position.y;
        this.position.x -= this.direction.x * this.speed;
        break;
      case "top":
        this.element.classList = "top";
        this.historicPosition.y = this.position.y;
        this.historicPosition.x = this.position.x;
        this.position.y -= this.direction.y * this.speed;
        break;
      case "down":
        this.element.classList = "down";
        this.historicPosition.y = this.position.y;
        this.historicPosition.x = this.position.x;
        this.position.y += this.direction.y * this.speed;
        break;
    }
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    // positioning the plates (followers) relative to the player
    for (let i = 0; i < this.body.length; i++) {
      const follower = this.body[i];
      if (i === 0) {
        follower.historicPosition.x = follower.position.x;
        follower.historicPosition.y = follower.position.y;
        follower.position.x = this.historicPosition.x;
        follower.position.y = this.historicPosition.y;
      } else {
        const previousFollower = this.body[i - 1];
        follower.historicPosition.x = follower.position.x;
        follower.historicPosition.y = follower.position.y;
        follower.position.x = previousFollower.historicPosition.x;
        follower.position.y = previousFollower.historicPosition.y;
      }
      follower.element.style.left = `${follower.position.x}px`;
      follower.element.style.top = `${follower.position.y}px`;
    }
  }

  // check whether the player is located at the edges
  touchBorder() {
    const playerBoundaries = this.element.getBoundingClientRect();
    const containerBoundaries = this.gameContainer.getBoundingClientRect();
    return (
      playerBoundaries.right > containerBoundaries.right ||
      playerBoundaries.left < containerBoundaries.left ||
      playerBoundaries.top < containerBoundaries.top ||
      playerBoundaries.bottom > containerBoundaries.bottom
    );
  }

  // method to check whether player is touching an ingredient or tail element

  touchElement(element) {
    return (
      this.position.x < element.position.x + 30 &&
      this.position.x + 30 > element.position.x &&
      this.position.y < element.position.y + 30 &&
      this.position.y + 30 > element.position.y
    );
  }
}

// TODO add styling method for giving appearance to the player
export default Player;
