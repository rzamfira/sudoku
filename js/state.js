export class SudokuState {

    constructor(initialPuzzle) {

        this.initialPuzzle = initialPuzzle;
        this.userPuzzle = this.copyPuzzle(initialPuzzle);
        this.selectedCell = { rowIndex: 0, columnIndex: 0, squareIndex: 0 };
        this.notes = this.createEmptyNotes();
        this.history = [];
        this.time = 0;
        this.isPaused = false;
        this.isWon = false;

    }

    copyPuzzle(puzzle) {
        return puzzle.map(row => row.map(value => value));
    }

    createEmptyNotes() {

        const notes = [];

        for (let row = 0; row < 9; row++) {
            const currentRow = [];
            for (let column = 0; column < 9; column++) {
                currentRow.push([]);
            }
            notes.push(currentRow);
        }

        return notes;

    }

    setSelectedCell(selectedCell) {

        this.selectedCell = {
            rowIndex: selectedCell.dataset.rowIndex,
            columnIndex: selectedCell.dataset.columnIndex,
            squareIndex: selectedCell.dataset.squareIndex
        };

    }

    setCellValue(value) {

        if (!this.selectedCell ||
            this.initialPuzzle[this.selectedCell.rowIndex][this.selectedCell.columnIndex] !== '.')
            return;

        const previousValue = this.userPuzzle[this.selectedCell.rowIndex][this.selectedCell.columnIndex];
        const previousNotes = this.notes[this.selectedCell.rowIndex][this.selectedCell.columnIndex];

        this.userPuzzle[this.selectedCell.rowIndex][this.selectedCell.columnIndex] = value;
        this.notes[this.selectedCell.rowIndex][this.selectedCell.columnIndex] = [];

        return {
            type: 'value',
            rowIndex: this.selectedCell.rowIndex,
            columnIndex: this.selectedCell.columnIndex,
            previousValue: previousValue,
            currentValue: value,
            previousNotes: previousNotes,
            currentNotes: []
        };

    }

    addHistory(action) {
        this.history.push(action);
    }

}

let currentState;

export function initializeState(puzzle) {

    currentState = new SudokuState(puzzle);
    return currentState;

}

export function getCurrentState() {
    return currentState;
}