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


// set variables
let firstCard;
let secondCard;
let currentTurn = false;
let score = 0;

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

  let current = e.target;

  if (currentTurn) {
    return;
  }

  if (current.classList.contains('correct')) {
    return;
  }

  flipCard(current);

  if (firstCard === undefined) {
    firstCard = current;
    score++;
  } else if (secondCard === undefined) {
    secondCard = current;
    score++;
  }
  if (firstCard && secondCard){
    if ((firstCard.className) === (secondCard.className)) {
      firstCard.setAttribute('class', 'correct');
      secondCard.setAttribute('class', 'correct');
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
      firstCard = undefined;
      secondCard = undefined;
      currentTurn = false;
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