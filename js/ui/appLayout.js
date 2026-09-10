import { createControlPanel } from "./controlsPanel.js";
import { createGrid } from "./grid.js";

// function to create the app layout
export function createLayout() {

    const appContainer = document.getElementById("app");
    const gameLayout = document.createElement('main'); 
    gameLayout.classList.add('game-layout');

    const grid = createGrid();
    const controls = createControlPanel();

    gameLayout.append(grid, controls);
    appContainer.append(gameLayout);

}