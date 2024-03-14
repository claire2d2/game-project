import Game from "./src/game.js";
const launchButton = document.getElementById("launch-game");
const startButtons = document.getElementById("start-game-buttons");
const startButtonNormal = document.getElementById("start-game-normal");
const startButtonCoriander = document.getElementById("start-game-coriander");

const musicOnOff = document.getElementById("music");
const backgroundMusic = document.getElementById("background-music");
const soundOnOff = document.getElementById("sound-effect");
let soundEffect = false;
let musicOn = false;
let allSoundEffects = document.getElementsByClassName("sound-effect");
muteSound(allSoundEffects);

const welcomeSection = document.querySelector(".welcome");

const modal = document.querySelector("dialog");
const closeModal = document.getElementById("close-dialog");

const gameSection = document.getElementById("main-game");
const gameContainer = document.querySelector(".game-container");
const gameMessages = document.querySelector(".game-messages");
const gameScore = document.querySelector(".scores");

const endSection = document.querySelector(".after-game");
const restartButtonCurrent = document.getElementById("restart-game-current");
const restartButtonOther = document.getElementById("restart-game-other");

let corianderOn = false;
let gameDifficulty = 150;

// track high score, create items for local storage if they don't yet exist
if (localStorage.getItem("corianderHighScore") === null) {
  localStorage.setItem("corianderHighScore", "0");
}
if (localStorage.getItem("normalHighScore") === null) {
  localStorage.setItem("normalHighScore", "0");
}

// ! Audio parameters

musicOnOff.addEventListener("click", () => {
  if (musicOn) {
    musicOnOff.innerHTML =
      '<img src="./img/music-off.png" alt="sound effect icon" />';
    backgroundMusic.pause();
    musicOn = false;
  } else {
    musicOnOff.innerHTML =
      '<img src="./img/music-on.png" alt="sound effect icon" />';
    backgroundMusic.play();
    musicOn = true;
  }
});

soundOnOff.addEventListener("click", () => {
  if (!soundEffect) {
    soundOnOff.innerHTML =
      '<img src="./img/sound-on.png" alt="sound effect icon" />';
    soundEffect = true;
    unMuteSound(allSoundEffects);
  } else {
    soundOnOff.innerHTML =
      '<img src="./img/sound-muted.png" alt="sound effect icon" />';
    soundEffect = false;
    muteSound(allSoundEffects);
  }
});

// event listener to show dialog game
launchButton.addEventListener("click", () => {
  welcomeSection.hidden = true;
  gameSection.classList = "flex-display";
  gameContainer.hidden = false;
  gameMessages.hidden = false;
  gameScore.hidden = false;
  startButtons.hidden = false;
  modal.showModal();
});

// event listeners to start game

startButtonNormal.addEventListener("click", () => {
  gameDifficulty = 150;
  corianderOn = false;
  const game = new Game(gameDifficulty, corianderOn, soundEffect);
  startButtons.hidden = true;
  game.startGame();
});

startButtonCoriander.addEventListener("click", () => {
  gameDifficulty = 100;
  corianderOn = true;
  const game = new Game(gameDifficulty, corianderOn, soundEffect);
  startButtons.hidden = true;
  game.startGame();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

// event listeners to restart a new game

restartButtonCurrent.addEventListener("click", () => {
  gameContainer.hidden = false;
  gameMessages.hidden = false;
  endSection.hidden = true;
  // restart game with the same mode that was previously played
  if (corianderOn) {
    gameDifficulty = 150;
  } else {
    gameDifficulty = 100;
    corianderOn = false;
  }
  const game = new Game(gameDifficulty, corianderOn);
  game.startGame();
});

restartButtonOther.addEventListener("click", () => {
  gameContainer.hidden = false;
  gameMessages.hidden = false;
  endSection.hidden = true;
  // restart game with the same mode that was previously played
  if (corianderOn) {
    gameDifficulty = 100;
    corianderOn = false;
  } else {
    gameDifficulty = 150;
    corianderOn = true;
  }
  const game = new Game(gameDifficulty, corianderOn);
  game.startGame();
});

function muteSound(arrayOfAudios) {
  for (let i = 0; i < arrayOfAudios.length; i++) {
    arrayOfAudios[i].muted = true;
  }
}

function unMuteSound(arrayOfAudios) {
  for (let i = 0; i < arrayOfAudios.length; i++) {
    arrayOfAudios[i].muted = false;
  }
}
