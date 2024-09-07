import { game_view, initGameUI, rollUI, holdUI, switchPlayerUI, loseAllUI } from './game_UI.js'
import { menu_item_cpu as single_player, initMenu } from './menu_UI.js';

export const state = {
  scores: [0, 0],
  current_score: 0,
  last_rolls: [false, false],
}

let playing = true;
export let active_player = 0;
export let single_mode = false;
let is_double = false;

// Initialize the game logic
function initGame() {
  initGameUI()
  state.scores = [0, 0];
  state.current_score = 0;
  state.last_rolls = [false, false];
  active_player = 0
  playing = true;
}

export function gameFunction() {
  // if (playing) 
  single_mode = single_player.classList.contains('active-item') ? true : false;
  initGame();
  document.addEventListener('keydown', keyHandler);
}

// fn: Change the player
function switchPlayer() {
  active_player = active_player === 0 ? 1 : 0;
  switchPlayerUI();
}

// fn: last roll added to last_rolls array (checking doubles)
function addLastRoll() {
  state.last_rolls.push(is_double);
  state.last_rolls.shift();
}

// fn: add the roll score to current score
function addCurrentScore(num1, num2) {
  state.current_score += Number(num1 + num2);
}

// fn: add the roll score to current score
function addScore() {
  state.scores[active_player] += state.current_score;
  state.current_score = 0;
}

// fn: Random dice
function randomDice() {
  const firstNumber = Math.ceil(Math.random() * 6);
  const secondNumber = Math.ceil(Math.random() * 6);
  return { firstNumber, secondNumber };
}

// fn: check the rulls of the game:
function rullChecker(num1, num2) {
  if (num1 === num2 && num1 !== 1) return 'double';
  if (num1 + num2 === 7) return 'lose_turn';
  if (num1 === 1 && num2 === 1) return 'lose_scores';
  return 'ok'
}

// player loses the turn
function loseTurn(num1, num2) {
  state.current_score = 0;
  rollUI(num1, num2)
  switchPlayer()
}

// player loses the turn and all the score
function loseAll(num1, num2) {
  state.scores[active_player] = 0;
  loseAllUI()
  loseTurn(num1, num2)
}

// fn: if the players get doubles
function double(num1, num2) {
  is_double = true;
  const double_count = state.last_rolls.filter(value => value === true).length;
  if (double_count === 2) {
    state.last_rolls.splice(0, state.last_rolls.length, false, false)
    // lose all
    switchPlayer()
    return;
  }
  addCurrentScore(num1, num2);
  addLastRoll(is_double)

  // delete this:
  roll()
}

// fn: handling the key events
function keyHandler(keydown) {
  if (game_view.classList.contains('hiddenView')) return;
  const key = keydown.key;
  switch (key) {
    case 'r':
      roll();
      break;
    case 'h':
      hold();
      break;
    case 'n':
      // new Game
      console.log('new game');
      initMenu();
      // stop all the current functionality.
      break;
    case 'Escape':
      initGame();
      initMenu();
      document.removeEventListener('keydown', keyHandler);
      break;
    default:
      console.log("please enter a valid input");
  }
}

// fn: roll
function roll() {
  const { firstNumber: num1, secondNumber: num2 } = randomDice();

  const result = rullChecker(num1, num2);

  if (result === 'double') {
    double(num1, num2);
    // MUST Continue
  } else {
    is_double = false;
    addLastRoll();

    if (result === 'lose_turn') loseTurn(num1, num2);
    if (result === 'lose_scores') loseAll(num1, num2);
    if (result === 'ok') {
      addCurrentScore(num1, num2);
      rollUI(num1, num2)
    }
  }
}

// fn: hold
function hold() {
  if (!is_double && state.current_score > 0) {
    addScore()
    holdUI()
    switchPlayer()
  }
}

// check if there's a winner
function checkWinner() {
  if (state.scores[active_player] > 100) {
    endGame()
  }

  //move this functionality to roll function:
  if (state.scores[active_player] + state.current_score === 100) {
    // Remember: after every roll, the current score updated (if the status == ok), after that the condition must be checked.
    // if the condition checked before that, the current score is not correct
    // LOSE ALL
  }
}

// end of the game
function endGame() {
  playing = false;
  console.log("we've got a Winner.")
}


// // update UI
// updateUI({ state })