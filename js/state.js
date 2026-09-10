export class SudokuState {

    constructor(initialPuzzle) {

        this.initialPuzzle = initialPuzzle;
        this.userPuzzle = this.copyPuzzle(initialPuzzle);
        this.selectedCell = {rowIndex: 0, columnIndex: 0, squareIndex: 0};
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
            rowIndex: selectedCell.rowIndex,
            columnIndex: selectedCell.columnIndex,
            squareIndex: selectedCell.squareIndex 
        };
    }

}