import { menu_view } from './menu_UI.js'
import { single_mode } from './game.js';
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