/*
Module Name: events.js

Purpose: Centralize all event listeners. This helps in managing and detaching event listeners when they are not needed, which is crucial for avoiding unwanted side effects.

Functions:
setupMenuEvents()
setupGameEvents()
teardownMenuEvents()
teardownGameEvents()

Dependencies: Will import menu.js and game.js for invoking appropriate logic.
*/

// events.js

import { initMenuNavigation } from './menu.js';
import { initGame, rollDice, holdScore } from './game.js';

export function setupMenuEvents() {
  initMenuNavigation();
}

export function setupGameEvents(singleMode) {
  document.addEventListener("keydown", function (e) {
    if (!playing) return;

    switch (e.key) {
      case "r":
        if (!(singleMode && activePlayer === 1)) rollDice();
        break;
      case "h":
        if (!(singleMode && activePlayer === 1)) holdScore();
        break;
      case "n":
        initGame(singleMode);
        break;
      case "Escape":
        resetGame();
        break;
    }
  });
}

function resetGame() {
  // logic to reset game
}
