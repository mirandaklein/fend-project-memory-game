/*
 * Create a list that holds all of your cards
 */

let cardList = document.getElementsByClassName('card');
let cards = [...cardList];
logMessage(cards);


const DEBUG = false;
function logMessage(msg) {
    if (DEBUG)
        console.log(msg);
}


/* Deck of Cards
 */
let cardDeck = document.getElementById('deck-of-cards');

/* Moves
 */
let moves = 0;
let movesCounter = document.getElementsByClassName('moves');

let stars = document.getElementsByClassName('stars');


var openCards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

function startGame() {
    let shuffledCards = shuffle(cards);
    for (let c of cards) {
        c.remove();
    }

    for (let c of shuffledCards) {
        cardDeck.appendChild(c);
    }

};
startGame();



//Restarts game and shuffles
const restartGame = document.getElementsByClassName('restart');
restartGame[0].children[0].addEventListener('click', function () {
    window.location.reload();
});


//Compares cards to find matching
function compareClassNames(c1, c2) {
    return c1 === c2;
};

function showCards() {
    let cardOne = null;
    let cardTwo = null;

    for (card of cardList) {
        card.addEventListener('click', function () {
            addMoves();
            if (!cardOne) {
                cardOne = this;
                this.classList.toggle('open');
                this.classList.toggle('show');
                openCards.push(this);
            } else {
                cardTwo = this;
                this.classList.toggle('open');
                this.classList.toggle('show');
                openCards.push(this);
                if (compareClassNames(cardOne.children[0].className,
                        cardTwo.children[0].className)) {
                    cardOne.classList.toggle("match");
                    cardTwo.classList.toggle("match");
                    cardOne = null;
                    cardTwo = null;
                } else {
                    setTimeout(function () {
                        cardOne.classList.remove("open");
                        cardOne.classList.remove("show");
                        cardTwo.classList.remove("open");
                        cardTwo.classList.remove("show");
                        openCards.pop();
                        openCards.pop();
                        cardOne = null;
                        cardTwo = null;
                    }, 350);

                }
                if (openCards.length === 16) {
                    alert('win');
                }
            }
        })
    }
};


function addMoves() {
    let numMovesTillDecrement = 3;
    moves++;
    movesCounter[0].innerText = moves;
    if (moves % numMovesTillDecrement == 0) {
        removeStar();
    }

};

//Currently removeStar is running before 5 clicks can be accumulated
let starToSetEmptyIndex = 2;

function removeStar() {
    stars[0].children[starToSetEmptyIndex].children[0].classList.remove("fa-star");
    stars[0].children[starToSetEmptyIndex].children[0].classList.add("fa-star-o");
    starToSetEmptyIndex--;
};

showCards();



//Add Timer

//Add win screen













/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */