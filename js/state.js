import { updateConflictMatrix, updateNotesMatrix } from "./puzzle.js";
import { renderGrid } from "./ui/grid.js";
import { toggleNotesButtonState } from "./ui/grid.js";

export class SudokuState {

    #initialPuzzle
    #userPuzzle
    #selectedCell
    #conflictMatrix
    #notesMode
    #notesMatrix


    constructor(initialPuzzle) {

        this.#initialPuzzle = copyPuzzle(initialPuzzle);
        this.#userPuzzle = copyPuzzle(initialPuzzle);
        this.#selectedCell = { rowIndex: 0, columnIndex: 0, squareIndex: 0 };
        this.#conflictMatrix = createEmptyMatrix();
        this.#notesMode = false;
        this.#notesMatrix = createEmptyNotesMatrix();

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

    getNotesMatrix() {
        return this.#notesMatrix;
    }

    #setCellConflictMatrix(conflictMatrix) {
        this.#conflictMatrix = conflictMatrix;
    }

    #setCellNotesMatrix(notesMatrix) {
        this.#notesMatrix = notesMatrix;
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

    toggleNotesMode() {
        this.#notesMode = !this.#notesMode;
        toggleNotesButtonState();
    }

    cellChange(value) {

        if (!this.isCellEditable(this.#selectedCell.rowIndex, this.#selectedCell.columnIndex))
            return;

        const modifyValue = value ?? '.';

        if (this.#notesMode)
            this.#applyNotesChange(modifyValue);
        else
            this.#applyCellChange(modifyValue);

        renderGrid(this);

    }

    #applyCellChange(newValue) {

        const previousValue = this.#userPuzzle[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex];
        this.#userPuzzle[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex] = newValue;
        if (!this.areNotesEmpty(this.#selectedCell.rowIndex, this.#selectedCell.columnIndex)) {
            this.#notesMatrix[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex].fill(0);
            console.log(this.#notesMatrix[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex]);
        }
        this.#recalculateConflict(newValue, previousValue);

    }

    #applyNotesChange(newValue) {

        const previousNotes = this.#notesMatrix[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex];

        if (!this.isCellEmpty(this.#selectedCell.rowIndex, this.#selectedCell.columnIndex)) {
            const previousValue = this.#userPuzzle[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex];
            this.#userPuzzle[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex] = '.';
            this.#recalculateConflict('.', previousValue);
        }

        let cellNotesMatrix = this.getNotesMatrix();
        cellNotesMatrix = updateNotesMatrix(cellNotesMatrix, this.getSelectedCell(), newValue, previousNotes);
        this.#setCellNotesMatrix(cellNotesMatrix);
        console.log(this.#notesMatrix[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex]);

    }

    isCellEditable(rowIndex, columnIndex) {

        const isInitialCellEmpty = this.#initialPuzzle[rowIndex][columnIndex] === '.';
        return isInitialCellEmpty;

    }

    isCellEmpty(rowIndex, columnIndex) {

        const isUserCellEmpty = this.#userPuzzle[rowIndex][columnIndex] === '.';
        return isUserCellEmpty;

    }

    areNotesEmpty(rowIndex, columnIndex) {
        const areNotesEmpty = this.#notesMatrix[rowIndex][columnIndex].every(value => value === 0);
        return areNotesEmpty;
    }

    hasConflict(rowIndex, columnIndex) {

        const hasConflict = this.#conflictMatrix[rowIndex][columnIndex].length > 0;
        return hasConflict;

    }

    #recalculateConflict(newValue, previousValue) {

        let cellConflictMatrix = this.getConflictMatrix();
        cellConflictMatrix = updateConflictMatrix(cellConflictMatrix, this.getSelectedCell(), newValue, previousValue);
        this.#setCellConflictMatrix(cellConflictMatrix);

    }

    #recalculateSquareIndex() {

        const squareRow = Math.floor(this.#selectedCell.rowIndex / 3);
        const squareColumn = Math.floor(this.#selectedCell.columnIndex / 3);
        this.#selectedCell.squareIndex = squareRow * 3 + squareColumn;

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

function createEmptyNotesMatrix() {

    return Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () =>
            Array(10).fill(0)));

}


