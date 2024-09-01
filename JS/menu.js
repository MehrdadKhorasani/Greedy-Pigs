// variables:
let playing = false;

//views
const mainMenu = document.querySelector(".main_menu");
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

!playing && document.addEventListener('keydown', function (e) {
  let key = '';
  const active_tab = activeTab();
  if (e.key === 'ArrowDown') key = 'down';
  else if (e.key === 'ArrowUp') key = 'up';
  else if (e.key === 'Enter') key = 'enter';
  else return;
  menuFunction(key, active_tab);
})

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
  } else if (keydown === 'up') {
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
  } else if (keydown === 'enter') {
    console.log(active_tab);
  } else {
    return;
  }
}