import './state.js';
import './grid.js';
import './puzzle.js';
import { generateGrid, generateSudoku } from './sudokuGenerator.js';


const { puzzle, solution } = generateSudoku();
console.log(sudoku.board_string_to_grid(puzzle));
generateGrid(puzzle);
