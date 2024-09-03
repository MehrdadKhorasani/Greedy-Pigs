/*
Module Name: menu.js

Purpose: Handle all the logic related to menu navigation, including responding to user inputs for menu item selection and initiating the game or instruction view.

Functions:
initMenuNavigation()
handleMenuSelection()
startGame()
startInstruction()

Dependencies: Will import views.js to manage the UI transitions.

*/

// menu.js

import {
  showMenuView,
  showGameView,
  showInstructionView,
  setActiveMenuItem,
  getActiveMenuItem,
  menuCpu,
  menuTwo,
  menuInstruct
} from './views.js';

import { initGame } from './game.js';

let playing = false;
let singleMode = false;

export function initMenuNavigation() {
  document.addEventListener("keydown", handleMenuSelection);
}

function handleMenuSelection(e) {
  if (playing) return;

  const activeMenuItem = getActiveMenuItem();

  if (e.key === "ArrowDown") {
    if (activeMenuItem === "cpu") {
      setActiveMenuItem(menuTwo);
    } else if (activeMenuItem === "two_player") {
      setActiveMenuItem(menuInstruct);
    }
  } else if (e.key === "ArrowUp") {
    if (activeMenuItem === "two_player") {
      setActiveMenuItem(menuCpu);
    } else if (activeMenuItem === "instruct") {
      setActiveMenuItem(menuTwo);
    }
  } else if (e.key === "Enter") {
    if (activeMenuItem === "cpu") {
      singleMode = true;
      startGame();
    } else if (activeMenuItem === "two_player") {
      singleMode = false;
      startGame();
    } else if (activeMenuItem === "instruct") {
      startInstruction();
    }
  }
}

function startGame() {
  playing = true;
  showGameView();
  initGame(singleMode);
}

function startInstruction() {
  playing = true;
  showInstructionView();
}
