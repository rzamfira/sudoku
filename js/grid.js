import { highlightNeighbors } from "./selectedCell.js";

// function to create the sudoku grid
export function createGrid(puzzle) {

    const grid = document.createElement('section');
    grid.classList.add("grid-section");

    const sudokuSquares = createSudokuSquares(grid);
    createGridCells(puzzle, sudokuSquares);

    return grid;

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

function createGridCells(puzzle, sudokuSquares) {

    puzzle.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {

            const cell = document.createElement('span');
            cell.classList.add(`grid-item`);

            cell.dataset.rowIndex = rowIndex;
            cell.dataset.columnIndex = columnIndex;

            // calculate the square index based on the cell's position
            const squareRow = Math.floor(rowIndex / 3);
            const squareColumn = Math.floor(columnIndex / 3);
            const squareIndex = squareRow * 3 + squareColumn;
            cell.dataset.squareIndex = squareIndex;

            if (value !== '.') {
                cell.textContent = value;
            }

            sudokuSquares[squareIndex].appendChild(cell);

        });
    });

}

export function updateGrid (puzzle){

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

}
