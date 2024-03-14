import Game from "./src/game.js";
const launchButton = document.getElementById("launch-game");
const startButtonNormal = document.getElementById("start-game-normal");
const startButtonCoriander = document.getElementById("start-game-coriander");
const restartButton = document.getElementById("restart-game");

const preGame = document.querySelector(".pre-game");
const welcomeSection = document.querySelector(".welcome");
const endSection = document.querySelector(".after-game");
const gameContainer = document.querySelector(".game-container");
const gameMessages = document.querySelector(".game-messages");
const gameScore = document.querySelector(".scores");
const highScoreNormal = document.getElementById("highscore-normal");
const highScoreCoriander = document.getElementById("highscore-coriander");

let gameArray = [];

// event listener to start game
launchButton.addEventListener("click", () => {
  preGame.hidden = false;
  welcomeSection.hidden = true;
  gameContainer.hidden = false;
  gameMessages.hidden = false;
  gameScore.hidden = false;
});

startButtonNormal.addEventListener("click", () => {
  const game = new Game(150, false);
  gameArray.push(game);
  preGame.hidden = true;
  highScoreCoriander.hidden = true;
  highScoreNormal.hidden = false;
  game.startGame();
});

startButtonCoriander.addEventListener("click", () => {
  const game = new Game(100, true);
  gameArray.push(game);
  preGame.hidden = true;
  highScoreCoriander.hidden = false;
  highScoreNormal.hidden = true;
  game.startGame();
});

restartButton.addEventListener("click", () => {
  gameContainer.hidden = false;
  gameMessages.hidden = false;
  startButton.hidden = false;
  endSection.hidden = true;
  const game = new Game();
  gameArray.push(game);
  game.startGame();
});
// event listener to end game

// event listener to restart game? (maybe not necessary is start game is well written)

// test to increment score by one when ingredient item is "eaten"
