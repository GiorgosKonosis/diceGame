'use strict';

const score0Ele = document.getElementById('score--0');
const score1Ele = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const holdScore = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  currentScore0.textContent = currentScore;
  currentScore1.textContent = currentScore;

  diceEl.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

diceEl.classList.add('hidden');
rollDice.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    let diceNumber = Math.round(Math.random() * 5 + 1);
    diceEl.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
holdScore.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
newGame.addEventListener('click', function () {
  init();
});
