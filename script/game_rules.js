// fn: check the rulls of the game:
export function rullChecker(num1, num2) {
  if (num1 === num2 && num1 !== 1) return 'double';
  else if (num1 + num2 === 7) return 'lose_turn';
  else if (num1 === 1 && num2 === 1) return 'lose_scores';
  else return 'ok'
}