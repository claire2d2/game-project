class Follower {
  constructor(position) {
    // this.gameContainer = gameContainer;
    this.element = document.createElement("div");
    // this.gameContainer.append(this.element);
    this.element.classList = "follower";
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.historicPosition = {
      x: position.x,
      y: position.y,
    };

    // TODO: method for movement
  }
}

export default Follower;
