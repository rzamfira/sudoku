import './state.js';
import './grid.js';
import './puzzle.js';
import { generateSudoku } from './sudokuGenerator.js';

console.log(generateSudoku());
const { puzzle, solution } = generateSudoku();
console.log(sudoku.board_string_to_grid(puzzle));
console.log(sudoku.board_string_to_grid(solution));
sudoku.print_board(puzzle);