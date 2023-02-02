'use strict';

// Dom Selecting
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');


//Selecting ELEMENTS
const play1 = $("#score--0");
const play2 = $("#score--1");
const diceImage = $(".dice");
const reset = $(".btn--new");
const roll = $(".btn--roll");
const hold = $(".btn--hold");
let current = 0;
let active_player = 0;
let scores = [0, 0];

//Selecting current using DOM
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//using DOM Selecting
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//switch player
const switchPlay = function(){
  $(`#current--${active_player}`).text('0');
  current = 0;
  active_player = active_player === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Game stop
const gameStop = function(){
  diceImage.addClass("hidden")
  hold.addClass("hidden");
  roll.addClass("hidden");
};


//starting
const init = function () {
  scores = [0, 0];
  current = 0;
  active_player = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceImage.removeClass("hidden")
  hold.removeClass("hidden");
  roll.removeClass("hidden");

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();
diceImage.addClass('hidden');

//Generate Dice Roll
roll.on("click", function(){
  //1. generating a random dice Roll.
  const dice = Math.trunc(Math.random() * 6) + 1;
  //2. Display.
  diceImage.removeClass("hidden");
  diceImage.attr("src", `dice-${dice}.png`);

  //3. check if its 1. if true : switch to next player
  if(dice !== 1){
    //Add dice to current score = 0
    current += dice;
    $(`#current--${active_player}`).text(`${current}`);
  }else{
    //Switch to next player
    switchPlay();
  }
});

hold.on("click", function(){
  //Add current score to active player scores
    if(active_player === 0){
    scores[active_player] += current;
    play1.text(`${scores[active_player]}`);
    $(`#current--${active_player}`).text('0');
}else if(active_player == 1){
    scores[active_player] += current;
    play2.text(`${scores[active_player]}`);
    $(`#current--${active_player}`).text('0');
}
  if(scores[active_player] > 10){
    if(active_player === 0){
      player0El.classList.add('player--winner');
      gameStop();
    }else{
      player1El.classList.add('player--winner');
      gameStop();
    }
  }
  else {
  switchPlay();
}
});

reset.on("click", function(){
  init();
});

$(".details").on("click", function(){
  $(".modal").removeClass('hidden');
  $('.overlay').removeClass('hidden'); // this for the blur thing behind were we using the backdrop-filter thing
});

$(".close-modal").on("click", function(){
  $('.modal').addClass('hidden');
    $('.overlay').addClass('hidden');
  });
