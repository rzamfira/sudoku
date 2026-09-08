import './state.js';
import './puzzle.js';
import { createLayout } from './appLayout.js';
import { startNewGame } from './newGame.js';
import { handleCellClick } from './selectedCell.js';


const puzzle = sudoku.generate('medium');  // generate the sudoku puzzle with medium difficulty
createLayout(sudoku.board_string_to_grid(puzzle)); // create the app layout

const newGameButton = document.querySelector('.new-game-button');
newGameButton.addEventListener('click', () => {

    startNewGame();

});

const grid = document.querySelector('.grid-section');
grid.addEventListener('click', (event) => {

    if (event.target.classList.contains('grid-item')) {
        console.log(event.target);
        handleCellClick(event);
    }

});




