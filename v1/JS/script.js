"use strict";

//views
const menuView = document.querySelector(".main-menu");
const gameView = document.querySelector(".main-game");
const instructView = document.querySelector(".main-instruction");
//Menu View
const menuCpu = document.getElementById("menu-item-cpu");
const menuTwo = document.getElementById("menu-item-two");
const menuInstruct = document.getElementById("menu-item-ins");

//Single Mode
let singleMode = false;

window.addEventListener("load", menu);

function menu() {
  gameView.classList.add("hiddenView");
  instructView.classList.add("hiddenView");
  menuView.classList.remove("hiddenView");
  playing = false;

  // menu function
  document.addEventListener("keydown", function (e) {
    if (playing === false) {
      if (menuCpu.classList.contains("active-item") && e.key === "ArrowDown") {
        menuCpu.classList.remove("active-item");
        menuTwo.classList.add("active-item");
      } else if (
        menuTwo.classList.contains("active-item") &&
        e.key === "ArrowDown"
      ) {
        menuTwo.classList.remove("active-item");
        menuInstruct.classList.add("active-item");
      } else if (
        menuTwo.classList.contains("active-item") &&
        e.key === "ArrowUp"
      ) {
        menuTwo.classList.remove("active-item");
        menuCpu.classList.add("active-item");
      } else if (
        menuInstruct.classList.contains("active-item") &&
        e.key === "ArrowUp"
      ) {
        menuInstruct.classList.remove("active-item");
        menuTwo.classList.add("active-item");
      }
      if (menuTwo.classList.contains("active-item") && e.key === "Enter") {
        menuView.classList.add("hiddenView");
        gameView.classList.remove("hiddenView");
        init();
      }

      if (menuInstruct.classList.contains("active-item") && e.key === "Enter") {
        menuView.classList.add("hiddenView");
        instructView.classList.remove("hiddenView");
        playing = true;
      }

      if (menuCpu.classList.contains("active-item") && e.key === "Enter") {
        singleMode = true;
        menuView.classList.add("hiddenView");
        gameView.classList.remove("hiddenView");
        init();
      }
    }
  });
}

//Game
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const gameStatus = document.querySelector(".status-bar");

const playerName = document.getElementById("name--0");
const cpuName = document.getElementById("name--1");

const loader = document.querySelector(".loader-holder");
const dices = document.querySelector(".dice-holder");

const dice0 = document.getElementById("dice--0");
const dice1 = document.getElementById("dice--1");

const keyNew = document.querySelector(".key--new");
const keyRoll = document.querySelector(".key--roll");
const keyHold = document.querySelector(".key--hold");

let scores,
  currentScore,
  activePlayer,
  playing,
  double,
  lastThreeRolls = [[], []];

function init() {
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

  statusBar("Roll the Dice to start the game");

  dice0.classList.add("hidden");
  dice1.classList.add("hidden");
  keyHold.classList.remove("hidden");
  keyRoll.classList.remove("hidden");
  if (singleMode) cpuName.textContent = "NPC";
  if (!singleMode) cpuName.textContent = "Player-2";
}

document.addEventListener("keydown", function (e) {
  if (playing) {
    switch (e.key) {
      case "r":
        if (singleMode && activePlayer === 1) return false;
        roll();
        break;
      case "h":
        if (singleMode && activePlayer === 1) return false;
        hold();
        break;
      case "n":
        init();
        break;
      case "Escape":
        init();
        menuView.classList.remove("hiddenView");
        gameView.classList.add("hiddenView");
        instructView.classList.add("hiddenView");
        playing = false;
        singleMode = false;
        break;
    }
  }
  if (playing && singleMode && activePlayer === 1) {
    npcRoll();
  }
});

function statusBar(msg) {
  gameStatus.textContent = msg;
}

function switchPlayer() {
  keyHold.classList.remove("hidden");
  keyRoll.classList.remove("hidden");
  lastThreeRolls = [];
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  if (activePlayer === 0) {
    playerName.classList.add("active");
    cpuName.classList.remove("active");
    statusBar(`${playerName.textContent}'s turn`);
  } else {
    cpuName.classList.add("active");
    playerName.classList.remove("active");
    statusBar(`${cpuName.textContent}'s turn`);
  }
}

function ruleChecker(firstDice, secondDice, score) {
  if (firstDice + secondDice === 7) return "loseCurrent";
  else if (firstDice + secondDice + score === 100) return "loseTotal";
  else if (firstDice === 1 && secondDice === 1) return "loseTotal";
  else if (firstDice === secondDice) return "isDouble";
  else return "OK";
}

function roll() {
  if (playing && singleMode && activePlayer === 1) {
    npcRoll();
    return;
  }
  if (playing) {
    dices.classList.add("hidden");
    loader.classList.remove("hidden");
    playing = false;
    setTimeout(() => performRoll(null, null), 1500);
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
  statusBar(`${winner} with ${score} scores won`);
}

function npcRoll() {
  const rollTimes = Math.floor(Math.random() * 6) + 1;
  let rollCount = 0;

  function performNpcRoll() {
    performRoll(rollTimes, rollCount);

    rollCount++;
    if (rollCount < rollTimes && activePlayer === 1) {
      setTimeout(performNpcRoll, 2000);
    } else {
      setTimeout(() => {
        hold();
      }, 2000);
    }
  }
  dices.classList.add("hidden");
  loader.classList.remove("hidden");
  playing = false;
  setTimeout(() => performNpcRoll(), 1500);
}

function performRoll(rollTimes, rollCount) {
  dices.classList.remove("hidden");
  loader.classList.add("hidden");
  playing = true;

  const firstDice = Math.trunc(Math.random() * 6) + 1;
  const secondDice = Math.trunc(Math.random() * 6) + 1;

  dice0.classList.remove("hidden");
  dice0.src = `img/dice-${firstDice}.png`;
  dice1.classList.remove("hidden");
  dice1.src = `img/dice-${secondDice}.png`;

  const conclusion = ruleChecker(firstDice, secondDice, scores[activePlayer]);

  keyHold.classList.remove("hidden");
  statusBar(
    `${activePlayer === 0 ? playerName.textContent : cpuName.textContent}'s turn`
  );
  switch (conclusion) {
    case "loseCurrent":
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
      if (singleMode && activePlayer === 1) {
        setTimeout(() => {
          npcRoll();
        }, 1500);
      }
      break;
    case "loseTotal":
      scores[activePlayer] = 0;
      document.getElementById(`score--${activePlayer}`).textContent = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
      if (singleMode && activePlayer === 1) {
        setTimeout(() => {
          npcRoll();
        }, 1500);
      }
      break;
    case "isDouble":
      keyHold.classList.add("hidden");
      statusBar("Doubles means NO HOLD");
      currentScore += firstDice + secondDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      double = true;
      lastThreeRolls.push("d");
      if (lastThreeRolls.length >= 3) {
        scores[activePlayer] = 0;
        document.getElementById(`score--${activePlayer}`).textContent = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        statusBar("Three Doubles means 0");
        keyHold.classList.add("hidden");
        keyRoll.classList.add("hidden");

        setTimeout(() => {
          switchPlayer();
          setTimeout(() => npcRoll(), 1000);
        }, 2000);
      }
      if (
        rollCount === rollTimes - 1 &&
        activePlayer === 1 &&
        singleMode &&
        lastThreeRolls.length < 2 //this is not OK
      ) {
        setTimeout(() => performRoll(), 1500);
      }
      break;
    case "OK":
      double = false;
      currentScore += firstDice + secondDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      if (currentScore + scores[activePlayer] === 100) {
        scores[activePlayer] = 0;
        document.getElementById(`score--${activePlayer}`).textContent = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        switchPlayer();
        break;
      }
  }
}
