import { createLayout } from './ui/appLayout.js';
import { dispatch } from './dispatch.js';
import { renderGrid, updateCellValue } from './ui/grid.js';
import { highlightSelected } from './ui/selectedCell.js';

let currentState = dispatch('NEW-GAME'); // initialize 

createLayout(); // create the app layout
renderGrid(currentState);

const newGameButton = document.querySelector('.new-game-button');
newGameButton.addEventListener('click', () => {

    currentState = dispatch('NEW-GAME');
    renderGrid(currentState);

});

const grid = document.querySelector('.grid-section');
grid.addEventListener('click', (event) => {

    if (event.target.classList.contains('grid-item')) {
        const selectedCell = event.target;

        currentState = dispatch('SELECT-CELL', selectedCell);
        highlightSelected(grid, selectedCell);

    }

});

document.addEventListener('keydown', (event) => {
    const pressedNumber = event.key;
    if (pressedNumber >= '1' && pressedNumber <= '9') {
        currentState = dispatch('INSERT-NUMBER-KEYBOARD', pressedNumber);
        updateCellValue(grid, currentState);
    }
});




