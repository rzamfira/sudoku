import { createLayout } from './ui/appLayout.js';
import { initializeGame } from './state.js';
import { generateSudokuGame } from './sudokuGenerator.js';
import { getCellCoordinates, getNextCellCoordinates } from './puzzle.js';

createLayout();
let puzzle = generateSudokuGame();
let currentState = initializeGame(puzzle);
currentState.startGameTimer();

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
        currentState.togglePause();
    }

    if (isNumber) {
        currentState.updateCell(event.key);
    }
    else if (isEraseKey) {
        currentState.updateCell();
    }
    else if (isArrowKey) {
        currentState.selectedCell = getNextCellCoordinates(currentState.selectedCell, event.key);
    }

});

const newGameButton = controlsPanel.querySelector('.new-game-button');
newGameButton.addEventListener('click', () => {
    puzzle = generateSudokuGame();
    currentState = initializeGame(puzzle);
    currentState.startGameTimer();
});

const pauseButton = controlsPanel.querySelector('.pause-button');
pauseButton.addEventListener('click', () => { currentState.togglePause(); });

grid.addEventListener('click', (event) => {

    if (!event.target.classList.contains('grid-item')) {
        return;
    }

    if (currentState.isPaused) {
        currentState.togglePause();
    } else {
        currentState.selectedCell = getCellCoordinates(event.target);
    }

});

const numpad = controlsPanel.querySelector('.numpad-section');
numpad.addEventListener('click', (event) => {

    if (!event.target.classList.contains('numpad-button')) {
        return;
    }

    if (currentState.isPaused) {
        currentState.togglePause();
    } else {
        currentState.updateCell(event.target.dataset.value);
    }


});

const gameActionSection = controlsPanel.querySelector('.game-action-section');
gameActionSection.addEventListener('click', (event) => {

    if (!event.target.classList.contains('game-action-button')) {
        return;
    }

    if (currentState.isPaused) {
        currentState.togglePause();
    } else {

        if (event.target.dataset.action === 'undo') {
            currentState.undoChange();
        } else if (event.target.dataset.action === 'erase') {
            currentState.updateCell();
        } else if (event.target.dataset.action === 'notes') {
            currentState.toggleNotesEnabled();
        }

    }

});






