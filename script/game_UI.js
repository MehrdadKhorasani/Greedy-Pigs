import { menu_view } from './menu_UI.js'
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
}