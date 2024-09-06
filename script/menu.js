import { menuUIChange, menu_view, menu_item_cpu, menu_item_two } from './menu_UI.js'

export function menuFunction(e) {
  if (menu_view.classList.contains('hiddenView')) return;

  let key = '';
  const active_tab = activeTab();
  if (e.key === 'ArrowDown') key = 'down';
  else if (e.key === 'ArrowUp') key = 'up';
  else if (e.key === 'Enter') key = 'enter';
  else return;

  menuUIChange(key, active_tab);

}

function activeTab() {
  return menu_item_cpu.classList.contains('active-item') ? 'cpu' : menu_item_two.classList.contains('active-item') ? 'two_player' : 'instruct'
}



document.addEventListener('keydown', menuFunction)