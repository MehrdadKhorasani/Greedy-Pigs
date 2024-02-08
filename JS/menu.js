"use strict";

const menuView = document.querySelector(".main-menu");
const gameView = document.querySelector(".main-game");
const instructView = document.querySelector(".main-instruction");

const menuCpu = document.getElementById("menu-item-cpu");
const menuTwo = document.getElementById("menu-item-two");
const menuInstruct = document.getElementById("menu-item-ins");

window.addEventListener("load", function () {
  gameView.classList.add("hiddenView");
  menuView.classList.remove("hiddenView");
});

document.addEventListener("keydown", function (e) {
  if (menuCpu.classList.contains("active-item") && e.key === "ArrowDown") {
    menuCpu.classList.remove("active-item");
    menuTwo.classList.add("active-item");
  } else if (
    menuTwo.classList.contains("active-item") &&
    e.key === "ArrowDown"
  ) {
    menuTwo.classList.remove("active-item");
    menuInstruct.classList.add("active-item");
  } else if (menuTwo.classList.contains("active-item") && e.key === "ArrowUp") {
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
  }

  if (menuInstruct.classList.contains("active-item") && e.key === "Enter") {
    menuView.classList.add("hiddenView");
    instructView.classList.remove("hiddenView");
  }
});
