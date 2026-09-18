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

export function eliminateConflict(conflictCell, conflictMatrix) {

    conflictMatrix =
        conflictMatrix.filter(cell =>
            cell.rowIndex != conflictCell.rowIndex ||
            cell.columnIndex != conflictCell.columnIndex
        );

    return conflictMatrix;
}

export function addConflict(conflictCell, conflictMatrix) {

    conflictMatrix.push({
        rowIndex: conflictCell.rowIndex,
        columnIndex: conflictCell.columnIndex
    });

    return conflictMatrix;

}

export function modifyNotesMatrix(notesMatrix, value) {

    if (value === '.')
        return [];

    const noteValue = Number(value);
    const index = notesMatrix.indexOf(noteValue);

    if (index !== -1)
        notesMatrix.splice(index, 1);

    else {
        notesMatrix.push(noteValue);
    }

    return notesMatrix;

}

