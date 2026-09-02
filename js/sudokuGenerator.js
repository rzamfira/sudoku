
// function to generate sudoku puzzle from an external library
export function generateSudoku() {

    const puzzle = sudoku.generate('medium');  // difficulty will be always medium
    const solution = sudoku.solve(puzzle);

    return {
        puzzle,
        solution
    };

}

// function to generate a 9x9 grid with implicit values for the sudoku puzzle
export function generateGrid(puzzle) {

    const grid = document.getElementById('sudoku-grid');

    puzzle.split('').forEach(value => {
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

}