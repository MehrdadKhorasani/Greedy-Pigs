import { initGameUI } from './game_UI.js'

const state = {
  scores: [0, 0],
  current_score: 0,
  last_rolls: [false, false],
}

let playing = true;
let active_player = 0;
let single_mode = false;
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
  initGame()
}

// FN: Change the player
const changeTurn = () => active_player = active_player === 0 ? 1 : 0;
