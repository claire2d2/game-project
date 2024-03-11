class PlatedFood {
  constructor(gameContainer) {
    this.gameContainer = gameContainer;
    this.element = document.createElement("div");
    this.gameContainer.append(this.element);
    this.element.classList = "follower";
    this.position = {
      x: this.gameContainer.getBoundingClientRect().width / 2 - 30,
      y: this.gameContainer.getBoundingClientRect().height / 2,
    };
    this.historicPosition = {
      x: 0,
      y: 0,
    };

    // TODO: method for movement
  }
}

export default PlatedFood;
