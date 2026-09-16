export function updateConflictMatrix(conflictMatrix, userPuzzle, selectedCell, value, previousValue) {

    userPuzzle.forEach((row, rowIndex) => {
        row.forEach((currentValue, columnIndex) => {

            if (currentValue === '.')
                return;

            if (isNeighborWithSelectedCell(selectedCell, rowIndex, columnIndex)) {

                if (previousValue === currentValue) {
                    eliminateConflict(conflictMatrix, selectedCell, rowIndex, columnIndex);
                }
                if (value === currentValue) {
                    addConflict(conflictMatrix, selectedCell, rowIndex, columnIndex);
                }

            }
        });
    });

    return conflictMatrix;

}

function isNeighborWithSelectedCell(selectedCell, rowIndex, columnIndex) {

    const squareRow = Math.floor(rowIndex / 3);
    const squareColumn = Math.floor(columnIndex / 3);
    const squareIndex = squareRow * 3 + squareColumn;

    return (
        rowIndex == selectedCell.rowIndex ||
        columnIndex == selectedCell.columnIndex ||
        squareIndex == selectedCell.squareIndex
    );


}

function eliminateConflict(conflictMatrix, selectedCell, rowIndex, columnIndex) {

    if (rowIndex != selectedCell.rowIndex || columnIndex != selectedCell.columnIndex) {

        conflictMatrix[selectedCell.rowIndex][selectedCell.columnIndex] =
            conflictMatrix[selectedCell.rowIndex][selectedCell.columnIndex].filter(cell =>
                cell.rowIndex !== rowIndex ||
                cell.columnIndex !== columnIndex
            );

        conflictMatrix[rowIndex][columnIndex] =
            conflictMatrix[rowIndex][columnIndex].filter(cell =>
                cell.rowIndex !== selectedCell.rowIndex ||
                cell.columnIndex !== selectedCell.columnIndex
            );

    }
}

function addConflict(conflictMatrix, selectedCell, rowIndex, columnIndex) {
    if (rowIndex != selectedCell.rowIndex || columnIndex != selectedCell.columnIndex) {
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
