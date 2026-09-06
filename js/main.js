import './state.js';
import './puzzle.js';
import { createLayout } from './gameLayout.js';


const puzzle = sudoku.generate('medium');  // generate the sudoku puzzle with medium difficulty
createLayout(sudoku.board_string_to_grid(puzzle)); // create the app layout




