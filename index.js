// import Game from "./src/game.js";

// define start button
// define end button
// define restart button
// define game

// event listener to start game

// event listener to end game

// event listener to restart game? (maybe not necessary is start game is well written)

// TEST BEFORE IMPLEMENTING IN CLASSES

const player = {
  element: document.getElementById("player"),
  position: { x: 0, y: 0 },
};

const gameContainer = document.querySelector(".game-container");
const pressedKeys = {
  right: false,
  left: false,
  top: false,
  down: false,
};

// Set interval to call the move function when key is pressed

setInterval(() => {
  for (const direction in pressedKeys) {
    if (pressedKeys[direction]) {
      move(direction);
    }
  }
});

// Function to move according to the direction
function move(direction) {
  // define element "borders" (to check for collision later on)

  // if conditions ensure that ball does not get out of borders (IMPROVE later if possible)
  const playerBoundaries = player.element.getBoundingClientRect();
  const containerBoundaries = gameContainer.getBoundingClientRect();

  switch (direction) {
    case "right":
      if (playerBoundaries.right >= containerBoundaries.right) {
        player.position.x--;
      } else {
        player.position.x++;
      }
      break;
    case "left":
      if (playerBoundaries.left <= containerBoundaries.left) {
        player.position.x++;
      } else {
        player.position.x--;
      }
      break;
    case "top":
      if (playerBoundaries.top <= containerBoundaries.top) {
        player.position.y++;
      } else {
        player.position.y--;
      }
      break;
    case "down":
      if (playerBoundaries.bottom >= containerBoundaries.bottom) {
        player.position.y--;
      } else {
        player.position.y++;
      }
      break;
  }
  player.element.style.left = `${player.position.x}px`;
  player.element.style.top = `${player.position.y}px`;
}

// function for event listening to keys
// only one key can be pressed at the same time, to only allow horizontal or vertical movements (no diagonal movements)

document.addEventListener("keydown", (event) => {
  // console.log(event.key)
  switch (event.key) {
    case "ArrowRight":
      pressedKeys.right = true;
      pressedKeys.left = false;
      pressedKeys.top = false;
      pressedKeys.down = false;
      break;
    case "ArrowLeft":
      pressedKeys.left = true;
      pressedKeys.right = false;
      pressedKeys.top = false;
      pressedKeys.down = false;
      break;
    case "ArrowUp":
      pressedKeys.top = true;
      pressedKeys.left = false;
      pressedKeys.right = false;
      pressedKeys.down = false;
      break;
    case "ArrowDown":
      pressedKeys.down = true;
      pressedKeys.left = false;
      pressedKeys.top = false;
      pressedKeys.right = false;
      break;
  }
});

// other styling
