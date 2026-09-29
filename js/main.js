import { createLayout } from './ui/appLayout.js';
import { initializeGame } from './state.js';
import { generateSudokuGame } from './sudokuGenerator.js';
import { getCellCoordinates, getNextCellCoordinates } from './puzzle.js';

createLayout();
let puzzle = generateSudokuGame();
let currentState = initializeGame(puzzle);

const grid = document.querySelector('.grid-section');
const controlsPanel = document.querySelector('.controls-section');

document.addEventListener('keydown', (event) => {

    const isNumber = event.key >= '1' && event.key <= '9';
    const isEraseKey = event.key === 'Backspace' || event.key === 'Delete';

    const isArrowKey = event.key === 'ArrowUp' || event.key === 'ArrowDown' ||
        event.key === 'ArrowLeft' || event.key === 'ArrowRight';

    if (!isNumber && !isEraseKey && !isArrowKey) {
        return;
    }

    if (currentState.isPaused) {
        return currentState.togglePause();
    }

    if (isNumber) {
        return currentState.updateCell(event.key);
    }

    if (isEraseKey) {
        return currentState.updateCell();
    }

    if (isArrowKey) {
        currentState.selectedCell = getNextCellCoordinates(currentState.selectedCell, event.key);
    }

});

const newGameButton = controlsPanel.querySelector('.new-game-button');
newGameButton.addEventListener('click', () => {
    puzzle = generateSudokuGame();
    currentState = initializeGame(puzzle);
});

const pauseButton = controlsPanel.querySelector('.pause-button');
pauseButton.addEventListener('click', () => { currentState.togglePause(); });

grid.addEventListener('click', (event) => {

    if (!event.target.classList.contains('grid-item')) {
        return;
    }

    if (currentState.isPaused) {
        return currentState.togglePause();
    }
    currentState.selectedCell = getCellCoordinates(event.target);

});

const numpad = controlsPanel.querySelector('.numpad-section');
numpad.addEventListener('click', (event) => {

    if (!event.target.classList.contains('numpad-button')) {
        return;
    }

    if (currentState.isPaused) {
        return currentState.togglePause();
    }
    currentState.updateCell(event.target.dataset.value);

});

const undoButton = controlsPanel.querySelector('#undo-button');
undoButton.addEventListener('click', () => {

    if (currentState.isPaused) {
        return currentState.togglePause();
    }
    currentState.undoChange();

})

const eraseButton = controlsPanel.querySelector('#erase-button');
eraseButton.addEventListener('click', () => {

    if (currentState.isPaused) {
        return currentState.togglePause();
    }
    currentState.updateCell();

})

const notesButton = controlsPanel.querySelector('#notes-button');
notesButton.addEventListener('click', () => {

    if (currentState.isPaused) {
        return currentState.togglePause();
    }
    currentState.toggleNotesEnabled();

})