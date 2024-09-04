const state = {
  scores: [0, 0],
  currents: [0, 0],
  last_rolls: [false, false],
  active_player: 0,
}

let playing = true;


function init() {
  state.scores = [0, 0];
  state.currents = [0, 0];
  state.last_rolls = [false, false];
  state.active_player = 0
  playing = true;
}

const change_turn = () => state.active_player = state.active_player === 0 ? 1 : 0;

function keypress_handler(key) {

  switch (key) {
    case 'r':
      roll();
      break;
    case 'h':
      hold();
      break;
    case 'n':
      // new Game
      break;
    case 'Escape':
      break;
    default:
      console.log("please enter a valid input");
  }
}

function startGame() {

  if (playing === true) {
    keypress_handler('r')
  }


}

function roll() {
  const { firstNumber: num1, secondNumber: num2 } = random_dice();
  console.log(num1, num2);

  const result = rull_checker(num1, num2);

  if (result === 'ok') {
    state.currents[state.active_player] += Number(num1 + num2);
  }

  if (result === 'double') {
    state.currents[state.active_player] += Number(num1 + num2);
    // MUST Continue
  }

  if (result === 'lose_turn') {
    state.currents[state.active_player] = 0;
    console.log(state.active_player)
    change_turn()
  }

  if (result === 'lose_scores') {

    state.scores[active_player] = 0;

    state.currents[state.active_player] = 0;
    console.log(state.active_player)
    change_turn()
    // or call lose_turn() to prevent dry principle

  }

  console.log(result)
  console.log(state.active_player)

  if (result === 'double') is_double()
}

function hold() {
  state.scores[active_player] = state.currents[active_player];
  state.currents[active_player] = 0;
  state.active_player = state.active_player === 0 ? 1 : 0;
}

function random_dice() {
  const firstNumber = Math.ceil(Math.random() * 6);
  const secondNumber = Math.ceil(Math.random() * 6);
  return { firstNumber, secondNumber };
}

function rull_checker(num1, num2) {
  if (num1 === num2) return 'double';
  if (num1 + num2 === 7) return 'lose_turn';
  if (num1 === 1 && num2 === 1) return 'lose_scores';
  return 'ok'
}

function is_double() {
  const double_count = state.last_rolls.filter(value => value === true).length;
  if (double_count === 2) {
    state.last_rolls.splice(0, state.last_rolls.length, false, false)
    return;
  }
  state.last_rolls.push(true);
  state.last_rolls.shift();

  // delete this:
  roll()

}
startGame();

function check_winner() {
  if (state.scores[state.active_player] > 100) {
    console.log("we've got a Winner.")
  }

  //move this functionality to roll function:
  if (state.scores[state.active_player] + state.currents[state.active_player] === 100) {
    // Remember: after every roll, the current score updated (if the status == ok), after that the condition must be checked.
    // if the condition checked before that, the current score is not correct
    // LOSE ALL
  }
}