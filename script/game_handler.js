import { game_view } from './game_UI.js'
import { roll, hold, newGame, exitGame } from './game.js';

// fn: handling the key events
export function keyHandler(e) {
  if (game_view.classList.contains('hiddenView')) return;

  if (e.key === 'r') roll();
  else if (e.key === 'h') hold();
  else if (e.key === 'n') newGame();
  else if (e.key === 'Escape') exitGame();
  else console.log("please enter a valid input");
}
