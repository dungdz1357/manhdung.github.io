'use strict';

//Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
console.log(btnRoll);
//Khai báo sẽ dùng 4 biến này ở ngoài các hàm, để khi
let activePlayer, playing, currentScore, scores;
//Rolling dice functionality
const init = function () {
  //set active player ban đầu = 0 vì đây là vị trí ng chơi số 1, sau này switch sang 1 để thành ng chơi thứ 2
  activePlayer = 0;
  playing = true;
  currentScore = 0;
  scores = [0, 0];

  current0El.textContent = 0;
  current1El.textContent = 0;
  //Starting Conditions
  //Set điểm của 2 người chơi ban đầu là 0
  score0El.textContent = 0;
  score1El.textContent = 0;

  //Thêm class hidden vào đây để!??
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Switch màu của nền khi chuyển người chơi
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Check for rolled 1
    if (dice !== 1) {
      //Add dice to the current player's score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (dice === 1) {
      // if true, switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to activate player's score
    // scores là mảng, nhưng từng phần tử lại trả về điểm của người chơi thứ i, bây giờ ta cộng dồn điểm đó(currentScore) vào score[activePlayer]
    scores[activePlayer] += currentScore;
    // console.log(
    //   `Current player is ${activePlayer + 1} has score: ${scores[activePlayer]}`
    // );
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Check if player's score is >=100;
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      //thêm vào class currentplayer class player--winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //Và bỏ đi class player--active
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //Finish the game
      //Switch to the next player
    } else switchPlayer();
  }
});
btnNew.addEventListener('click', init);
