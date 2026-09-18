import { addConflict, eliminateConflict, getNeighborsOfCell, calculateSquareIndex, modifyNotesMatrix } from "./puzzle.js";
import { renderGrid } from "./ui/grid.js";
import { toggleNotesButtonState } from "./ui/controlsPanel.js";

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
        this.#notesMatrix = createEmptyMatrix();

    }

    getSelectedCell() {
        return this.#selectedCell;
    }

    getPuzzleValueFromState(rowIndex, columnIndex) {
        return this.#userPuzzle[rowIndex][columnIndex];
    }

    getCellNotesFromState(rowIndex, columnIndex) {
        return this.#notesMatrix[rowIndex][columnIndex];
    }

    getPuzzleValue(cell) {
        return this.#userPuzzle[cell.rowIndex][cell.columnIndex];
    }

    #setPuzzleValue(cell, value) {
        this.#userPuzzle[cell.rowIndex][cell.columnIndex] = value;
    }

    getNotesMatrix(cell) {
        return this.#notesMatrix[cell.rowIndex][cell.columnIndex];
    }

    #setNotesMatrix(cell, notesMatrix) {
        this.#notesMatrix[cell.rowIndex][cell.columnIndex] = notesMatrix;
        console.log(this.#notesMatrix[cell.rowIndex][cell.columnIndex]);
    }

    getCellConflicts(cell) {
        return this.#conflictMatrix[cell.rowIndex][cell.columnIndex];
    }

    #setCellConflicts(cell, conflictMatrix) {
        this.#conflictMatrix[cell.rowIndex][cell.columnIndex] = conflictMatrix;
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

    toggleNotesMode(notesButton) {

        this.#notesMode = !this.#notesMode;
        toggleNotesButtonState(notesButton);

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

        const selectedCell = this.#selectedCell;

        if (this.getNotesMatrix(selectedCell).length > 0) {
            this.#setNotesMatrix(selectedCell, []);
        }

        this.#updateConflictMatrix(newValue);
        this.#setPuzzleValue(selectedCell, newValue);

    }

    #applyNotesChange(value) {

        const selectedCell = this.#selectedCell;
        if (this.getPuzzleValue(selectedCell) !== '.') {
            this.#updateConflictMatrix('.');
            this.#setPuzzleValue(selectedCell, '.');
        }

        const notesMatrix = modifyNotesMatrix(this.getNotesMatrix(selectedCell), value)
        this.#setNotesMatrix(selectedCell, notesMatrix);

    }

    #updateConflictMatrix(newValue) {

        const selectedCell = this.#selectedCell;
        let selectedConflictMatrix = this.getCellConflicts(selectedCell);

        const neighborCells = getNeighborsOfCell(selectedCell);
        neighborCells.forEach(neighborCell => {

            const neighborCellValue = this.getPuzzleValue(neighborCell);
            let neighborConflictMatrix = this.getCellConflicts(neighborCell)

            if (neighborCellValue === '.')
                return;

            neighborConflictMatrix = eliminateConflict(selectedCell, neighborConflictMatrix);
            selectedConflictMatrix = eliminateConflict(neighborCell, selectedConflictMatrix);

            if (neighborCellValue === newValue) {

                neighborConflictMatrix = addConflict(selectedCell, neighborConflictMatrix);
                selectedConflictMatrix = addConflict(neighborCell, selectedConflictMatrix);

            }

            this.#setCellConflicts(selectedCell, selectedConflictMatrix);
            this.#setCellConflicts(neighborCell, neighborConflictMatrix);

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

    hasCellConflicts(rowIndex, columnIndex) {

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



