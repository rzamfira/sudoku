import './state.js';
import './puzzle.js';
import { createLayout } from './gameLayout.js';
import { newGameEventHandler } from './newGame.js';


const puzzle = sudoku.generate('medium');  // generate the sudoku puzzle with medium difficulty
createLayout(sudoku.board_string_to_grid(puzzle)); // create the app layout

const newGameButton = document.querySelector('.new-game-button');
newGameButton.addEventListener('click', () => {
    newGameEventHandler();
});




