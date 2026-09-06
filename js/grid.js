
// function to generate a 9x9 grid with implicit values for the sudoku puzzle
export function createGrid(puzzle) {

    const grid = document.createElement('section');
    grid.classList.add("grid-section");

    const squares = []; // stores the nine 3x3 sudoku squares
    
    // create 9 HTML elements, one for each Sudoku square
    for (let i = 0; i < 9; i++) {
        const square = document.createElement(`section`);
        square.classList.add('grid-square');
        square.setAttribute('id', `square-${i}`);

        squares.push(square);
        grid.appendChild(square);
    }

    // parse the sudoku matrix and create an HTML element for each cell
    puzzle.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {

            const cell = document.createElement('button');
            cell.classList.add(`grid-item`);
            
            // store the cell's row and column indexes
            cell.dataset.rowIndex = rowIndex;
            cell.dataset.columnIndex = columnIndex;

            // calculate the square index based on the cell's position
            const squareRow = Math.floor(rowIndex / 3);
            const squareColumn = Math.floor(columnIndex / 3);
            const squareIndex = squareRow * 3 + squareColumn;
            cell.dataset.squareIndex = squareIndex;

            // display the value only if the cell is not empty
            if (value !== '.') {
                cell.textContent = value;
            }

            // append the cell to the corresponding square
            squares[squareIndex].appendChild(cell);

        });
    });

    return grid;
    
}
