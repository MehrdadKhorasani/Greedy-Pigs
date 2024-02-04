"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");

const dice0 = document.getElementById("dice--0");
const dice1 = document.getElementById("dice--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const init = function () {
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
};

init();
