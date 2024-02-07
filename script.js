"use strict";

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

let scores, currentScore, activePlayer, playing, double;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  double = false;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  gameStatus.textContent = "Roll the Dice ...";

  dice0.classList.add("hidden");
  dice1.classList.add("hidden");
  keyHold.classList.remove("hidden");
  keyRoll.classList.remove("hidden");
}

init();

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "r":
      roll();
      break;
    case "h":
      hold();
      break;
    case "n":
      init();
  }
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

function ruleChecker(firstDice, secondDice, score) {
  if (firstDice + secondDice === 7) return "loseCurrent";
  if (firstDice === 1 && secondDice === 1) return "loseTotal";
  if (firstDice + secondDice + score === 100) return "loseTotal";
  if (firstDice === secondDice) return "hasDouble";
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

    const conclusion = ruleChecker(firstDice, secondDice, scores[activePlayer]);
    keyHold.classList.remove("hidden");
    switch (conclusion) {
      case "loseCurrent":
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        switchPlayer();
        break;
      case "loseTotal":
        scores[activePlayer] = 0;
        // currentScore = 0;
        document.getElementById(`score--${activePlayer}`).textContent = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        switchPlayer();
        break;
      case "hasDouble":
        keyHold.classList.add("hidden");
        gameStatus.textContent = "Show Must Go on";
        currentScore += firstDice + secondDice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
        double = true;
        break;
      case "OK":
        double = false;
        currentScore += firstDice + secondDice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
    }
  }
}

function hold() {
  if (playing && !double && currentScore > 0) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] > 100) {
      endGame(scores[activePlayer]);
    } else {
      switchPlayer();
    }
  }
}

function endGame(score) {
  playing = false;
  dice0.classList.add("hidden");
  dice1.classList.add("hidden");
  keyHold.classList.add("hidden");
  keyRoll.classList.add("hidden");
  const winner = document.getElementById(`name--${activePlayer}`).textContent;
  gameStatus.textContent = `${winner} with ${score} scores won`;
}
