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

    if (event.key >= '1' && event.key <= '9') {
        currentState.updateCell(event.key);
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
        currentState.updateCell();
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' ||
        event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        currentState.selectedCell = getNextCellCoordinates(currentState.selectedCell, event.key);
    }

});

grid.addEventListener('click', (event) => {
    if (event.target.classList.contains('grid-item')) {
        currentState.selectedCell = getCellCoordinates(event.target);
    }
});

const newGameButton = controlsPanel.querySelector('.new-game-button');
newGameButton.addEventListener('click', () => {
    puzzle = generateSudokuGame();
    currentState = initializeGame(puzzle);
    currentState.startGameTimer();
});


const numpad = controlsPanel.querySelector('.numpad-section');
numpad.addEventListener('click', (event) => {
    if (event.target.classList.contains('numpad-button')) {
        currentState.updateCell(event.target.dataset.value);
    }
});

const undoButton = controlsPanel.querySelector('#undo-button');
undoButton.addEventListener('click', () => { currentState.undoChange() });

const eraseButton = controlsPanel.querySelector('#erase-button');
eraseButton.addEventListener('click', () => { currentState.updateCell() });

const notesButton = controlsPanel.querySelector('#notes-button');
notesButton.addEventListener('click', () => { currentState.toggleNotesMode() });

const pauseButton = controlsPanel.querySelector('.pause-button');
pauseButton.addEventListener('click', () => { currentState.togglePlayMode() });




