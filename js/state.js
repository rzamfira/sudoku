import { modifyCellNotes, updateConflictMatrix } from "./puzzle.js";
import { renderGrid } from "./ui/grid.js";
import { toggleNotesButtonState, togglePauseButtonState } from "./ui/controlsPanel.js";

export class SudokuState {

    #initialPuzzle
    #userPuzzle
    #selectedCell
    #conflictMatrix
    #pauseMode
    #notesMode
    #notesMatrix
    #history

    constructor(initialPuzzle) {

        this.#initialPuzzle = copyPuzzle(initialPuzzle);
        this.#userPuzzle = copyPuzzle(initialPuzzle);
        this.#selectedCell = { rowIndex: 0, columnIndex: 0, squareIndex: 0 };
        this.#conflictMatrix = createEmptyMatrix();
        this.#pauseMode = false;
        this.#notesMode = false;
        this.#notesMatrix = createEmptyMatrix();
        this.#history = [];

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
        renderGrid(this);
    }

    get selectedCellNotes() {
        return [...this.#notesMatrix[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex]];
    }

    set selectedCellNotes(notes) {
        this.#notesMatrix[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex] = notes;
        renderGrid(this);
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

    toggleNotesMode() {
        this.#notesMode = !this.#notesMode;
        toggleNotesButtonState();
    }

    togglePauseMode() {
        this.#pauseMode = !this.#pauseMode;
        togglePauseButtonState();
    }

    #addHistoryState() {

        const historyEntry = {
            selectedCell: { ...this.selectedCell },
            puzzleValue: this.selectedCellValue,
            notesMatrix: [...this.selectedCellNotes]
        };

        this.#history.push(historyEntry);

    }

    updateCell(value) {

        const selectedCell = this.#selectedCell;
        if (!this.isCellEditable(selectedCell.rowIndex, selectedCell.columnIndex))
            return;

        const modifyValue = value ?? '.';

        this.#addHistoryState(selectedCell);

        if (this.#notesMode) {
            this.#applyNotesUpdate(modifyValue);
        }
        else {
            this.#applyValueUpdate(modifyValue);
        }


    }

    undoChange() {

        const lastState = this.#history.pop();
        if (lastState === undefined)
            return;

        this.selectedCell = lastState.selectedCell;
        this.selectedCellValue = lastState.puzzleValue;
        this.selectedCellNotes = lastState.notesMatrix;

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

}

export function initializeGame(puzzle) {

    const gameState = new SudokuState(puzzle);
    renderGrid(gameState);
    return gameState;

}

function copyPuzzle(puzzle) {
    return puzzle.map(row => row.map(value => value));
}

function createEmptyMatrix() {

    return Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => []));

}



