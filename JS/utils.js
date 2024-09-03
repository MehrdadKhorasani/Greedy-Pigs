/*
Module Name: utils.js

Purpose: Any helper functions that might be used across multiple modules. This can include random number generators, formatting functions, or other general-purpose utilities.

Functions:
getRandomInt(min, max)
delay(ms)
*/

// utils.js

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function npcRoll() {
  setTimeout(() => {
    rollDice();
    if (currentScore >= 20 || Math.random() < 0.5) {
      holdScore();
    } else {
      npcRoll();
    }
  }, 1000);
}
