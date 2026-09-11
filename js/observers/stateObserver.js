import { getCurrentState, initializeState } from "../state.js";
import { generateSudokuGame } from "../sudokuGenerator.js";

export function stateObserver(action) {

    if (action.type === 'NEW-GAME') {

        const puzzle = generateSudokuGame();
        initializeState(puzzle);
        return;

    }

    const currentState = getCurrentState();

    if (action.type === 'SELECT-CELL') {
        currentState.setSelectedCell(action.cell);
        return;
    }

    if (action.type === 'INSERT-VALUE') {

        const actionInfo = currentState.setCellValue(action.value);
        if (actionInfo) {

            currentState.addHistory(actionInfo);
            console.log(currentState.history);

        }
    }

}