import Game from "./src/game.js";
const startButton = document.getElementById("start-game");
const game = new Game();

// define start button
// define end button
// define restart button
// define game

// event listener to start game

startButton.addEventListener("click", () => {
  game.startGame();
});
// event listener to end game

// event listener to restart game? (maybe not necessary is start game is well written)

// test to increment score by one when ingredient item is "eaten"
