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

            verifyBorderConflict(cell, rowIndex, columnIndex);

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

// prevents border conflicts by removing cell borders at the edges of each 3x3 square
function verifyBorderConflict(cell, rowIndex, columnIndex) {

    if (columnIndex % 3 === 2) {
        cell.classList.add('cell-no-right-border');
    }
    if (columnIndex % 3 === 0) {
        cell.classList.add('cell-no-left-border');
    }
    if (rowIndex % 3 === 2) {
        cell.classList.add('cell-no-bottom-border');
    }
    if (rowIndex % 3 === 0) {
        cell.classList.add('cell-no-top-border');
    }

}