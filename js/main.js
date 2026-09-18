import { createLayout } from './ui/appLayout.js';
import { initializeGame } from './state.js';
import { generateSudokuGame } from './sudokuGenerator.js';


createLayout();
let puzzle = generateSudokuGame();
let currentState = initializeGame(puzzle);

const grid = document.querySelector('.grid-section');
const controlsPanel = document.querySelector('.controls-section');

document.addEventListener('keydown', (event) => {

    if (event.key >= '1' && event.key <= '9') {
        currentState.cellChange(event.key);
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
        currentState.cellChange();
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' ||
        event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        currentState.setSelectedCell(event.key);
    }

});

grid.addEventListener('click', (event) => {
    if (event.target.classList.contains('grid-item')) {
        currentState.setSelectedCell(event.target);
    }
});

const newGameButton = controlsPanel.querySelector('.new-game-button');
newGameButton.addEventListener('click', () => {
    puzzle = generateSudokuGame();
    currentState = initializeGame(puzzle);
});


const numpad = controlsPanel.querySelector('.numpad-section');
numpad.addEventListener('click', (event) => {
    if (event.target.classList.contains('numpad-button')) {
        currentState.cellChange(event.target.dataset.value);
    }
});

const eraseButton = controlsPanel.querySelector('#erase-button');
eraseButton.addEventListener('click', () => {
    currentState.cellChange();
});

const notesButton = controlsPanel.querySelector('#notes-button');
notesButton.addEventListener('click', (event) => {
    currentState.toggleNotesMode(event.target);
});




