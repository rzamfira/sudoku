import { modifyNotesMatrix, moveSelectedCell, updateConflictMatrix } from "./puzzle.js";
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

    get selectedCell() {
        return { ...this.#selectedCell };
    }

    set selectedCell(cell) {

        const rowIndex = cell.dataset ? cell.dataset.rowIndex : cell.rowIndex;
        const columnIndex = cell.dataset ? cell.dataset.columnIndex : cell.columnIndex;
        const squareIndex = cell.dataset ? cell.dataset.squareIndex : cell.squareIndex;

        this.#selectedCell = {
            rowIndex: Number(rowIndex),
            columnIndex: Number(columnIndex),
            squareIndex: Number(squareIndex)
        };

        renderGrid(this);

    }

    get selectedCellValue() {
        return this.#userPuzzle[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex];
    }

    set selectedCellValue(value) {
        this.#userPuzzle[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex] = value;
        updateConflictMatrix(this.#userPuzzle, this.selectedCell, this.#conflictMatrix);
    }

    get selectedCellNotes() {
        return [...this.#notesMatrix[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex]];
    }

    set selectedCellNotes(notes) {
        this.#notesMatrix[this.#selectedCell.rowIndex][this.#selectedCell.columnIndex] = notes;
    }

    getCellValue(rowIndex, columnIndex) { // shoud I use get here to get all the values of the UserPuzzle and then use it?
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

    toggleNotesMode(notesButton) { // should I make a getter for notesMode?
        this.#notesMode = !this.#notesMode;
        toggleNotesButtonState(notesButton);
    }

    updateSelectedCell(selectionInput) {

        let selectedCell;

        if (typeof selectionInput === 'string')
            selectedCell = moveSelectedCell(this.#selectedCell, selectionInput);
        else
            selectedCell = selectionInput;

        this.selectedCell = selectedCell;

    }

    #addHistoryState() {

        const historyEntry = {
            selectedCell: { ...this.selectedCell },
            puzzleValue: this.selectedCellValue,
            notesMatrix: [...this.selectedCellNotes]
        };

        this.#history.push(historyEntry);

    }

    cellChange(value) {

        const selectedCell = this.#selectedCell;
        if (!this.isCellEditable(selectedCell.rowIndex, selectedCell.columnIndex))
            return;

        const modifyValue = value ?? '.';

        this.#addHistoryState(selectedCell);

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

        this.selectedCell = lastState.selectedCell;
        this.selectedCellValue = lastState.puzzleValue;
        this.selectedCellNotes = lastState.notesMatrix;

        renderGrid(this);

    }

    #applyCellChange(newValue) {

        if (this.selectedCellNotes.length > 0) {
            this.selectedCellNotes = [];
        }

        this.selectedCellValue = newValue;

    }

    #applyNotesChange(value) {

        if (this.selectedCellValue !== '.') {
            this.selectedCellValue = '.';
        }

        this.selectedCellNotes = modifyNotesMatrix(this.selectedCellNotes, value);

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



