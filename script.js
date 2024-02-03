const startMenu = document.querySelector(".start-menu");
const instructionView = document.querySelector(".instruction-view");
const gameView = document.querySelector(".game-view");
const instructionBtn = document.querySelector(".instruction-view__btn");

function instructionGO() {
  startMenu.classList.add("hidden");
  instructionView.classList.remove("hidden");
}

function instructionOut() {
  instructionView.classList.add("hidden");
  startMenu.classList.remove("hidden");
}

function gameGo() {
  startMenu.classList.add("hidden");
  gameView.classList.remove("hidden");
}

function gameOut() {
  startMenu.classList.remove("hidden");
  gameView.classList.add("hidden");
}
