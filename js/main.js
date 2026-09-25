import { createLayout } from './ui/appLayout.js';
import { initializeGame } from './state.js';
import { generateSudokuGame } from './sudokuGenerator.js';
import { getCellCoordinates, getNextCellCoordinates } from './puzzle.js';


createLayout();
let puzzle = generateSudokuGame();
let currentState = initializeGame(puzzle);
currentState.startGameTimer();

const gameLayout = document.querySelector('.game-layout');

document.addEventListener('keydown', (event) => {

    if (currentState.playMode) {
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
    }
    else { currentState.togglePlayMode(); }

});

gameLayout.addEventListener('click', (event) => {

    const pauseButton = event.target.closest('.pause-button');
    if (pauseButton) {
        currentState.togglePlayMode();
        return;
    }

    const newGameButton = event.target.closest('.new-game-button');
    if (newGameButton) {
        puzzle = generateSudokuGame();
        currentState = initializeGame(puzzle);
        currentState.startGameTimer();
        return;
    }

    const gridCell = event.target.closest('.grid-item');
    const numpadButton = event.target.closest('.numpad-button');
    const gameActionButton = event.target.closest('.game-action-button');

    if (!gridCell && !numpadButton && !gameActionButton)
        return;

    if (currentState.playMode) {

        if (gridCell) {
            currentState.selectedCell = getCellCoordinates(gridCell);
            return;
        }

        if (numpadButton) {
            currentState.updateCell(numpadButton.dataset.value);
            return;
        }

        if (gameActionButton.dataset.action === 'undo') {
            currentState.undoChange();
            return;
        }
        else if (gameActionButton.dataset.action === 'erase') {
            currentState.updateCell();
            return;
        }
        else if (gameActionButton.dataset.action === 'notes') {
            currentState.toggleNotesMode();
            return;
        }
    }

    else { currentState.togglePlayMode(); }

});






