export function highlightSelectedCell(cell, selectedCell, selectedValue) {


    if (cell.dataset.rowIndex == selectedCell.rowIndex && cell.dataset.columnIndex == selectedCell.columnIndex) {
        cell.classList.add('selected-cell');
    }

    if (cell.dataset.rowIndex == selectedCell.rowIndex ||
        cell.dataset.columnIndex == selectedCell.columnIndex ||
        cell.dataset.squareIndex == selectedCell.squareIndex) {
        cell.classList.add('highlight-neighbors');
    }

    if (cell.textContent != '' && cell.textContent === selectedValue) {
        cell.classList.add('highlight-value'); // highlight the elements with same value too
    }

}

export function highlightConflicts(cell, isCellEditable, hasCellConflicts) {

    if (isCellEditable) {
        if (hasCellConflicts) {
            cell.classList.add('invalid-value');
        } else {
            cell.classList.add('valid-value');
        }
    }

    if (hasCellConflicts) {
        cell.classList.add('highlight-invalid');
    }

}


export function removeHighlight(cell) {

    cell.classList.remove('selected-cell', 'highlight-neighbors', 'highlight-value');
    cell.classList.remove('invalid-value', 'valid-value');
    cell.classList.remove('highlight-invalid');

}