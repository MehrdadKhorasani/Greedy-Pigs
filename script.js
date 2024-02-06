"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const gameStatus = document.querySelector(".status-bar");

const playerName = document.getElementById("name--0");
const cpuName = document.getElementById("name--1");

const dice0 = document.getElementById("dice--0");
const dice1 = document.getElementById("dice--1");

const keyNew = document.querySelector(".key--new");
const keyRoll = document.querySelector(".key--roll");
const keyHold = document.querySelector(".key--hold");

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

  gameStatus.textContent = "Roll the Dice ...";

  dice0.classList.add("hidden");
  dice1.classList.add("hidden");
}

init();

document.addEventListener("keydown", function (e) {
  if (e.key !== "r") return;
  roll();
});
document.addEventListener("keydown", function (e) {
  if (e.key !== "h") return;
  hold();
});
document.addEventListener("keydown", function (e) {
  if (e.key !== "n") return;
  init();
});

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  if (activePlayer === 0) {
    playerName.classList.add("active");
    cpuName.classList.remove("active");
  } else {
    cpuName.classList.add("active");
    playerName.classList.remove("active");
  }
}

function rullChecker(firstDice, secondDice, score) {
  if (firstDice + secondDice === 7) return "loseCurrent";
  if (firstDice === 1 && secondDice === 1) return "loseTotal";
  if (firstDice === secondDice) return "mustRoll";
  if (firstDice + secondDice + score === 100) "loseTotal";
  return "OK";
}

function roll() {
  if (playing) {
    const firstDice = Math.trunc(Math.random() * 6) + 1;
    const secondDice = Math.trunc(Math.random() * 6) + 1;
    dice0.classList.remove("hidden");
    dice0.src = `img/dice-${firstDice}.png`;
    dice1.classList.remove("hidden");
    dice1.src = `img/dice-${secondDice}.png`;

    const conclusion = rullChecker(firstDice, secondDice, scores[activePlayer]);
    keyHold.classList.remove("hidden");
    switch (conclusion) {
      case "loseCurrent":
        current0.textContent = 0;
        switchPlayer();
        break;
      case "loseTotal":
        scores[activePlayer] = 0;
        score0.textContent = 0;
        current0.textContent = 0;
        switchPlayer();
        break;
      case "mustRoll":
        keyHold.classList.add("hidden");
        gameStatus.textContent = "Show Must Go on";
        currentScore += firstDice + secondDice;
        document.getElementById("current--0").textContent = currentScore;
        break;
      case "OK":
        currentScore += firstDice + secondDice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
    }
  }
}

function hold() {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice0.classList.add("hidden");
      dice1.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
}
