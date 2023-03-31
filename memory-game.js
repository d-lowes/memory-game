"use strict";

const COLORS = [
  "red", "blue", "green", "orange", "purple", "grey", "yellow", "brown",
  "red", "blue", "green", "orange", "purple", "grey", "yellow", "brown"
];

const colors = shuffle(COLORS);

createCards(colors);

function shuffle(items) {

  for (let i = items.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}


/* CREATE CARD FOR EACH COLOR */

function createCards(colors) {

  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let card = document.createElement('div');
    card.classList.add(color);
    gameBoard.appendChild(card);
    card.addEventListener('click', handleCardClick);
  }
}


/* SET CARD VARIABLES */

let firstCard;
let secondCard;
let currentTurn = false;
let matches = 0;
let scoreTotal = 0;


/* CREATE SCOREBOARD WITH HIGH SCORE SAVED TO LOCAL STORAGE*/

let lowestScoreStored = localStorage.getItem("lowestScore");


if (Number(lowestScoreStored) === 0) {
  lowestScoreStored = Infinity;
}


const scoreBoard = document.getElementsByClassName('score-board');
const score = document.getElementById('score');
const lowest = document.getElementById('lowest-score');
score.innerHTML = `SCORE: `;
lowest.innerHTML = `BEST SCORE: `;

if (lowestScoreStored !== Infinity) {
  lowest.innerHTML = `BEST SCORE: ${lowestScoreStored}`;
}


function saveScore() {

  if(lowestScoreStored){
    if (scoreTotal < Number(lowestScoreStored)) {
        localStorage.setItem("lowestScore", scoreTotal);
    }
  }
  else{
    localStorage.setItem("lowestScore", scoreTotal);
  }
}


/* FLIP CARD */

function flipCard(card) {
  card.style.backgroundColor = `${card.classList[0]}`;
}


/* UN-FLIP CARD */

function unFlipCard(card) {
  card.style.backgroundColor = '';
}


/* HANDLE CARD CLICKS */

function handleCardClick(e) {
  scoreTotal++;

  score.innerHTML = `SCORE: ${scoreTotal}`;

  let current = e.target;

  if (currentTurn) {
    return;
  }

  flipCard(current);

  if (current === firstCard) {
    return;
  }

  if (firstCard === undefined) {
    firstCard = current;
  } else if (secondCard === undefined) {
    secondCard = current;
  }
  if (firstCard && secondCard){

    currentTurn = true;

    if ((firstCard.className) === (secondCard.className)) {
      matches++;
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
      firstCard = undefined;
      secondCard = undefined;
      currentTurn = false;

      /* ADD DELAY AFTER COMPLETED GAME TO ALLOW REFRESH */

      setTimeout(function() {

        if (matches === (colors.length/2)) {
          saveScore();
          if(!alert(`Your score is ${scoreTotal}! Click OK to play again!`)) {
            window.location.reload();
          }
        }
      }, 300);

    } else if (firstCard.className !== secondCard.className) {

      setTimeout(function() {
        unFlipCard(firstCard);
        unFlipCard(secondCard);
        firstCard = undefined;
        secondCard = undefined;
        currentTurn = false;
      }, 1200);

    }
  }
}