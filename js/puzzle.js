import { getSelectedCellNeighbors } from "./ui/grid.js";

export function updateConflictMatrix(conflictMatrix, selectedCell, newSelectedValue, previousSelectedValue) {

    const relatedCells = getSelectedCellNeighbors();

    relatedCells.forEach(cell => {

        const relatedCellValue = cell.textContent;
        const rowIndex = cell.dataset.rowIndex;
        const columnIndex = cell.dataset.columnIndex;

        if (relatedCellValue === '')
            return;

        if (relatedCellValue === previousSelectedValue) {
            eliminateConflict(conflictMatrix, selectedCell, rowIndex, columnIndex);
        }

        if (relatedCellValue === newSelectedValue) {
            addConflict(conflictMatrix, selectedCell, rowIndex, columnIndex);
        }

    });

    return conflictMatrix;

}

export function updateNotesMatrix(cellNotesMatrix, selectedCell, newValue, previousNotes) {

    if (newValue === '.') {
        cellNotesMatrix[selectedCell.rowIndex][selectedCell.columnIndex].fill(0);
        return cellNotesMatrix;
    }

    if (previousNotes[newValue] === 0) {
        cellNotesMatrix[selectedCell.rowIndex][selectedCell.columnIndex][newValue] = 1;
    }
    else { cellNotesMatrix[selectedCell.rowIndex][selectedCell.columnIndex][newValue] = 0; }
    
    return cellNotesMatrix;
}

function eliminateConflict(conflictMatrix, selectedCell, rowIndex, columnIndex) {

    if (rowIndex !== selectedCell.rowIndex || columnIndex !== selectedCell.columnIndex) {

        conflictMatrix[selectedCell.rowIndex][selectedCell.columnIndex] =
            conflictMatrix[selectedCell.rowIndex][selectedCell.columnIndex].filter(cell =>
                cell.rowIndex != rowIndex ||
                cell.columnIndex != columnIndex
            );

        conflictMatrix[rowIndex][columnIndex] =
            conflictMatrix[rowIndex][columnIndex].filter(cell =>
                cell.rowIndex != selectedCell.rowIndex ||
                cell.columnIndex != selectedCell.columnIndex
            );

    }

}

function addConflict(conflictMatrix, selectedCell, rowIndex, columnIndex) {

    if (rowIndex !== selectedCell.rowIndex || columnIndex !== selectedCell.columnIndex) {
        conflictMatrix[selectedCell.rowIndex][selectedCell.columnIndex].push({
            rowIndex: rowIndex,
            columnIndex: columnIndex
        });
        conflictMatrix[rowIndex][columnIndex].push({
            rowIndex: selectedCell.rowIndex,
            columnIndex: selectedCell.columnIndex
        });
    }

}
