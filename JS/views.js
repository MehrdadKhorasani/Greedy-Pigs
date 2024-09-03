/*
Module Name: views.js

Purpose: Handle all the DOM elements related to views (menu, game, instructions) and menu items. This module will be responsible for showing/hiding views and managing the state of the UI elements.

Functions/Variables:
showMenuView(), showGameView(), showInstructionView()

getActiveMenuItem(), setActiveMenuItem()

DOM elements: menuView, gameView, instructView, menuCpu, menuTwo, menuInstruct
*/


// views.js
export const menuView = document.querySelector(".main-menu");
export const gameView = document.querySelector(".main-game");
export const instructView = document.querySelector(".main-instruction");

// Menu Items
export const menuCpu = document.getElementById("menu-item-cpu");
export const menuTwo = document.getElementById("menu-item-two");
export const menuInstruct = document.getElementById("menu-item-ins");

// Game Elements
export const score0 = document.getElementById("score--0");
export const score1 = document.getElementById("score--1");
export const current0 = document.getElementById("current--0");
export const current1 = document.getElementById("current--1");
export const gameStatus = document.querySelector(".status-bar");

export const playerName = document.getElementById("name--0");
export const cpuName = document.getElementById("name--1");

export const loader = document.querySelector(".loader-holder");
export const dices = document.querySelector(".dice-holder");

export const dice0 = document.getElementById("dice--0");
export const dice1 = document.getElementById("dice--1");

export const keyNew = document.querySelector(".key--new");
export const keyRoll = document.querySelector(".key--roll");
export const keyHold = document.querySelector(".key--hold");

// Functions to show/hide views
export function showMenuView() {
  menuView.classList.remove("hiddenView");
  gameView.classList.add("hiddenView");
  instructView.classList.add("hiddenView");
}

export function showGameView() {
  gameView.classList.remove("hiddenView");
  menuView.classList.add("hiddenView");
  instructView.classList.add("hiddenView");
}

export function showInstructionView() {
  instructView.classList.remove("hiddenView");
  menuView.classList.add("hiddenView");
  gameView.classList.add("hiddenView");
}

// Function to manage active menu items
export function setActiveMenuItem(item) {
  menuCpu.classList.remove("active-item");
  menuTwo.classList.remove("active-item");
  menuInstruct.classList.remove("active-item");

  item.classList.add("active-item");
}

export function getActiveMenuItem() {
  if (menuCpu.classList.contains("active-item")) return "cpu";
  if (menuTwo.classList.contains("active-item")) return "two_player";
  if (menuInstruct.classList.contains("active-item")) return "instruct";
}
