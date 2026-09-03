
// function to generate a 9x9 grid with implicit values for the sudoku puzzle
export function generateGrid(puzzle) {

    const grid = document.querySelector('main');

    puzzle.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {

            // finding the coordinates for the axes and creating a span element for each one
            if (rowIndex == 0 && (columnIndex == 0 || columnIndex == 3 ||
                                  columnIndex == 6 || columnIndex == 8)) {
                grid.appendChild(createAxis("vertical", columnIndex));
            }
            if (columnIndex == 0 && (rowIndex == 0 || rowIndex == 3 || 
                                     rowIndex == 6 || rowIndex == 8)) {
                grid.appendChild(createAxis("horizontal", rowIndex)); 
            }

            const cell = document.createElement('div'); // making a div for each cell in the grid
            cell.classList.add('grid-item');
            if (value === '.') {
                cell.textContent = ''; // let the cell empty for the user input
            }
            else {
                cell.textContent = value; // insert the implicit value
            }
            grid.appendChild(cell);

        });
    });
}

// function to specify the id and the class for a span element
function createAxis(axisType, axisIndex) {
    const axis = document.createElement('span');
    axis.classList.add('axis');
    axis.setAttribute('id', `${axisType}-axis${axisIndex}`);
    return axis;
}