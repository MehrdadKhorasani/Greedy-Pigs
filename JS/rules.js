/*
Module Name: rules.js

Purpose: Contain all the rules of the game, such as checking for special conditions (e.g., rolling a 7, double rolls). This module can be extended or modified easily to adjust game rules.

Functions:
checkRollOutcome(firstDice, secondDice, currentScore)
applySpecialRules()

*/

// rules.js
export function checkRollOutcome(firstDice, secondDice, currentScore) {
  if (firstDice === 7 || secondDice === 7) {
    return "loseTotal";
  }

  if (firstDice === secondDice) {
    return "isDouble";
  }

  return "OK";
}
