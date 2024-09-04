// variables:
let playing = false;

//views
const menuView = document.querySelector(".main-menu");
const gameView = document.querySelector(".main-game");
const instructView = document.querySelector(".main-instruction");

// Menu Options
const menuCpu = document.getElementById("menu-item-cpu");
const menuTwo = document.getElementById("menu-item-two");
const menuInstruct = document.getElementById("menu-item-ins");

export default function () {
  playing = true;
}

function activeTab() {
  return menuCpu.classList.contains('active-item') ? 'cpu' : menuTwo.classList.contains('active-item') ? 'two_player' : 'instruct'
}

function menuKeyListener(e) {
  if (menuView.classList.contains('hiddenView')) return;

  let key = '';
  const active_tab = activeTab();
  if (e.key === 'ArrowDown') key = 'down';
  else if (e.key === 'ArrowUp') key = 'up';
  else if (e.key === 'Enter') key = 'enter';
  else return;

  menuFunction(key, active_tab);
}

function menuFunction(keydown, active_tab) {
  if (keydown === 'down') {
    if (active_tab === 'cpu') {
      menuTwo.classList.add('active-item');
      menuCpu.classList.remove('active-item');
      menuInstruct.classList.remove('active-item');
    }
    else if (active_tab === 'two_player') {
      menuInstruct.classList.add('active-item');
      menuTwo.classList.remove('active-item');
      menuCpu.classList.remove('active-item');
    }
  }
  else if (keydown === 'up') {
    if (active_tab === 'two_player') {
      menuCpu.classList.add('active-item');
      menuInstruct.classList.remove('active-item');
      menuTwo.classList.remove('active-item');
    }
    if (active_tab === 'instruct') {
      menuTwo.classList.add('active-item');
      menuCpu.classList.remove('active-item');
      menuInstruct.classList.remove('active-item');
    }
  }
  else if (keydown === 'enter') {
    active_tab === 'instruct' ? instructFunction() : gameFunction();
  }
  else {
    return;
  }
}

function instructFunction() {
  menuView.classList.add('hiddenView');
  gameView.classList.add('hiddenView');
  instructView.classList.remove('hiddenView');

  document.removeEventListener('keydown', menuKeyListener)
  document.addEventListener('keydown', backToMenu);
}

function gameFunction() {
  menuView.classList.add('hiddenView');
  gameView.classList.remove('hiddenView');
  instructView.classList.add('hiddenView');

  document.removeEventListener('keydown', menuKeyListener);
  document.addEventListener('keydown', backToMenu);
}

function menu() {
  menuView.classList.remove('hiddenView');
  gameView.classList.add('hiddenView');
  instructView.classList.add('hiddenView');

  document.addEventListener('keydown', menuKeyListener);
  document.removeEventListener('keydown', backToMenu);
}

function backToMenu(e) {
  e.key === "Escape" && menu();
}

document.addEventListener('keydown', menuKeyListener)