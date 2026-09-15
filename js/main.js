import { createLayout } from './ui/appLayout.js';
import { initializeState } from './state.js';
import { renderGrid } from './ui/grid.js';
import { generateSudokuGame } from './sudokuGenerator.js';
import { highlightSelected } from './ui/highlight.js';

let puzzle = generateSudokuGame();
let currentState = initializeState(puzzle);

createLayout(); // initialize grid & controls panel
renderGrid(currentState); // generate the default sudoku values for a new game

const grid = document.querySelector('.grid-section');

const newGameButton = document.querySelector('.new-game-button');
newGameButton.addEventListener('click', () => {
    puzzle = generateSudokuGame();
    currentState = initializeState(puzzle);
    renderGrid(currentState);
});

grid.addEventListener('click', (event) => {
    if (event.target.classList.contains('grid-item')) {
        currentState.setSelectedCell(event.target);
        highlightSelected(grid, event.target);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key >= '1' && event.key <= '9') {
        currentState.cellChange({ type: 'insert-value', value: event.key });
        renderGrid(currentState);
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
        currentState.cellChange({ type: 'erase-value' });
        renderGrid(currentState);
    }
});

const numpad = document.querySelector('.numpad-section');
numpad.addEventListener('click', (event) => {
    if (event.target.classList.contains('numpad-button')) {
        currentState.cellChange({ type: 'insert-value', value: event.target.dataset.value });
        renderGrid(currentState);
    }
});

const eraseButton = document.querySelector('#erase-button');
eraseButton.addEventListener('click', () => {
    currentState.cellChange({ type: 'erase-value' });
    renderGrid(currentState);
});




