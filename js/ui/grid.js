import { calculateSquareIndex } from "../puzzle.js";
import { highlightConflicts, highlightSelectedCell, removeHighlight } from "./highlight.js";

// function to create the sudoku grid
export function createGrid() {

    const grid = document.createElement('section');
    grid.classList.add("grid-section");

    const sudokuSquares = createSudokuSquares(grid);
    createGridCells(sudokuSquares);

    return grid;

}

export function renderGrid(currentState) {

    const cells = document.querySelectorAll(`.grid-item`);

    cells.forEach(currentCell => {
        updateCellDisplay(currentCell, currentState);
    });

}

function createSudokuSquares(grid) {

    const sudokuSquares = [];

    for (let i = 0; i < 9; i++) {

        const square = document.createElement(`section`);
        square.classList.add('grid-square');
        square.setAttribute('id', `square-${i}`);

        sudokuSquares.push(square);
        grid.appendChild(square);

    }

    return sudokuSquares;

}

function createGridCells(sudokuSquares) {

    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 9; columnIndex++) {

            const cell = document.createElement('span');
            cell.classList.add(`grid-item`);

            cell.dataset.rowIndex = rowIndex;
            cell.dataset.columnIndex = columnIndex;

            const squareIndex = calculateSquareIndex(rowIndex, columnIndex);
            cell.dataset.squareIndex = squareIndex;

            const cellValue = document.createElement('span');
            cellValue.classList.add('cell-value');

            const notesGrid = document.createElement('span');
            notesGrid.classList.add('notes-grid');

            for (let value = 1; value <= 9; value++) {

                const note = document.createElement('span');
                note.classList.add('notes-value');
                note.dataset.value = value;
                notesGrid.appendChild(note);

            }

            cell.appendChild(cellValue);
            cell.appendChild(notesGrid);
            sudokuSquares[squareIndex].appendChild(cell);

        }
    }

}

function updateCellDisplay(currentCell, currentState) {

    removeHighlight(currentCell);

    const currentValue = currentState.getPuzzleValueFromState(currentCell.dataset.rowIndex, currentCell.dataset.columnIndex);
    const currentCellNotes = currentState.getCellNotesFromState(currentCell.dataset.rowIndex, currentCell.dataset.columnIndex);

    const selectedCell = currentState.getSelectedCell();
    const selectedValue = currentState.getPuzzleValueFromState(selectedCell.rowIndex, selectedCell.columnIndex);

    const isCellEditable = currentState.isCellEditable(currentCell.dataset.rowIndex, currentCell.dataset.columnIndex);
    const hasCellConflicts = currentState.hasCellConflicts(currentCell.dataset.rowIndex, currentCell.dataset.columnIndex);

    const valueElement = currentCell.querySelector('.cell-value');
    if (currentState.isCellEmpty(currentCell.dataset.rowIndex, currentCell.dataset.columnIndex))
        valueElement.textContent = '';
    else
        valueElement.textContent = currentValue;

    renderNotes(currentCell, currentCellNotes);
    highlightSelectedCell(currentCell, selectedCell, selectedValue);
    highlightConflicts(currentCell, isCellEditable, hasCellConflicts);

}

function renderNotes(currentCell, currentCellNotes) {

    const notes = currentCell.querySelectorAll('.notes-value');

    notes.forEach((note) => {

        const value = Number(note.dataset.value);

        if (currentCellNotes.includes(value))
            note.textContent = value;
        else
            note.textContent = '';

    });
}



