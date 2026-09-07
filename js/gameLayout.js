import { createControlPanel } from "./control.js";
import { createGrid } from "./grid.js";

// function to create the app layout
export function createLayout(puzzle) {

    const appContainer = document.getElementById("app");
    const gameLayout = document.createElement('main'); 
    gameLayout.classList.add('game-layout');

    const grid = createGrid(puzzle);
    const controls = createControlPanel();

    gameLayout.append(grid, controls);
    appContainer.append(gameLayout);

}