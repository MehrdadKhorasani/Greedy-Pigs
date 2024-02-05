"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");

const dice0 = document.getElementById("dice--0");
const dice1 = document.getElementById("dice--1");
const dice0I = document.getElementById("dice--0-i");
const dice1I = document.getElementById("dice--1-i");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice0.classList.add("hidden");
  dice1.classList.add("hidden");
}

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
}

btnRoll.addEventListener("click", function () {
  if (playing) {
    const firstDice = Math.trunc(Math.random() * 6) + 1;
    const secondDice = Math.trunc(Math.random() * 6) + 1;
    dice0.classList.remove("hidden");
    dice0.src = `img/dice-${firstDice}.png`;
    dice1.classList.remove("hidden");
    dice1.src = `img/dice-${secondDice}.png`;

    if (firstDice + secondDice != 7) {
      currentScore += firstDice + secondDice;
      document.getElementById("current--0").textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add("hidden");
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
