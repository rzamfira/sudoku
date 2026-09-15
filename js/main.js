import { createLayout } from './ui/appLayout.js';
import { initializeGame } from './state.js';
import { renderGrid } from './ui/grid.js';
import { generateSudokuGame } from './sudokuGenerator.js';


createLayout(); // initialize grid & controls panel
let puzzle = generateSudokuGame();
let currentState = initializeGame(puzzle); // generate the default sudoku values for a new game

const grid = document.querySelector('.grid-section');

const newGameButton = document.querySelector('.new-game-button');
newGameButton.addEventListener('click', () => {
    puzzle = generateSudokuGame();
    currentState = initializeGame(puzzle);
});

grid.addEventListener('click', (event) => {
    if (event.target.classList.contains('grid-item')) {
        currentState.setSelectedCell(event.target);
        renderGrid(currentState);
    }
});

document.addEventListener('keydown', (event) => {

    if (event.key >= '1' && event.key <= '9') {
        currentState.cellChange(event.key);
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
        currentState.cellChange();
    }
});

const numpad = document.querySelector('.numpad-section');
numpad.addEventListener('click', (event) => {
    if (event.target.classList.contains('numpad-button')) {
        currentState.cellChange(event.target.dataset.value);
    }
});

const eraseButton = document.querySelector('#erase-button');
eraseButton.addEventListener('click', () => {
    currentState.cellChange();
});




