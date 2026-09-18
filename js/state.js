import { addConflict, eliminateConflict, getNeighborsOfCell, calculateSquareIndex } from "./puzzle.js";
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
        // this.#notesMode = false;
        // this.#notesMatrix = createEmptyNotesMatrix();

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

    setSelectedCell(target) {

        let rowIndex = this.#selectedCell.rowIndex;
        let columnIndex = this.#selectedCell.columnIndex;

        switch (target) {

            case 'ArrowUp': if (rowIndex > 0) rowIndex--; break;
            case 'ArrowDown': if (rowIndex < 8) rowIndex++; break;
            case 'ArrowLeft': if (columnIndex > 0) columnIndex--; break;
            case 'ArrowRight': if (columnIndex < 8) columnIndex++; break;

            default:
                rowIndex = Number(target.dataset.rowIndex);
                columnIndex = Number(target.dataset.columnIndex);

        }

        const squareIndex = calculateSquareIndex(rowIndex, columnIndex);

        this.#selectedCell = {
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            squareIndex: squareIndex
        };

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
        this.#applyCellChange(modifyValue);

        renderGrid(this);

    }

    #applyCellChange(newValue) {

        const selectedRowIndex = this.#selectedCell.rowIndex;
        const selectedColumnIndex = this.#selectedCell.columnIndex;

        this.#updateConflictMatrix(newValue);
        this.#userPuzzle[selectedRowIndex][selectedColumnIndex] = newValue;

    }

    #updateConflictMatrix(newValue) { // should I do this somewehere else, and get the data with getters?

        const selectedCell = this.#selectedCell;
        const neighborCells = getNeighborsOfCell(selectedCell);

        neighborCells.forEach(neighborCell => {

            const neighborCellValue = this.#userPuzzle[neighborCell.rowIndex][neighborCell.columnIndex];

            if (neighborCellValue === '.')
                return;

            eliminateConflict(this.#conflictMatrix, selectedCell, neighborCell);

            if (neighborCellValue === newValue) {
                addConflict(this.#conflictMatrix, selectedCell, neighborCell);
            }
        });

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



