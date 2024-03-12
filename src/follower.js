class Follower {
  constructor(gameContainer, position) {
    this.gameContainer = gameContainer;
    this.element = document.createElement("div");
    this.gameContainer.append(this.element);
    this.element.classList = "follower";
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.historicPosition = {
      x: 0,
      y: 0,
    };

    // TODO: method for movement
  }
}

export default Follower;
