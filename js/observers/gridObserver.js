import { getCurrentState } from "../state.js";
import { renderGrid, updateCellValue } from "../ui/grid.js";
import { highlightSelected } from "../ui/highlight.js";

export function gridObserver(action) {

    const grid = document.querySelector('.grid-section');
    const currentState = getCurrentState();

    if (!currentState)
        return;

    if (action.type === 'NEW-GAME') {
        renderGrid(currentState);
        return;
    }

    if (action.type === 'SELECT-CELL') {
        highlightSelected(grid, action.cell);
        return;
    }

    if (action.type === 'INSERT-VALUE') {
        updateCellValue(grid, currentState);
        return;
    }

}