import { menu_view } from './menu_UI.js'
import { single_mode, active_player, state } from './game.js';
// View:
export const game_view = document.querySelector('.main-game');

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


export function initGameUI() {
  menu_view.classList.add("hiddenView");
  game_view.classList.remove("hiddenView");

  playerName.classList.add("active");
  cpuName.classList.remove("active");

  score0.textContent = score1.textContent = current0.textContent = current1.textContent = 0;
  statusMessage();
  playerName.textContent = 'Player-1';
  cpuName.textContent = single_mode ? 'npc' : 'Player-2';
}

function statusMessage(message = "Roll the Dices to start !!") {
  let text;
  switch (message) {
    case 'roll':
      text = 'Roll the dice';
      break;
    case 'hold':
      text = 'You holded the score'
    case 'load':
      text = 'Please wait...'
      break;
    case 'double':
      text = 'Double Double !!'
      break;
    case 'no-hold':
      text = 'After doubles, you must roll!'
    case 'win':
      text = 'ss' // check the winner and named it with regex
    default:
      text = message;
  }
  gameStatus.textContent = text;
}



//// UI
export function switchPlayerUI() {
  if (!active_player) {
    playerName.classList.add("active");
    cpuName.classList.remove("active");
  }
  else {
    cpuName.classList.add("active");
    playerName.classList.remove("active");
  }


}
function loadingUI() {
  loader.classList.remove('hidden');
  dices.classList.add('hidden');
  // loader.classList.add('active');
}
function showDiceUI(num1, num2) {
  dice0.src = `img/dice-${num1}.png`;
  dice1.src = `img/dice-${num2}.png`;
  dices.classList.remove('hidden');
  loader.classList.add('hidden');
  loader.classList.remove('active');
}

export function rollUI(num1, num2) {
  loadingUI()
  showDiceUI(num1, num2)
  const player = active_player ? current1 : current0
  player.textContent = state.current_score;
  console.log(state.current_score)
}

export function holdUI() {
  const player = active_player ? score1 : score0
  const playerCur = active_player ? current1 : current0
  player.textContent = state.scores[active_player];
  playerCur.textContent = 0;
  console.log(state)
}

export function loseAllUI() {
  const player = active_player ? score1 : score0
  player.textContent = state.scores[active_player];
}