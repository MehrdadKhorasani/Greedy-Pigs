// variables:
let isMenu = false;

//views
const mainMenu = document.querySelector(".main_menu");
const gameView = document.querySelector(".main-game");
const instructView = document.querySelector(".main-instruction");

// Menu Options
const menuCpu = document.getElementById("menu-item-cpu");
const menuTwo = document.getElementById("menu-item-two");
const menuInstruct = document.getElementById("menu-item-ins");

export default function () {
  isMenu = true;


}

function activeTab() {
  return menuCpu.classList.contains('active-item') ? 'cpu' : menuTwo.classList.contains('active-item') ? 'two_player' : 'instruct'
}

document.addEventListener('keydown', function (e) {
  let key = '';
  const active_tab = activeTab();
  if (e.key === 'ArrowDown') key = 'down';
  else if (e.key === 'ArrowUp') key = 'up';
  else if (e.key === 'Enter') key = 'enter';
  else return;
  console.log('ss')

  menuFunction(key, active_tab);
})

function menuFunction(keydown, active_tab) {
  switch (keydown, active_tab) {
    case 'down' && 'cpu':
      menuTwo.classList.add('active-item')
      break
  }
}