export function highlightSelectedCell(cell, selectedCell, puzzle) {

    if (cell.dataset.rowIndex == selectedCell.rowIndex && cell.dataset.columnIndex == selectedCell.columnIndex) {
        cell.classList.add('selected-cell');
    }

    if (cell.dataset.rowIndex == selectedCell.rowIndex ||
        cell.dataset.columnIndex == selectedCell.columnIndex ||
        cell.dataset.squareIndex == selectedCell.squareIndex) {
        cell.classList.add('highlight-neighbors');
    }

    if (cell.textContent != '' && cell.textContent === puzzle[selectedCell.rowIndex][selectedCell.columnIndex]) {
        cell.classList.add('highlight-value'); // highlight the elements with same value too
    }

}

export function highlightInputValue(cell, currentState) {
    if (currentState.isCellEditable(cell.dataset.rowIndex, cell.dataset.columnIndex)) {
        if (currentState.hasConflict(cell.dataset.rowIndex, cell.dataset.columnIndex)) {
            cell.classList.add('invalid-value');
        }
        else {
            cell.classList.add('valid-value');
        }
    }
}

export function highlightConflict(cell, conflictMatrix) {

    if (conflictMatrix[cell.dataset.rowIndex][cell.dataset.columnIndex].length === 0)
        return;

    cell.classList.add('highlight-invalid');

}


export function removeHighlight(cell) {

    cell.classList.remove('selected-cell', 'highlight-neighbors', 'highlight-value');
    cell.classList.remove('invalid-value', 'valid-value');
    cell.classList.remove('highlight-invalid');

}