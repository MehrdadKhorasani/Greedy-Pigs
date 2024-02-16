"use strict";

// Views
const menuView = document.querySelector(".main-menu");
const gameView = document.querySelector(".main-game");
const instructView = document.querySelector(".main-instruction");

// Menu View
const menuCpu = document.getElementById("menu-item-cpu");
const menuTwo = document.getElementById("menu-item-two");
const menuInstruct = document.getElementById("menu-item-ins");

// Single Mode
let singleMode = false;
let npcTurn = false;

// Game Elements
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

let scores, currentScore, activePlayer, playing, double, lastThreeRolls;

// Event listeners
window.addEventListener("load", menu);
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
});

// Menu function
function menu() {
  gameView.classList.add("hiddenView");
  instructView.classList.add("hiddenView");
  menuView.classList.remove("hiddenView");
  playing = false;

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

// Initialization function
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
}

// Roll function
function roll() {
  if (playing) {
    const firstDice = Math.trunc(Math.random() * 6) + 1;
    const secondDice = Math.trunc(Math.random() * 6) + 1;

    if (singleMode && activePlayer === 1) {
      npcRoll();
      return;
    }

    dice0.classList.remove("hidden");
    dice0.src = `img/dice-${firstDice}.png`;
    dice1.classList.remove("hidden");
    dice1.src = `img/dice-${secondDice}.png`;

    const conclusion = ruleChecker(firstDice, secondDice, scores[activePlayer]);

    keyHold.classList.remove("hidden");
    statusBar(
      `${
        activePlayer === 0 ? playerName.textContent : cpuName.textContent
      }'s turn`
    );

    // Handle conclusion
    switch (conclusion) {
      case "loseCurrent":
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        switchPlayer();
        break;
      case "loseTotal":
        scores[activePlayer] = 0;
        document.getElementById(`score--${activePlayer}`).textContent = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        switchPlayer();
        break;
      case "isDouble":
        handleDouble();
        break;
      case "OK":
        handleOk(firstDice, secondDice);
        break;
    }
  }
}

// NPC's turn logic
function npcRoll() {
  const firstDice = Math.trunc(Math.random() * 6) + 1;
  const secondDice = Math.trunc(Math.random() * 6) + 1;

  if (currentScore >= 20) {
    hold();
    return;
  }

  const conclusion = ruleChecker(firstDice, secondDice, scores[1]);

  // Handle NPC's turn based on conclusion
  switch (conclusion) {
    case "loseCurrent":
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
      break;
    case "loseTotal":
      scores[activePlayer] = 0;
      document.getElementById(`score--${activePlayer}`).textContent = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
      break;
    case "isDouble":
      // Handle doubles logic for NPC if needed
      break;
    case "OK":
      // Update NPC's current score
      currentScore += firstDice + secondDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      if (currentScore + scores[activePlayer] === 100) {
        scores[activePlayer] = 0;
        document.getElementById(`score--${activePlayer}`).textContent = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        switchPlayer();
      }
  }
}

// Hold function
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

// Function to handle doubles
function handleDouble() {
  keyHold.classList.add("hidden");
  statusBar("Doubles means NO HOLD");
  currentScore += firstDice + secondDice;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  double = true;
  lastThreeRolls.push("d");
  console.log(lastThreeRolls);
  if (lastThreeRolls.length >= 3) {
    scores[activePlayer] = 0;
    document.getElementById(`score--${activePlayer}`).textContent = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    statusBar("Three Doubles means 0");
    keyHold.classList.add("hidden");
    keyRoll.classList.add("hidden");

    setTimeout(() => {
      switchPlayer();
    }, 2000);
  }
}

// Function to handle "OK" conclusion
function handleOk(firstDice, secondDice) {
  double = false;
  currentScore += firstDice + secondDice;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  if (currentScore + scores[activePlayer] === 100) {
    scores[activePlayer] = 0;
    document.getElementById(`score--${activePlayer}`).textContent = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    switchPlayer();
  }
}

// Function to switch player
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

  if (singleMode && activePlayer === 1) {
    npcRoll(); // Call npcRoll() if it's the NPC's turn in single mode
  }
}

// Function to update status bar
function statusBar(msg) {
  gameStatus.textContent = msg;
}

// Function to check rules
function ruleChecker(firstDice, secondDice, score) {
  if (firstDice + secondDice === 7) return "loseCurrent";
  if (firstDice + secondDice + score === 100) return "loseTotal";
  if (firstDice === 1 && secondDice === 1) return "loseTotal";
  if (firstDice === secondDice) return "isDouble";
  return "OK";
}

// Function to end game
function endGame(score) {
  playing = false;
  dice0.classList.add("hidden");
  dice1.classList.add("hidden");
  keyHold.classList.add("hidden");
  keyRoll.classList.add("hidden");
  const winner = document.getElementById(`name--${activePlayer}`).textContent;
  statusBar(`${winner} with ${score} scores won`);
}
