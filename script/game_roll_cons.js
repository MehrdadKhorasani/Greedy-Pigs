import { setIsDouble, addLastRoll, addCurrentScore, state, active_player } from "./game.js";

// if the roll was usual
export function rollOk(num1, num2) {
  addCurrentScore(num1, num2);
  setIsDouble(false);
  addLastRoll()
}

// player loses the turn (7)
export function loseTurn() {
  state.current_score = 0;
  setIsDouble(false);
  addLastRoll()
}

// player loses the turn and all the score (double 1 or 100)
export function loseAll() {
  setIsDouble(false);
  addLastRoll()
  state.scores[active_player] = 0;
  loseTurn()
}

// fn: if the players get doubles (except double 1)
export function double(num1, num2) {
  setIsDouble(true);

  const double_count = state.last_rolls.filter(value => value === true).length;
  if (double_count === 2) {
    state.last_rolls.splice(0, state.last_rolls.length, false, false)
    loseAll()
    return;
  }

  addCurrentScore(num1, num2);
  addLastRoll();
}
