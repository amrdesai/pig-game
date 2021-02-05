'use strict';

// Variables
const p1El = document.querySelector('.player--0');
const p2El = document.querySelector('.player--1');
const p1ScoreEl = document.getElementById('score--0');
const p1CurrentScoreEl = document.getElementById('current--0');
const p2ScoreEl = document.getElementById('score--1');
const p2CurrentScoreEl = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdScoreBtn = document.querySelector('.btn--hold');

// Scores
let scores = [0, 0]; // index: 0 = player 1 score & index: 1 = player 2 score
let currentScore = 0;
let activePlayer = 0;

// Function: Reset Scores & start new game
const startGame = () => {
    // Remove winner class
    if (
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.contains('player--winner')
    ) {
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--winner');
    }

    // Reset scores to 0
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    // Clear scores in UI
    p1ScoreEl.textContent = scores[0];
    p1CurrentScoreEl.textContent = currentScore;
    p2ScoreEl.textContent = scores[1];
    p2CurrentScoreEl.textContent = currentScore;

    // Hide dice
    diceEl.classList.add('hidden');

    // Switch active player to player1 in UI
    if (p2El.classList.contains('player--active')) switchActivePlayer();

    // Enable buttons
    if (rollDiceBtn.classList.contains('disabled')) toggleButtons();
};

// Function: Roll Dice & Display to UI
const rollDice = () => {
    // Generate random dice number
    const randomDice = Math.trunc(Math.random() * 6 + 1);
    // Update image
    diceEl.setAttribute('src', `images/dice-${randomDice}.png`);
    // Display to UI
    diceEl.classList.remove('hidden');
    // return dice
    return randomDice;
};

// Function: Switch active player
const switchActivePlayer = () => {
    // switch actice player logic
    activePlayer = activePlayer === 0 ? 1 : 0;
    // change UI
    p1El.classList.toggle('player--active');
    p2El.classList.toggle('player--active');
};

// Function: Update player's current score
const updateCurrentScore = () => {
    activePlayer === 0
        ? (p1CurrentScoreEl.textContent = currentScore)
        : (p2CurrentScoreEl.textContent = currentScore);
};

// Function: Hold Score
const holdScore = () => {
    scores[activePlayer] += currentScore;
    const activePlayerScoreEL = document.getElementById(
        `score--${activePlayer}`
    );
    activePlayerScoreEL.textContent = scores[activePlayer];
    clearCurrentScore();
    // Switch player only if game isn't over
    if (!checkIfGameOver()) switchActivePlayer();
};

// Function: Clear current score
const clearCurrentScore = () => {
    currentScore = 0;
    p1CurrentScoreEl.textContent = currentScore;
    p2CurrentScoreEl.textContent = currentScore;
};

// Function: Check if game over
const checkIfGameOver = () => {
    if (scores[activePlayer] >= 100) {
        // Disable roll dice & hold btn and change styles
        toggleButtons();
        // Add winner class
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
        return true;
    }
};

// Function: Enable/Disable buttons
const toggleButtons = () => {
    rollDiceBtn.disabled = rollDiceBtn.disabled ? false : true;
    holdScoreBtn.disabled = holdScoreBtn.disabled ? false : true;
    rollDiceBtn.classList.toggle('disabled');
    holdScoreBtn.classList.toggle('disabled');
};

// Event Listener: Roll dice btn event
rollDiceBtn.addEventListener('click', () => {
    const dice = rollDice();

    // Continue if dice !== 1
    if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        updateCurrentScore();
    } else {
        // Switch to next player
        clearCurrentScore();
        switchActivePlayer();
    }
});

// Event Listener: Hold score btn event
holdScoreBtn.addEventListener('click', holdScore);

// Event Listener: New Game btn
newGameBtn.addEventListener('click', startGame);

// Game Start on pageload
startGame();
