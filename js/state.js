import { updateConflictMatrix } from "./puzzle.js";
import { renderGrid } from "./ui/grid.js";

export class SudokuState {

    #initialPuzzle
    #userPuzzle
    #selectedCell
    #conflictMatrix
    #notes


    constructor(initialPuzzle) {

        this.#initialPuzzle = copyPuzzle(initialPuzzle);
        this.#userPuzzle = copyPuzzle(initialPuzzle);
        this.#selectedCell = { rowIndex: 0, columnIndex: 0, squareIndex: 0 };
        this.#conflictMatrix = createEmptyMatrix();
        this.#notes = createEmptyMatrix();

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

    cellChange(value) {

        if (!this.isCellEditable(this.#selectedCell.rowIndex, this.#selectedCell.columnIndex))
            return;

        if (value === undefined) {
            if (this.isCellEmpty(this.#selectedCell.rowIndex, this.#selectedCell.columnIndex)) {
                return;
            }
            value = '.';
        }

        this.#applyCellChange(value);
        renderGrid(this);

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

        const previousValue = this.#userPuzzle[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex];
        this.#userPuzzle[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex] = value;
        this.#notes[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex] = [];

        const cellConflictMatrix = this.getConflictMatrix();
        updateConflictMatrix(cellConflictMatrix, this.#userPuzzle, this.#selectedCell, value, previousValue);
        this.#setCellConflictMatrix(cellConflictMatrix);

    }

    #setCellConflictMatrix(conflictMatrix) {
        this.#conflictMatrix = conflictMatrix;
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


