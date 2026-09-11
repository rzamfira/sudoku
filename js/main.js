import { createLayout } from './ui/appLayout.js';
import { Dispatcher } from './dispatch.js';
import { stateObserver } from './observers/stateObserver.js';
import { gridObserver } from './observers/gridObserver.js';

const dispatcher = new Dispatcher();

dispatcher.subscribe(stateObserver);
dispatcher.subscribe(gridObserver);

createLayout(); // initialize grid & controls panel
dispatcher.dispatch({ type: 'NEW-GAME' }); // generate the default sudoku values for a new game

const grid = document.querySelector('.grid-section');

const newGameButton = document.querySelector('.new-game-button');
newGameButton.addEventListener('click', () => {
    dispatcher.dispatch({ type: 'NEW-GAME' });
});


grid.addEventListener('click', (event) => {
    if (event.target.classList.contains('grid-item')) {
        dispatcher.dispatch({ type: 'SELECT-CELL', cell: event.target });
    }

});

document.addEventListener('keydown', (event) => {
    if (event.key >= '1' && event.key <= '9') {
        dispatcher.dispatch({ type: 'INSERT-VALUE', value: event.key });
    }
});




