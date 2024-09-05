const state = {
  scores: [0, 0],
  current_score: 0,
  last_rolls: [false, false],
}

let playing = true;
let active_player = 0;
let single_mode = false;
let is_double = false;

function init() {
  state.scores = [0, 0];
  state.current_score = 0;
  state.last_rolls = [false, false];
  active_player = 0
  playing = true;
}

const changeTurn = () => active_player = active_player === 0 ? 1 : 0;

function keyHandler(key) {
  switch (key) {
    case 'r':
      roll();
      break;
    case 'h':
      hold();
      break;
    case 'n':
      // new Game
      console.log('new game');
      init();
      // stop all the current functionality.
      break;
    case 'Escape':
      break;
    default:
      console.log("please enter a valid input");
  }
}

function startGame() {
  if (playing === true) {
    keyHandler('r')
    console.log(state.last_rolls)
  }
}

function roll() {
  const { firstNumber: num1, secondNumber: num2 } = randomDice();

  const result = rullChecker(num1, num2);

  if (result === 'double') {
    state.current_score += Number(num1 + num2);
    double()
    // MUST Continue
  } else {
    is_double = false;
    state.last_rolls.push(false);
    state.last_rolls.shift();

    if (result === 'lose_turn') loseTurn();
    if (result === 'lose_scores') loseAll();
    if (result === 'ok') state.current_score += Number(num1 + num2);
  }
}

function hold() {
  if (!is_double) {
    state.scores[active_player] += state.current_score;
    state.current_score = 0;
    active_player = active_player === 0 ? 1 : 0;
  }
}

function randomDice() {
  const firstNumber = Math.ceil(Math.random() * 6);
  const secondNumber = Math.ceil(Math.random() * 6);
  return { firstNumber, secondNumber };
}

function rullChecker(num1, num2) {
  if (num1 === num2 && num1 !== 1) return 'double';
  if (num1 + num2 === 7) return 'lose_turn';
  if (num1 === 1 && num2 === 1) return 'lose_scores';
  return 'ok'
}

function double() {
  is_double = true;
  const double_count = state.last_rolls.filter(value => value === true).length;
  if (double_count === 2) {
    state.last_rolls.splice(0, state.last_rolls.length, false, false)
    // lose all
    return;
  }
  state.last_rolls.push(true);
  state.last_rolls.shift();

  // delete this:
  roll()

}

function loseTurn() {
  state.current_score = 0;
  changeTurn()
}

function loseAll() {
  state.scores[active_player] = 0;
  loseTurn()
}


startGame();

function checkWinner() {
  if (state.scores[active_player] > 100) {
    endGame()
  }

  //move this functionality to roll function:
  if (state.scores[active_player] + state.current_score === 100) {
    // Remember: after every roll, the current score updated (if the status == ok), after that the condition must be checked.
    // if the condition checked before that, the current score is not correct
    // LOSE ALL
  }
}

function endGame() {
  playing = false;
  console.log("we've got a Winner.")
}

function updateUI({ data }) {
}