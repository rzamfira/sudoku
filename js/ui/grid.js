import { highlightConflicts, highlightSelectedCell, removeHighlight } from "./highlight.js";

// function to create the sudoku grid
export function createGrid() {

    const grid = document.createElement('section');
    grid.classList.add("grid-section");

    const sudokuSquares = createSudokuSquares(grid);
    createGridCells(sudokuSquares);

    return grid;

}

export function renderGrid(currentState) {

    const cells = document.querySelectorAll(`.grid-item`);

    cells.forEach(currentCell => {
        updateCellDisplay(currentCell, currentState);
    });

}

function createSudokuSquares(grid) {

    const sudokuSquares = [];

    for (let i = 0; i < 9; i++) {

        const square = document.createElement(`section`);
        square.classList.add('grid-square');
        square.setAttribute('id', `square-${i}`);

        sudokuSquares.push(square);
        grid.appendChild(square);

    }

    return sudokuSquares;

}

function createGridCells(sudokuSquares) {

    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 9; columnIndex++) {

            const cell = document.createElement('span');
            cell.classList.add(`grid-item`);

            cell.dataset.rowIndex = rowIndex;
            cell.dataset.columnIndex = columnIndex;

            // calculate the square index based on the cell's position
            const squareRow = Math.floor(rowIndex / 3);
            const squareColumn = Math.floor(columnIndex / 3);
            const squareIndex = squareRow * 3 + squareColumn;
            cell.dataset.squareIndex = squareIndex;

            sudokuSquares[squareIndex].appendChild(cell);

        }
    }

}

function updateCellDisplay(currentCell, currentState) {

    removeHighlight(currentCell);

    const currentValue = currentState.getPuzzleValueFromState(currentCell.dataset.rowIndex, currentCell.dataset.columnIndex);

    const selectedCell = currentState.getSelectedCell();
    const selectedValue = currentState.getPuzzleValueFromState(selectedCell.rowIndex, selectedCell.columnIndex);

    const isCellEditable = currentState.isCellEditable(currentCell.dataset.rowIndex, currentCell.dataset.columnIndex);
    const hasCellConflicts = currentState.hasCellConflicts(currentCell.dataset.rowIndex, currentCell.dataset.columnIndex);

    if (currentState.isCellEmpty(currentCell.dataset.rowIndex, currentCell.dataset.columnIndex))
        currentCell.textContent = '';
    else
        currentCell.textContent = currentValue;

    highlightSelectedCell(currentCell, selectedCell, selectedValue);
    highlightConflicts(currentCell, isCellEditable, hasCellConflicts);

}



