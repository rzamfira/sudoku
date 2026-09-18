export function calculateSquareIndex(rowIndex, columnIndex) {

    const squareRow = Math.floor(rowIndex / 3);
    const squareColumn = Math.floor(columnIndex / 3);
    return (squareRow * 3 + squareColumn);

}

export function getNeighborsOfCell(currentCell) {

    const neighbors = [];

    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 9; columnIndex++) {

            if (rowIndex === currentCell.rowIndex && columnIndex === currentCell.columnIndex)
                continue;

            const squareIndex = calculateSquareIndex(rowIndex, columnIndex);

            if (rowIndex === currentCell.rowIndex ||
                columnIndex === currentCell.columnIndex ||
                squareIndex === currentCell.squareIndex) {

                neighbors.push({ rowIndex, columnIndex });

            }
        }
    }

    return neighbors;

}

export function eliminateConflict(conflictMatrix, selectedCell, neighborCell) {

    conflictMatrix[selectedCell.rowIndex][selectedCell.columnIndex] =
        conflictMatrix[selectedCell.rowIndex][selectedCell.columnIndex].filter(cell =>
            cell.rowIndex != neighborCell.rowIndex ||
            cell.columnIndex != neighborCell.columnIndex
        );

    conflictMatrix[neighborCell.rowIndex][neighborCell.columnIndex] =
        conflictMatrix[neighborCell.rowIndex][neighborCell.columnIndex].filter(cell =>
            cell.rowIndex != selectedCell.rowIndex ||
            cell.columnIndex != selectedCell.columnIndex
        );

}

export function addConflict(conflictMatrix, selectedCell, neighborCell) {

    if (neighborCell.rowIndex !== selectedCell.rowIndex || neighborCell.columnIndex !== selectedCell.columnIndex) {
        conflictMatrix[selectedCell.rowIndex][selectedCell.columnIndex].push({
            rowIndex: neighborCell.rowIndex,
            columnIndex: neighborCell.columnIndex
        });
        conflictMatrix[neighborCell.rowIndex][neighborCell.columnIndex].push({
            rowIndex: selectedCell.rowIndex,
            columnIndex: selectedCell.columnIndex
        });
    }

}

