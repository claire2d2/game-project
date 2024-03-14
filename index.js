import Game from "./src/game.js";
const launchButton = document.getElementById("launch-game");
const startButtons = document.getElementById("start-game-buttons");
const startButtonNormal = document.getElementById("start-game-normal");
const startButtonCoriander = document.getElementById("start-game-coriander");
const restartButtonCurrent = document.getElementById("restart-game-current");
const restartButtonOther = document.getElementById("restart-game-other");

const welcomeSection = document.querySelector(".welcome");
const modal = document.querySelector("dialog");
const endSection = document.querySelector(".after-game");
const gameSection = document.getElementById("main-game");
const gameContainer = document.querySelector(".game-container");
const gameMessages = document.querySelector(".game-messages");
const gameScore = document.querySelector(".scores");

let normalMode = true;
let corianderOn = false;
let gameDifficulty = 150;

// track high score, create items for local storage if they don't yet exist
if (localStorage.getItem("corianderHighScore") === null) {
  localStorage.setItem("corianderHighScore", 0);
}
if (localStorage.getItem("normalHighScore") === null) {
  localStorage.setItem("normalHighScore", 0);
}

// event listener to start game
launchButton.addEventListener("click", () => {
  welcomeSection.hidden = true;
  gameSection.classList = "flex-display";
  gameContainer.hidden = false;
  gameMessages.hidden = false;
  gameScore.hidden = false;
  startButtons.hidden = false;
  modal.showModal();
});

startButtonNormal.addEventListener("click", () => {
  gameDifficulty = 150;
  corianderOn = false;
  const game = new Game(gameDifficulty, corianderOn);
  normalMode = true;
  startButtons.hidden = true;
  game.startGame();
});

startButtonCoriander.addEventListener("click", () => {
  gameDifficulty = 100;
  corianderOn = true;
  const game = new Game(gameDifficulty, corianderOn);
  normalMode = false;
  startButtons.hidden = true;
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
