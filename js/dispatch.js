import { SudokuState } from "./state.js";

let currentState = null;

export function dispatch(actionType, selectedCell) {

    if (actionType === 'NEW-GAME') {

        return startNewGame();
    
    }

    if(actionType === 'SELECT-CELL'){

        const selectedCellIndexes = {
            rowIndex: selectedCell.dataset.rowIndex,
            columnIndex: selectedCell.dataset.columnIndex,
            squareIndex: selectedCell.dataset.squareIndex
        }

        currentState.setSelectedCell(selectedCellIndexes);
        return currentState;

    }

}

function startNewGame() {

    const puzzle = sudoku.generate('medium');
    currentState = new SudokuState(sudoku.board_string_to_grid(puzzle));
    return currentState;

}
