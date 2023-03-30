"use strict";

const FOUND_MATCH_WAIT_MSECS = 1000;
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


/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {

  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let card = document.createElement('div');
    card.classList.add(color);
    gameBoard.appendChild(card);
    card.addEventListener('click', handleCardClick);
  }
}


/* Set card variables */

let firstCard;
let secondCard;
let currentTurn = false;
let matches = 0;


/* Create local storage scoreboard (work in progress)*/

let score = 0;
// let lowestScore = localStorage.getItem("lowestScore");

// if(lowestScore !== null){
//   if (score < lowestScore) {
//       localStorage.setItem("lowestScore", score);
//   }
// }
// else{
//   localStorage.setItem("lowestScore", score);
// }

// scoreBoard();

// function scoreBoard(lowestScore) {
//   let scoreBoard = document.getElementById('score');
//   scoreBoard.appendChild(lowestScore);
// }


/** Flip a card face-up. */

function flipCard(card) {
  card.style.backgroundColor = `${card.classList[0]}`;
}


/** Flip a card face-down. */

function unFlipCard(card) {
  card.style.backgroundColor = '';
}


/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(e) {
  score++;

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

      // add delay so card gets colored before the prompt
      setTimeout(function() {
        if (matches === (colors.length/2)) {
        // alert(`GAME COMPLETE! SCORE: ${score}`);
        // }
          if(!alert(`GAME COMPLETE! SCORE: ${score}`)) {
            window.location.reload();
          }
        }
      });

    } else if (firstCard.className !== secondCard.className) {

      setTimeout(function() {
        unFlipCard(firstCard);
        unFlipCard(secondCard);
        firstCard = undefined;
        secondCard = undefined;
        currentTurn = false;
      }, 1000);

    }
  }
}