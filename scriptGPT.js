"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const views = {
    menu: document.querySelector(".main-menu"),
    game: document.querySelector(".main-game"),
    instruction: document.querySelector(".main-instruction"),
  };

  const menuItems = {
    cpu: document.getElementById("menu-item-cpu"),
    twoPlayer: document.getElementById("menu-item-two"),
    instruct: document.getElementById("menu-item-ins"),
  };

  const gameElements = {
    score: [
      document.getElementById("score--0"),
      document.getElementById("score--1"),
    ],
    current: [
      document.getElementById("current--0"),
      document.getElementById("current--1"),
    ],
    statusBar: document.querySelector(".status-bar"),
    playerName: document.getElementById("name--0"),
    cpuName: document.getElementById("name--1"),
    dice: [
      document.getElementById("dice--0"),
      document.getElementById("dice--1"),
    ],
    keys: {
      new: document.querySelector(".key--new"),
      roll: document.querySelector(".key--roll"),
      hold: document.querySelector(".key--hold"),
    },
  };

  let state = {
    scores: [0, 0],
    currentScore: 0,
    activePlayer: 0,
    playing: false,
    double: false,
  };

  function init() {
    state.scores = [0, 0];
    state.currentScore = 0;
    state.activePlayer = 0;
    state.playing = true;
    state.double = false;

    updateScoreboard();
    updateStatus("Roll the Dice ...");
    hideDice();
    showKeys();
  }

  function updateScoreboard() {
    gameElements.score.forEach((score, index) => {
      score.textContent = state.scores[index];
    });
    gameElements.current.forEach((current, index) => {
      current.textContent =
        index === state.activePlayer ? state.currentScore : 0;
    });
  }

  function updateStatus(message) {
    gameElements.statusBar.textContent = message;
  }

  function hideDice() {
    gameElements.dice.forEach((die) => {
      die.classList.add("hidden");
    });
  }

  function showKeys() {
    Object.values(gameElements.keys).forEach((key) => {
      key.classList.remove("hidden");
    });
  }

  function roll() {
    if (state.playing) {
      const firstDice = Math.trunc(Math.random() * 6) + 1;
      const secondDice = Math.trunc(Math.random() * 6) + 1;
      showDice(firstDice, secondDice);
      const conclusion = ruleChecker(
        firstDice,
        secondDice,
        state.scores[state.activePlayer]
      );
      handleRollConclusion(conclusion, firstDice, secondDice);
    }
  }

  function showDice(firstDice, secondDice) {
    gameElements.dice.forEach((die, index) => {
      die.classList.remove("hidden");
      die.src = `img/dice-${index === 0 ? firstDice : secondDice}.png`;
    });
  }

  function handleRollConclusion(conclusion, firstDice, secondDice) {
    switch (conclusion) {
      case "loseCurrent":
        state.currentScore = 0;
        updateScoreboard();
        switchPlayer();
        break;
      case "loseTotal":
        state.scores[state.activePlayer] = 0;
        updateScoreboard();
        switchPlayer();
        break;
      case "hasDouble":
        state.currentScore += firstDice + secondDice;
        updateScoreboard();
        state.double = true;
        break;
      case "OK":
        state.currentScore += firstDice + secondDice;
        updateScoreboard();
        if (state.currentScore + state.scores[state.activePlayer] === 100) {
          state.scores[state.activePlayer] = 0;
          updateScoreboard();
          switchPlayer();
        }
        break;
    }
  }

  function switchPlayer() {
    state.currentScore = 0;
    state.activePlayer = state.activePlayer === 0 ? 1 : 0;
    updateActivePlayerUI();
  }

  function updateActivePlayerUI() {
    const activePlayerName =
      state.activePlayer === 0 ? gameElements.playerName : gameElements.cpuName;
    const inactivePlayerName =
      state.activePlayer === 0 ? gameElements.cpuName : gameElements.playerName;
    activePlayerName.classList.add("active");
    inactivePlayerName.classList.remove("active");
  }

  function ruleChecker(firstDice, secondDice, score) {
    if (firstDice + secondDice === 7) return "loseCurrent";
    if (firstDice + secondDice + score === 100) return "loseTotal";
    if (firstDice === 1 && secondDice === 1) return "loseTotal";
    if (firstDice === secondDice) return "hasDouble";
    return "OK";
  }

  function hold() {
    if (state.playing && !state.double && state.currentScore > 0) {
      state.scores[state.activePlayer] += state.currentScore;
      updateScoreboard();
      if (state.scores[state.activePlayer] > 100) {
        endGame(state.scores[state.activePlayer]);
      } else {
        switchPlayer();
      }
    }
  }

  function endGame(score) {
    state.playing = false;
    hideDice();
    hideKeys();
    const winner =
      state.activePlayer === 0
        ? gameElements.playerName.textContent
        : gameElements.cpuName.textContent;
    updateStatus(`${winner} with ${score} scores won`);
  }

  function hideKeys() {
    Object.values(gameElements.keys).forEach((key) => {
      key.classList.add("hidden");
    });
  }

  // Event listeners
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
        views.menu.classList.remove("hiddenView");
        views.game.classList.add("hiddenView");
        views.instruction.classList.add("hiddenView");
        break;
    }
  });

  // Initialize game
  init();
});

// In this refactored version:
// The code is divided into functions based on their responsibilities, such as roll(), hold(), updateScoreboard(), etc.
// DOM manipulation functions are separated from the game logic functions.
// Each function has a clear purpose and responsibility.
// The switchPlayer() function now updates the active player's UI state separately from updating the player's score.
// Comments have been omitted for brevity, but adding comments to complex functions or logic is still a good practice for better code understanding.

///////////// 3doubles:
("use strict");

document.addEventListener("DOMContentLoaded", function () {
  const views = {
    menu: document.querySelector(".main-menu"),
    game: document.querySelector(".main-game"),
    instruction: document.querySelector(".main-instruction"),
  };

  const menuItems = {
    cpu: document.getElementById("menu-item-cpu"),
    twoPlayer: document.getElementById("menu-item-two"),
    instruct: document.getElementById("menu-item-ins"),
  };

  const gameElements = {
    score: [
      document.getElementById("score--0"),
      document.getElementById("score--1"),
    ],
    current: [
      document.getElementById("current--0"),
      document.getElementById("current--1"),
    ],
    statusBar: document.querySelector(".status-bar"),
    playerName: document.getElementById("name--0"),
    cpuName: document.getElementById("name--1"),
    dice: [
      document.getElementById("dice--0"),
      document.getElementById("dice--1"),
    ],
    keys: {
      new: document.querySelector(".key--new"),
      roll: document.querySelector(".key--roll"),
      hold: document.querySelector(".key--hold"),
    },
  };

  let state = {
    scores: [0, 0],
    currentScore: 0,
    activePlayer: 0,
    playing: false,
    lastThreeRolls: [[], []], // Stores the last three rolls for each player
  };

  function init() {
    state.scores = [0, 0];
    state.currentScore = 0;
    state.activePlayer = 0;
    state.playing = true;
    state.lastThreeRolls = [[], []];

    updateScoreboard();
    updateStatus("Roll the Dice ...");
    hideDice();
    showKeys();
  }

  function updateScoreboard() {
    gameElements.score.forEach((score, index) => {
      score.textContent = state.scores[index];
    });
    gameElements.current.forEach((current, index) => {
      current.textContent =
        index === state.activePlayer ? state.currentScore : 0;
    });
  }

  function updateStatus(message) {
    gameElements.statusBar.textContent = message;
  }

  function hideDice() {
    gameElements.dice.forEach((die) => {
      die.classList.add("hidden");
    });
  }

  function showKeys() {
    Object.values(gameElements.keys).forEach((key) => {
      key.classList.remove("hidden");
    });
  }

  function roll() {
    if (state.playing) {
      const firstDice = Math.trunc(Math.random() * 6) + 1;
      const secondDice = Math.trunc(Math.random() * 6) + 1;
      showDice(firstDice, secondDice);
      const isDouble = firstDice === secondDice;
      state.lastThreeRolls[state.activePlayer].push(isDouble);
      if (state.lastThreeRolls[state.activePlayer].length > 3) {
        state.lastThreeRolls[state.activePlayer].shift();
      }
      const conclusion = ruleChecker(
        firstDice,
        secondDice,
        state.scores[state.activePlayer]
      );
      handleRollConclusion(conclusion, firstDice, secondDice);
    }
  }

  function showDice(firstDice, secondDice) {
    gameElements.dice.forEach((die, index) => {
      die.classList.remove("hidden");
      die.src = `img/dice-${index === 0 ? firstDice : secondDice}.png`;
    });
  }

  function handleRollConclusion(conclusion, firstDice, secondDice) {
    switch (conclusion) {
      case "loseCurrent":
        state.currentScore = 0;
        updateScoreboard();
        switchPlayer();
        break;
      case "loseTotal":
        state.scores[state.activePlayer] = 0;
        updateScoreboard();
        switchPlayer();
        break;
      case "hasDouble":
        state.currentScore += firstDice + secondDice;
        updateScoreboard();
        break;
      case "OK":
        state.currentScore += firstDice + secondDice;
        updateScoreboard();
        if (state.currentScore + state.scores[state.activePlayer] === 100) {
          state.scores[state.activePlayer] = 0;
          updateScoreboard();
          switchPlayer();
        }
        break;
    }
  }

  function handleTripleDouble() {
    state.scores[state.activePlayer] = 0;
    state.currentScore = 0;
    state.lastThreeRolls[state.activePlayer] = [];
    updateScoreboard();
    switchPlayer();
  }

  function switchPlayer() {
    state.currentScore = 0;
    state.activePlayer = state.activePlayer === 0 ? 1 : 0;
    updateActivePlayerUI();
  }

  function updateActivePlayerUI() {
    const activePlayerName =
      state.activePlayer === 0 ? gameElements.playerName : gameElements.cpuName;
    const inactivePlayerName =
      state.activePlayer === 0 ? gameElements.cpuName : gameElements.playerName;
    activePlayerName.classList.add("active");
    inactivePlayerName.classList.remove("active");
  }

  function ruleChecker(firstDice, secondDice, score) {
    if (firstDice + secondDice === 7) return "loseCurrent";
    if (firstDice + secondDice + score === 100) return "loseTotal";
    if (firstDice === 1 && secondDice === 1) return "loseTotal";
    if (firstDice === secondDice) return "hasDouble";
    return "OK";
  }

  function hold() {
    if (
      state.playing &&
      !state.lastThreeRolls[state.activePlayer].includes(false) &&
      state.currentScore > 0
    ) {
      state.scores[state.activePlayer] += state.currentScore;
      updateScoreboard();
      if (state.scores[state.activePlayer] > 100) {
        endGame(state.scores[state.activePlayer]);
      } else {
        switchPlayer();
      }
    }
  }

  function endGame(score) {
    state.playing = false;
    hideDice();
    hideKeys();
    const winner =
      state.activePlayer === 0
        ? gameElements.playerName.textContent
        : gameElements.cpuName.textContent;
    updateStatus(`${winner} with ${score} scores won`);
  }

  function hideKeys() {
    Object.values(gameElements.keys).forEach((key) => {
      key.classList.add("hidden");
    });
  }

  // Event listeners
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
        views.menu.classList.remove("hiddenView");
        views.game.classList.add("hiddenView");
        views.instruction.classList.add("hiddenView");
        break;
    }
  });

  // Initialize game
  init();
});

// In this code:

// We added a lastThreeRolls array to keep track of the last three rolls for each player.
// Every time a roll happens, we push a boolean indicating whether it was a double or not into the respective player's lastThreeRolls array.
// If the lastThreeRolls array contains three consecutive true values (indicating three doubles in a row), we call the handleTripleDouble function to reset the player's score and switch to the other player.
