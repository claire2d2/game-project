import Game from "./src/game.js";
const launchButton = document.getElementById("launch-game");
const startButton = document.getElementById("start-game");
const restartButton = document.getElementById("restart-game");

const modal = document.querySelector("dialog");
const welcomeSection = document.querySelector(".welcome");
const endSection = document.querySelector(".after-game");
const gameContainer = document.querySelector(".game-container");
const gameMessages = document.querySelector(".game-messages");

// define start button
// define end button
// define restart button
// define game

// event listener to start game
launchButton.addEventListener("click", () => {
  modal.showModal();
  welcomeSection.hidden = true;
  gameContainer.hidden = false;
  gameMessages.hidden = false;
  startButton.hidden = false;
});

startButton.addEventListener("click", () => {
  const game = new Game();
  modal.hidden = true;
  game.startGame();
});

restartButton.addEventListener("click", () => {
  gameContainer.hidden = false;
  gameMessages.hidden = false;
  startButton.hidden = false;
  endSection.hidden = true;
  //   const game = new Game();
  //   game.startGame();
});
// event listener to end game

// event listener to restart game? (maybe not necessary is start game is well written)

// test to increment score by one when ingredient item is "eaten"
