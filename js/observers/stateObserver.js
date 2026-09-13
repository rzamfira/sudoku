import { getCellConflict } from "../puzzle.js";
import { getCurrentState, initializeState } from "../state.js";
import { generateSudokuGame } from "../sudokuGenerator.js";

export function stateObserver(action, dispatcher) {

    if (action.type === 'NEW-GAME') {

        const puzzle = generateSudokuGame();
        initializeState(puzzle);
        dispatcher.dispatch({ type: 'STATE-UPDATED' });
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
            const cellConflict = getCellConflict(currentState.userPuzzle);
            currentState.setCellConflict(cellConflict);
            dispatcher.dispatch({ type: 'STATE-UPDATED' });

        }

        return;

    }

}