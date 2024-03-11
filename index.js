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
  const observer = new MutationObserver(function (mutations_list) {
    mutations_list.forEach(function (mutation) {
      mutation.removedNodes.forEach(function (removed_node) {
        if (removed_node.classList == "ingredient") {
          console.log("remove element test");
          game.score++;
          observer.disconnect();
        }
      });
    });
  });
  observer.observe(document.querySelector(".game-container"), {
    subtree: false,
    childList: true,
  });
});
// event listener to end game

// event listener to restart game? (maybe not necessary is start game is well written)

// test to increment score by one when ingredient item is "eaten"
