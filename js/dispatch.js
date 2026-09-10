import { SudokuState } from "./state.js";

let currentState = null;

export function dispatch(actionType, value) {

    if (actionType === 'NEW-GAME') {

        return startNewGame();
    
    }

    if(actionType === 'SELECT-CELL'){

        const selectedCellIndexes = {
            rowIndex: value.dataset.rowIndex,
            columnIndex: value.dataset.columnIndex,
            squareIndex: value.dataset.squareIndex
        }

        currentState.setSelectedCell(selectedCellIndexes);
        return currentState;

    }

    if(actionType === 'INSERT-NUMBER-KEYBOARD'){

        const selectedCell = currentState.selectedCell;

        const initialValue = currentState.initialPuzzle[selectedCell.rowIndex][selectedCell.columnIndex];
        if(initialValue !== '.'){
            return currentState;
        }

        const previousValue = currentState.userPuzzle[selectedCell.rowIndex][selectedCell.columnIndex];
        const previousNotes = currentState.notes[selectedCell.rowIndex][selectedCell.columnIndex];
        const action = {
            type: 'value',
            rowIndex: selectedCell.rowIndex,
            columnIndex: selectedCell.columnIndex,
            previousValue: previousValue,
            newValue: value,
            previousNotes: previousNotes,
            newNotes: []
        };

        currentState.addHistory(action);
        console.log(currentState.history);
        
        currentState.userPuzzle[selectedCell.rowIndex][selectedCell.columnIndex] = value;
        return currentState; 

    }

}

function startNewGame() {

    const puzzle = sudoku.generate('medium');
    currentState = new SudokuState(sudoku.board_string_to_grid(puzzle));
    return currentState;

}


