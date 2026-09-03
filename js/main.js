import './state.js';
import { generateGrid } from './grid.js';
import './puzzle.js';

// function to generate sudoku puzzle from an external library
function generateSudoku() {

    const puzzle = sudoku.generate('medium');  // difficulty will be always medium
    const solution = sudoku.solve(puzzle);

    return {
        puzzle,
        solution
    };

}

const { puzzle, solution } = generateSudoku();
generateGrid(sudoku.board_string_to_grid(puzzle));



