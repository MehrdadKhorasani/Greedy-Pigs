import { instruction_view, instructionUI } from "./instruction_UI.js";
import { game_view } from "./game_UI.js";
import { gameFunction } from "./game.js";

// View:
export const menu_view = document.querySelector('.main-menu');
// Menu Options:
export const menu_item_cpu = document.querySelector('#menu-item-cpu')
export const menu_item_two = document.querySelector('#menu-item-two')
export const menu_item_ins = document.querySelector('#menu-item-ins')

export function initMenu() {
  menu_view.classList.remove('hiddenView');
  game_view.classList.add('hiddenView');
  instruction_view.classList.add('hiddenView');
}

export function menuUIChange(key, active_tab) {
  if (key === 'down') {
    if (active_tab === 'cpu') {
      menu_item_two.classList.add('active-item');
      menu_item_cpu.classList.remove('active-item');
      menu_item_ins.classList.remove('active-item');
    }
    else if (active_tab === 'two_player') {
      menu_item_ins.classList.add('active-item');
      menu_item_two.classList.remove('active-item');
      menu_item_cpu.classList.remove('active-item');
    }
  }
  else if (key === 'up') {
    if (active_tab === 'two_player') {
      menu_item_cpu.classList.add('active-item');
      menu_item_ins.classList.remove('active-item');
      menu_item_two.classList.remove('active-item');
    }
    if (active_tab === 'instruct') {
      menu_item_two.classList.add('active-item');
      menu_item_cpu.classList.remove('active-item');
      menu_item_ins.classList.remove('active-item');
    }
  }
  else if (key === 'enter') {
    active_tab === 'instruct' ? instructionUI() : gameFunction();
  }
  else {
    return;
  }
}