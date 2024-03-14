import Game from "./src/game.js";
const launchButton = document.getElementById("launch-game");
const startButtonNormal = document.getElementById("start-game-normal");
const startButtonCoriander = document.getElementById("start-game-coriander");
const restartButtonCurrent = document.getElementById("restart-game-current");
const restartButtonOther = document.getElementById("restart-game-other");

const preGame = document.querySelector(".pre-game");
const welcomeSection = document.querySelector(".welcome");
const endSection = document.querySelector(".after-game");
const gameContainer = document.querySelector(".game-container");
const gameMessages = document.querySelector(".game-messages");
const gameScore = document.querySelector(".scores");
const highScoreNormal = document.getElementById("highscore-normal");
const highScoreCoriander = document.getElementById("highscore-coriander");

let normalMode = true;
let gameDifficulty = 150;
let corianderOn = false;

// event listener to start game
launchButton.addEventListener("click", () => {
  preGame.hidden = false;
  welcomeSection.hidden = true;
  gameContainer.hidden = false;
  gameMessages.hidden = false;
  gameScore.hidden = false;
});

startButtonNormal.addEventListener("click", () => {
  gameDifficulty = 150;
  corianderOn = false;
  const game = new Game(gameDifficulty, corianderOn);
  preGame.hidden = true;
  highScoreCoriander.hidden = true;
  highScoreNormal.hidden = false;
  normalMode = true;
  game.startGame();
});

startButtonCoriander.addEventListener("click", () => {
  gameDifficulty = 100;
  corianderOn = true;
  const game = new Game(gameDifficulty, corianderOn);
  preGame.hidden = true;
  highScoreCoriander.hidden = false;
  highScoreNormal.hidden = true;
  normalMode = false;
  game.startGame();
});

restartButtonCurrent.addEventListener("click", () => {
  gameContainer.hidden = false;
  gameMessages.hidden = false;
  endSection.hidden = true;
  // restart game with the same mode that was previously played
  if ((normalMode = true)) {
    gameDifficulty = 150;
    corianderOn = false;
  } else {
    gameDifficulty = 100;
    corianderOn = true;
  }
  const game = new Game(gameDifficulty, corianderOn);
  game.startGame();
});

restartButtonOther.addEventListener("click", () => {
  gameContainer.hidden = false;
  gameMessages.hidden = false;
  endSection.hidden = true;
  // restart game with the same mode that was previously played
  if ((normalMode = true)) {
    gameDifficulty = 100;
    corianderOn = true;
  } else {
    gameDifficulty = 150;
    corianderOn = false;
  }
  const game = new Game(gameDifficulty, corianderOn);
  game.startGame();
});
