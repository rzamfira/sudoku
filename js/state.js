import { isGameWon, modifyCellNotes, updateConflictMatrix } from "./puzzle.js";
import { renderGrid } from "./ui/grid.js";
import { updateNotesButtonUI } from "./ui/controlsPanel.js";
import { updateTimerDisplay } from "./ui/timer.js";
import { updateGamePauseUI, updateGameWonUI } from "./ui/appLayout.js";

export class SudokuState {

    #initialPuzzle
    #userPuzzle
    #selectedCell
    #conflictMatrix
    #isNotesEnabled
    #notesMatrix
    #history
    #isPaused
    #timerId
    #elapsedSeconds
    #isWon

    constructor(initialPuzzle) {

        this.#initialPuzzle = copyPuzzle(initialPuzzle);
        this.#userPuzzle = copyPuzzle(initialPuzzle);
        this.#selectedCell = { rowIndex: 0, columnIndex: 0, squareIndex: 0 };
        this.#conflictMatrix = createEmptyMatrix();
        this.#isNotesEnabled = false;
        this.#notesMatrix = createEmptyMatrix();
        this.#history = [];
        this.#isPaused = false;
        this.#timerId = null;
        this.#elapsedSeconds = 0;
        this.#isWon = false;

    }

    static initializeGame(puzzle, previousState) {

        if (previousState) {
            previousState.isPaused = true;
        }

        const gameState = new SudokuState(puzzle);

        renderGrid(gameState);
        gameState.startGameTimer();
        return gameState;

    }

    get selectedCell() {
        return { ...this.#selectedCell };
    }

    set selectedCell(cell) {

        this.#selectedCell = {
            rowIndex: cell.rowIndex,
            columnIndex: cell.columnIndex,
            squareIndex: cell.squareIndex
        };

        renderGrid(this);

    }

    get selectedCellValue() {
        return this.#userPuzzle[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex];
    }

    set selectedCellValue(value) {
        this.#userPuzzle[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex] = value;
        updateConflictMatrix(this.#userPuzzle, this.selectedCell, this.#conflictMatrix);

        if (isGameWon(this.#userPuzzle, this.#conflictMatrix)) {
            this.isWon = true;
        }

        renderGrid(this);
    }

    get selectedCellNotes() {
        return [...this.#notesMatrix[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex]];
    }

    set selectedCellNotes(notes) {
        this.#notesMatrix[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex] = notes;
        renderGrid(this);
    }

    get isNotesEnabled() {
        return this.#isNotesEnabled;
    }

    set isNotesEnabled(value) {
        this.#isNotesEnabled = value;
        updateNotesButtonUI(this.#isNotesEnabled);
    }

    get isPaused() {
        return this.#isPaused;
    }

    set isPaused(value) {

        this.#isPaused = value;

        if (this.#isPaused) {
            this.#stopTimer();
        }
        else {
            this.#startTimer();
        }

        updateGamePauseUI(this.#isPaused);

    }

    get elapsedSeconds() {
        return this.#elapsedSeconds;
    }

    set elapsedSeconds(value) {

        this.#elapsedSeconds = value;
        if (value === 0)
            this.#stopTimer();

        updateTimerDisplay(value);
    }

    get isWon() {
        return this.#isWon;
    }

    set isWon(value) {

        this.#isWon = value;
        if (this.#isWon) {
            this.#stopTimer();
        }
        updateGameWonUI(value);

    }

    getCellValue(rowIndex, columnIndex) {
        return this.#userPuzzle[rowIndex][columnIndex];
    }

    getCellNotes(rowIndex, columnIndex) {
        return this.#notesMatrix[rowIndex][columnIndex];
    }

    isCellEditable(rowIndex, columnIndex) {
        const isInitialCellEmpty = this.#initialPuzzle[rowIndex][columnIndex] === '.';
        return isInitialCellEmpty;
    }

    isCellEmpty(rowIndex, columnIndex) {
        const isUserCellEmpty = this.#userPuzzle[rowIndex][columnIndex] === '.';
        return isUserCellEmpty;
    }

    hasCellConflicts(rowIndex, columnIndex) {
        const hasConflict = this.#conflictMatrix[rowIndex][columnIndex].length > 0;
        return hasConflict;
    }

    toggleNotesEnabled() {
        this.isNotesEnabled = !this.#isNotesEnabled;
    }

    togglePause() {
        this.isPaused = !this.#isPaused;
    }

    startGameTimer() {

        this.elapsedSeconds = 0;
        this.isPaused = false;
        this.isWon = false;

    }

    updateCell(value) {

        const selectedCell = this.#selectedCell;
        if (!this.isCellEditable(selectedCell.rowIndex, selectedCell.columnIndex))
            return;

        const modifyValue = value ?? '.';

        this.#addHistoryState();

        if (this.isNotesEnabled) {
            this.#applyNotesUpdate(modifyValue);
        }
        else {
            this.#applyValueUpdate(modifyValue);
        }

    }

    #addHistoryState() {

        const historyEntry = {
            selectedCell: { ...this.selectedCell },
            puzzleValue: this.selectedCellValue,
            notesMatrix: [...this.selectedCellNotes]
        };

        this.#history.push(historyEntry);

    }

    #applyValueUpdate(newValue) {

        if (this.selectedCellNotes.length > 0) {
            this.selectedCellNotes = [];
        }

        this.selectedCellValue = newValue;

    }

    #applyNotesUpdate(value) {

        if (this.selectedCellValue !== '.') {
            this.selectedCellValue = '.';
        }

        this.selectedCellNotes = modifyCellNotes(this.selectedCellNotes, value);

    }

    undoChange() {

        const lastState = this.#history.pop();
        if (lastState === undefined)
            return;

        this.selectedCell = lastState.selectedCell;
        this.selectedCellValue = lastState.puzzleValue;
        this.selectedCellNotes = lastState.notesMatrix;

    }

    #startTimer() {

        this.#timerId = setInterval(() => {
            this.elapsedSeconds = this.#elapsedSeconds + 1;
        }, 1000);

    }

    #stopTimer() {

        clearInterval(this.#timerId);
        this.#timerId = null;

    }

}

function copyPuzzle(puzzle) {
    return puzzle.map(row => row.map(value => value));
}

function createEmptyMatrix() {

    return Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => []));

}



