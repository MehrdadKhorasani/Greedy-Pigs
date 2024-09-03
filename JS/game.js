/*
Module Name: game.js

Purpose: Encapsulate all the game-related logic, including game initialization, player actions (roll, hold), status updates, and the NPC (CPU) logic.

Functions:
initGame(singleMode)
rollDice()
holdScore()
switchPlayer()
npcRoll()
performRoll()

Dependencies: Will import views.js to interact with the UI.
*/

// game.js

import {
  score0, score1, current0, current1, playerName, cpuName,
  loader, dices, dice0, dice1, keyHold, keyRoll, gameStatus
} from './views.js';

import { checkRollOutcome } from './rules.js';
import { npcRoll, getRandomInt } from './utils.js';

let scores, currentScore, activePlayer, playing, double, lastThreeRolls;

export function initGame(singleMode) {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  double = false;
  lastThreeRolls = [];

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  playerName.classList.add("active");
  cpuName.classList.remove("active");

  gameStatus.textContent = "Roll the Dice to start the game";

  dice0.classList.add("hidden");
  dice1.classList.add("hidden");
  keyHold.classList.remove("hidden");
  keyRoll.classList.remove("hidden");
  cpuName.textContent = singleMode ? "NPC" : "Player-2";

  setupGameEvents(singleMode);
}

function setupGameEvents(singleMode) {
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
        resetGame(singleMode);
        break;
    }

    if (singleMode && activePlayer === 1) npcRoll();
  });
}

function resetGame() {
  showMenuView();
  playing = false;
}

export function rollDice() {
  if (!playing) return;

  dices.classList.add("hidden");
  loader.classList.remove("hidden");
  playing = false;

  setTimeout(() => performRoll(), 1500);
}

export function holdScore() {
  if (!playing || double || currentScore <= 0) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    endGame();
  } else {
    switchPlayer();
  }
}

function endGame() {
  playing = false;
  dice0.classList.add("hidden");
  dice1.classList.add("hidden");
  keyHold.classList.add("hidden");
  keyRoll.classList.add("hidden");

  const winner = document.getElementById(`name--${activePlayer}`).textContent;
  gameStatus.textContent = `${winner} wins with ${scores[activePlayer]} points!`;
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  lastThreeRolls = [];

  playerName.classList.toggle("active");
  cpuName.classList.toggle("active");

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  gameStatus.textContent = `${activePlayer === 0 ? playerName.textContent : cpuName.textContent}'s turn`;

  if (activePlayer === 1) npcRoll();
}

function performRoll() {
  playing = true;
  const firstDice = getRandomInt(1, 6);
  const secondDice = getRandomInt(1, 6);

  dice0.src = `img/dice-${firstDice}.png`;
  dice1.src = `img/dice-${secondDice}.png`;
  dice0.classList.remove("hidden");
  dice1.classList.remove("hidden");

  const outcome = checkRollOutcome(firstDice, secondDice, scores[activePlayer]);

  if (outcome === "loseCurrent") {
    switchPlayer();
  } else if (outcome === "loseTotal") {
    scores[activePlayer] = 0;
    document.getElementById(`score--${activePlayer}`).textContent = 0;
    switchPlayer();
  } else if (outcome === "isDouble") {
    double = true;
    currentScore += firstDice + secondDice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    lastThreeRolls.push("d");
    if (lastThreeRolls.length >= 3) {
      scores[activePlayer] = 0;
      document.getElementById(`score--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  } else {
    currentScore += firstDice + secondDice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  }
}
