import Player from "./player";

class PlatedFood extends Player {
  constructor (gameContainer, speed)
  super(gameContainer, speed)
  this.element = document.createElement("div")
  this.element.classList = "follower"
  // TODO: define position
//   this.position = {
//     x: this.gameContainer.getBoundingClientRect().width / 2,
//     y: this.gameContainer.getBoundingClientRect().height / 2,
//   };



// TODO: method for movement
}

export default PlatedFood;
