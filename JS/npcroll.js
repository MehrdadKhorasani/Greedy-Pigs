function performRoll() {
  const firstDice = Math.trunc(Math.random() * 6) + 1;
  const secondDice = Math.trunc(Math.random() * 6) + 1;

  dice0.classList.remove("hidden");
  dice0.src = `img/dice-${firstDice}.png`;
  dice1.classList.remove("hidden");
  dice1.src = `img/dice-${secondDice}.png`;

  const conclusion = ruleChecker(firstDice, secondDice, scores[activePlayer]);

  keyHold.classList.remove("hidden");
  statusBar(
    `${
      activePlayer === 0 ? playerName.textContent : cpuName.textContent
    }'s turn`
  );
  switch (conclusion) {
    case "loseCurrent":
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
      break;
    case "loseTotal":
      scores[activePlayer] = 0;
      document.getElementById(`score--${activePlayer}`).textContent = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
      break;
    case "isDouble":
      keyHold.classList.add("hidden");
      statusBar("Doubles means NO HOLD");
      currentScore += firstDice + secondDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      double = true;
      lastThreeRolls.push("d");
      if (lastThreeRolls.length >= 3) {
        scores[activePlayer] = 0;
        document.getElementById(`score--${activePlayer}`).textContent = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        statusBar("Three Doubles means 0");
        keyHold.classList.add("hidden");
        keyRoll.classList.add("hidden");

        setTimeout(() => {
          switchPlayer();
        }, 2000);
      }
      break;
    case "OK":
      double = false;
      currentScore += firstDice + secondDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      if (currentScore + scores[activePlayer] === 100) {
        scores[activePlayer] = 0;
        document.getElementById(`score--${activePlayer}`).textContent = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        switchPlayer();
        break;
      }
  }
}
