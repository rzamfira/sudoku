import { getCellConflict } from "./puzzle.js";

export class SudokuState {

    #initialPuzzle
    #userPuzzle
    #selectedCell
    #conflictMatrix
    #notes
    #history
    #time
    #isPaused

    constructor(initialPuzzle) {

        this.#initialPuzzle = this.#copyPuzzle(initialPuzzle);
        this.#userPuzzle = this.#copyPuzzle(initialPuzzle);
        this.#selectedCell = { rowIndex: 0, columnIndex: 0, squareIndex: 0 };
        this.#conflictMatrix = this.#createEmptyMatrix();
        this.#notes = this.#createEmptyMatrix();
        this.#history = [];
        this.#time = 0;
        this.#isPaused = false;

    }

    #copyPuzzle(puzzle) {
        return puzzle.map(row => row.map(value => value));
    }

    #createEmptyMatrix() {

        return Array.from({ length: 9 }, () =>
            Array.from({ length: 9 }, () => []));

    }

    getUserPuzzle() {
        return this.#userPuzzle;
    }

    getSelectedCell() {
        return this.#selectedCell;
    }

    getConflictMatrix() {
        return this.#conflictMatrix;
    }

    setSelectedCell(selectedCell) {

        this.#selectedCell = {
            rowIndex: selectedCell.dataset.rowIndex,
            columnIndex: selectedCell.dataset.columnIndex,
            squareIndex: selectedCell.dataset.squareIndex
        };

    }

    cellChange(action) {

        if (action.type === 'insert-value') {
            if (!this.isCellEditable(this.#selectedCell.rowIndex, this.#selectedCell.columnIndex))
                return;
            this.#applyCellChange(action.value);
        }

        if (action.type === 'erase-value') {
            if (!this.isCellEditable(this.#selectedCell.rowIndex, this.#selectedCell.columnIndex) ||
                this.isCellEmpty(this.#selectedCell.rowIndex, this.#selectedCell.columnIndex))
                return;
            this.#applyCellChange('.');
        }

    }

    isCellEditable(rowIndex, columnIndex) {

        const isInitialCellEmpty = this.#initialPuzzle[rowIndex][columnIndex] === '.';
        return isInitialCellEmpty;

    }

    isCellEmpty(rowIndex, columnIndex) {

        const isUserCellEmpty = this.#userPuzzle[rowIndex][columnIndex] === '.';
        const areNotesEmpty = this.#notes[rowIndex][columnIndex].length === 0;
        return isUserCellEmpty && areNotesEmpty;

    }

    hasConflict(rowIndex, columnIndex) {
        const hasConflict = this.#conflictMatrix[rowIndex][columnIndex].length > 0;
        return hasConflict;
    }

    #applyCellChange(value) {

        this.#userPuzzle[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex] = value;
        this.#notes[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex] = [];

        const cellConflict = getCellConflict(this.#userPuzzle);
        this.#setCellConflictMatrix(cellConflict);

    }

    #setCellConflictMatrix(conflictMatrix) {
        this.#conflictMatrix = conflictMatrix;
    }

}

export function initializeState(puzzle) {

    return new SudokuState(puzzle);

}

