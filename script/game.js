import { WINNING_SCORE, LOAD_TIME_SEC } from './config.js';
import { initGameUI, rollUI, holdUI, loadingUI, switchPlayerUI, doubleUI, endGameUI } from './game_UI.js'
import { menu_item_cpu as single_player, initMenu } from './menu_UI.js';
import { rullChecker } from './game_rules.js';
import { keyHandler } from './game_handler.js';
import { rollOk, loseAll, loseTurn, double, triple_double } from './game_roll_cons.js';

export const state = {
  scores: [0, 0],
  current_score: 0,
  last_rolls: [false, false],
}

export let playing = true;
export let active_player = 0;
export let single_mode = false;
let is_double = false;
let three_double = false;

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
  single_mode = single_player.classList.contains('active-item') ? true : false;
  initGame();
  document.addEventListener('keydown', keyHandler);
}

export function newGame() {
  initGame();
  initGameUI();
  console.log(state)
}

export function exitGame() {
  initGame();
  initMenu();
  document.removeEventListener('keydown', keyHandler);
}

// fn: roll
export function roll() {
  if (!playing) return;
  loading();
  const { firstNumber: num1, secondNumber: num2 } = randomDice();
  const result = rullChecker(num1, num2);
  const double_count = state.last_rolls.filter(value => value === true).length;

  if (result === 'double' && double_count === 2) {
    three_double = true;
    triple_double()
  } else {
    if (result === 'double') double(num1, num2);
    else if (result === 'lose_turn') loseTurn();
    else if (result === 'lose_scores') loseAll();
    else if (result === 'ok') rollOk(num1, num2);
  }
  setTimeout(() => {
    rollUI(num1, num2, result);
    if (!playing) playing = true;
    if (result === 'double' && !three_double) doubleUI()
    if (result === 'lose_scores' || result === 'lose_turn') switchPlayer();
    if (three_double) {
      switchPlayer();
      three_double = false
    }
  }, LOAD_TIME_SEC * 1000)
}

// fn: hold
export function hold() {
  if (playing && !is_double && state.current_score > 0) {
    addScore();
    holdUI();
    checkWinner();
    if (playing) switchPlayer();
  }
}


// fn: Change the player
function switchPlayer() {
  playing = false;
  active_player = active_player === 0 ? 1 : 0;
  switchPlayerUI();
  playing = true;
}


// fn: last roll added to last_rolls array (checking doubles)
export function addLastRoll() {
  state.last_rolls.push(is_double);
  state.last_rolls.shift();
}

// fn: add the roll score to current score
export function addCurrentScore(num1, num2) {
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

// check if there's a winner
function checkWinner() {
  if (state.scores[active_player] > WINNING_SCORE) {
    endGame()
  }

  //move this functionality to roll function:
  if (state.scores[active_player] + state.current_score === WINNING_SCORE) {
    // Remember: after every roll, the current score updated (if the status == ok), after that the condition must be checked.
    // if the condition checked before that, the current score is not correct
    // LOSE ALL
  }
}

// end of the game
function endGame() {
  playing = false;
  endGameUI(active_player);
}

export function loading() {
  playing = false;
  loadingUI();
}

export function setIsDouble(value) {
  is_double = value;
}
