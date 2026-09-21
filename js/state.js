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
    #history

    constructor(initialPuzzle) {

        this.#initialPuzzle = copyPuzzle(initialPuzzle);
        this.#userPuzzle = copyPuzzle(initialPuzzle);
        this.#selectedCell = { rowIndex: 0, columnIndex: 0, squareIndex: 0 };
        this.#conflictMatrix = createEmptyMatrix();
        this.#notesMode = false;
        this.#notesMatrix = createEmptyMatrix();
        this.#history = [];

    }

    getSelectedCell() {
        return this.#selectedCell;
    }

    #selectCell(cell) {
        this.#selectedCell = { ...cell };
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
    }

    getCellConflicts(cell) {
        return this.#conflictMatrix[cell.rowIndex][cell.columnIndex];
    }

    #setCellConflicts(cell, conflictMatrix) {
        this.#conflictMatrix[cell.rowIndex][cell.columnIndex] = conflictMatrix;
    }

    addHistoryState(cell) {

        const state = {
            selectedCell: { ...cell },
            puzzleValue: this.getPuzzleValue(cell),
            notesMatrix: [...this.getNotesMatrix(cell)]
        };
        this.#history.push(state);

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

        const selectedCell = this.#selectedCell;
        if (!this.isCellEditable(selectedCell.rowIndex, selectedCell.columnIndex))
            return;

        const modifyValue = value ?? '.';

        this.addHistoryState(selectedCell);

        if (this.#notesMode) {
            this.#applyNotesChange(modifyValue);
        }
        else {
            this.#applyCellChange(modifyValue);
        }

        renderGrid(this);

    }

    undoChange() {

        const lastState = this.#history.pop();
        if (lastState === undefined)
            return;

        const lastSelectedCell = lastState.selectedCell;
        this.#selectCell(lastSelectedCell);

        this.#setPuzzleValue(lastSelectedCell, lastState.puzzleValue);
        this.#updateConflictMatrix(lastState.puzzleValue);

        this.#setNotesMatrix(lastSelectedCell, lastState.notesMatrix);

        renderGrid(this);

    }

    #applyCellChange(newValue) {

        const selectedCell = this.#selectedCell;

        if (this.getNotesMatrix(selectedCell).length > 0) {
            this.#setNotesMatrix(selectedCell, []);
        }

        this.#setPuzzleValue(selectedCell, newValue);
        this.#updateConflictMatrix(newValue);

    }

    #applyNotesChange(value) {

        const selectedCell = this.#selectedCell;
        if (this.getPuzzleValue(selectedCell) !== '.') {
            this.#setPuzzleValue(selectedCell, '.');
            this.#updateConflictMatrix('.');
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



