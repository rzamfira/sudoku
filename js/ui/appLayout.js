import { createControlPanel } from "./controlsPanel.js";
import { createGrid } from "./grid.js";
import { createTimerSection } from "./timer.js";

// function to create the app layout
export function createLayout() {

    const appContainer = document.getElementById("app");
    const gameLayout = document.createElement('main');
    gameLayout.classList.add('game-layout');

    const grid = createGrid();
    const timer = createTimerSection();
    const controls = createControlPanel();

    gameLayout.append(grid, timer, controls);
    appContainer.append(gameLayout);

}

export function updateGamePauseUI(isPaused) {

    const gameLayout = document.querySelector('.game-layout');
    gameLayout.classList.toggle('is-paused', isPaused);

}

export function updateGameWonUI(isWon) {

    const gameLayout = document.querySelector('.game-layout');
    gameLayout.classList.toggle('is-won', isWon);

}