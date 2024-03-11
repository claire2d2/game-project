class Follower {
  constructor(gameContainer) {
    this.gameContainer = gameContainer;
    this.element = document.createElement("div");
    this.gameContainer.append(this.element);
    this.element.classList = "follower";
    this.position = {
      x: 0,
      y: 0,
    };
    this.historicPosition = {
      x: 0,
      y: 0,
    };

    // TODO: method for movement
  }
}

export default Follower;
