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
        handleStateChange(actionInfo);

    }

    if (action.type === 'ERASE-VALUE') {

        const actionInfo = currentState.eraseValue();
        handleStateChange(actionInfo);
        
    }

    function handleStateChange(actionInfo) {

        if (!actionInfo)
            return;

        currentState.addHistory(actionInfo);
        const cellConflict = getCellConflict(currentState.userPuzzle);
        currentState.setCellConflict(cellConflict);
        console.log(currentState.history);
        dispatcher.dispatch({ type: 'STATE-UPDATED' });

    }

}