//Allows for console messages to check for bugs
const DEBUG = true;

function logMessage(msg) {
    if (DEBUG) {
        console.log(msg);
    }
};

/*
 * Create a list that holds all of your cards
 */

let cardList = document.getElementsByClassName('card');
let cards = [...cardList];
logMessage(cards);




/* Deck of Cards
 */
let cardDeck = document.getElementById('deck-of-cards');

/* Moves
 */
let moves = 0;
let movesCounter = document.getElementsByClassName('moves');

//Creating stars list
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

let firstClick = true;

function showCards() {
    let cardOne = null;
    let cardTwo = null;

    for (card of cardList) {
        card.addEventListener('click', function () {
            if (firstClick) {
                add();
            }
            firstClick = false;

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
                    displayResults();
                }

            }
        })
    }
};


function addMoves() {
    let numMovesTillDecrement = 15;
    moves++;
    movesCounter[0].innerText = moves;
    if (moves % numMovesTillDecrement == 0) {
        removeStar();
    }

};

//Currently removeStar is running before 5 clicks can be accumulated
let starToSetEmptyIndex = 2;

function removeStar() {
    if (starToSetEmptyIndex > 0)
    {(stars[0].children[starToSetEmptyIndex].children[0].classList.remove("fa-star"),
    stars[0].children[starToSetEmptyIndex].children[0].classList.add("fa-star-o"))
    starToSetEmptyIndex--;}
};


// Stopwatch function from http://jsfiddle.net/oukjfavu/
let timer = document.getElementById("timer");
logMessage(timer);
let seconds = 0,
    minutes = 0,
    hours = 0;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    timer.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
        ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
        ":" + (seconds > 9 ? seconds : "0" + seconds);

    startTimer();
}

function startTimer() {
    t = setTimeout(add, 1000);
}

showCards();




//Modal from w3schools
var modal = document.getElementById('myModal');


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var playAgain = document.getElementById('playAgain');
console.log(playAgain);
playAgain.onclick = function () {
    window.location.reload();
}


//Display Results

let gameResults = document.getElementById('results');
let displayResults = function () {
    clearTimeout(t);
    let tResults = timer.innerHTML;
    let mResults = moves;
    let sResults = document.getElementsByClassName("fa-star").length;
    gameResults.innerHTML = `Took ${tResults} with ${mResults} Moves and ${sResults} Stars.`;
    modal.style.display = 'block';
}










