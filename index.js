import Game from "./src/game.js";
<<<<<<< HEAD

const startButton = document.getElementById("start-game");
const game = new Game();
=======
>>>>>>> 35d9c50f4abc928dd422d2ff16422767bf05eb05

const game = new Game();
console.log("test");
// define start button
// define end button
// define restart button
// define game

// event listener to start game

<<<<<<< HEAD
startButton.addEventListener("click", () => game.startGame());
// event listener to end game

// event listener to restart game? (maybe not necessary is start game is well written)
=======
game.startGame();
// event listener to end game

// event listener to restart game? (maybe not necessary is start game is well written)

console.log(
  document.querySelector(".game-container").getBoundingClientRect().width
);
>>>>>>> 35d9c50f4abc928dd422d2ff16422767bf05eb05
