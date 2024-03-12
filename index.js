import Game from "./src/game.js";
const launchButton = document.getElementById("launch-game");
const startButton = document.getElementById("start-game");

const welcomeSection = document.querySelector(".welcome");
const gameContainer = document.querySelector(".game-container");
const gameMessages = document.querySelector(".game-messages");

// define start button
// define end button
// define restart button
// define game

// event listener to start game
launchButton.addEventListener("click", () => {
  welcomeSection.hidden = true;
  gameContainer.hidden = false;
  gameMessages.hidden = false;
});

startButton.addEventListener("click", () => {
  const game = new Game();
  game.startGame();
});
// event listener to end game

// event listener to restart game? (maybe not necessary is start game is well written)

// test to increment score by one when ingredient item is "eaten"
