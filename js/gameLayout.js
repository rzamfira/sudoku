import { createControls } from "./control.js";
import { createGrid } from "./grid.js";

// function to create the app layout
export function createLayout(puzzle){

    const appContainer = document.getElementById("app");
    const gameLayout = document.createElement('main'); // main element that contains the sudoku grid & the controls
    gameLayout.classList.add('game-layout');

    // create the grid section
    const grid = createGrid(puzzle);
    const controls = createControls();


    gameLayout.append(grid, controls);
    appContainer.append(gameLayout);

}