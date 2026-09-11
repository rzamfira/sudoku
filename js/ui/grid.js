import { highlightConflict, highlightSelected } from "./highlight.js";

// function to create the sudoku grid
export function createGrid() {

    const grid = document.createElement('section');
    grid.classList.add("grid-section");

    const sudokuSquares = createSudokuSquares(grid);
    createGridCells(sudokuSquares);

    const firstCell = grid.querySelector('.grid-item');
    highlightSelected(grid, firstCell);

    return grid;

}

export function renderGrid(currentState) {

    const grid = document.querySelector('.grid-section');
    const puzzle = currentState.userPuzzle;

    puzzle.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {

            const cell = document.querySelector(`.grid-item[data-row-index="${rowIndex}"][data-column-index="${columnIndex}"]`);

            if (value !== '.') {
                cell.textContent = value;
            }
            else {
                cell.textContent = '';
            }

        });
    });

    const rowIndex = currentState.selectedCell.rowIndex;
    const columnIndex = currentState.selectedCell.columnIndex;

    const selectedCell = document.querySelector(`.grid-item[data-row-index="${rowIndex}"][data-column-index="${columnIndex}"]`);

    highlightConflict(grid, currentState.conflictCells)
    highlightSelected(grid, selectedCell);

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

            // calculate the square index based on the cell's position
            const squareRow = Math.floor(rowIndex / 3);
            const squareColumn = Math.floor(columnIndex / 3);
            const squareIndex = squareRow * 3 + squareColumn;
            cell.dataset.squareIndex = squareIndex;

            sudokuSquares[squareIndex].appendChild(cell);

        }
    }

}

