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
            rowIndex: Number(selectedCell.dataset.rowIndex),
            columnIndex: Number(selectedCell.dataset.columnIndex),
            squareIndex: Number(selectedCell.dataset.squareIndex)
        };
        renderGrid(this);

    }

    changeSelectedCell(direction) {

        if (direction === 'ArrowUp' && this.#selectedCell.rowIndex !== 0) {
            this.#selectedCell.rowIndex -= 1;
        }
        if (direction === 'ArrowDown' && this.#selectedCell.rowIndex !== 8) {
            this.#selectedCell.rowIndex += 1;
        }
        if (direction === 'ArrowLeft' && this.#selectedCell.columnIndex !== 0) {
            this.#selectedCell.columnIndex -= 1;
        }
        if (direction === 'ArrowRight' && this.#selectedCell.columnIndex !== 8) {
            this.#selectedCell.columnIndex += 1;
        }
        this.#recalculateSquareIndex();
        renderGrid(this);

    }

    #recalculateSquareIndex() {
        const squareRow = Math.floor(this.#selectedCell.rowIndex / 3);
        const squareColumn = Math.floor(this.#selectedCell.columnIndex / 3);
        this.#selectedCell.squareIndex = squareRow * 3 + squareColumn;
    }

    cellChange(value) {

        let modifyValue = value;
        if (!this.isCellEditable(this.#selectedCell.rowIndex, this.#selectedCell.columnIndex))
            return;

        if (modifyValue === undefined) {
            if (this.isCellEmpty(this.#selectedCell.rowIndex, this.#selectedCell.columnIndex)) {
                return;
            }
            modifyValue = '.';
        }

        this.#applyCellChange(modifyValue);
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

    #applyCellChange(newValue) {

        const previousValue = this.#userPuzzle[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex];
        this.#userPuzzle[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex] = newValue;

        let cellConflictMatrix = this.getConflictMatrix();
        cellConflictMatrix = updateConflictMatrix(cellConflictMatrix, this.getSelectedCell(), newValue, previousValue);
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


