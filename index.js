import Game from "./src/game.js";

const game = new Game();
console.log("test");
// define start button
// define end button
// define restart button
// define game

// event listener to start game

game.startGame();
// event listener to end game

// event listener to restart game? (maybe not necessary is start game is well written)

console.log(
  document.querySelector(".game-container").getBoundingClientRect().width
);
