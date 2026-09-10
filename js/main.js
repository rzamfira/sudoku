import { createLayout } from './ui/appLayout.js';
import { dispatch } from './dispatch.js';
import { newGrid } from './ui/grid.js';
import { highlightSelected } from './ui/selectedCell.js';

let currentState = dispatch('NEW-GAME'); // initialize 

createLayout(currentState.initialPuzzle); // create the app layout

const newGameButton = document.querySelector('.new-game-button');
newGameButton.addEventListener('click', () => {

    currentState = dispatch('NEW-GAME');
    newGrid(currentState.initialPuzzle);

});

const grid = document.querySelector('.grid-section');
grid.addEventListener('click', (event) => {

    if (event.target.classList.contains('grid-item')) {
        const selectedCell = event.target;

        currentState = dispatch('SELECT-CELL', selectedCell);
        highlightSelected(grid, selectedCell);
        
    }

});




