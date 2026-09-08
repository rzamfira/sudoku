import { removeHighlight } from "./state.js";

export function selectedCellEventHandler(event) {

    const selectedCell = event.target;

    const cells = document.querySelectorAll('.grid-item');

    cells.forEach((currentCell) => {
        removeHighlight(currentCell);
        if (currentCell.dataset.rowIndex === selectedCell.dataset.rowIndex ||
            currentCell.dataset.columnIndex === selectedCell.dataset.columnIndex ||
            currentCell.dataset.squareIndex === selectedCell.dataset.squareIndex) {
            currentCell.classList.add('highlight-neighbors');
        }
        if (currentCell.textContent != '' && currentCell.textContent === selectedCell.textContent) {
            currentCell.classList.add('highlight-value');
        }


    });

    selectedCell.classList.add("selected-cell");


}