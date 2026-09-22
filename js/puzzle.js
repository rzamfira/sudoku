export function calculateSquareIndex(rowIndex, columnIndex) {

    const squareRow = Math.floor(rowIndex / 3);
    const squareColumn = Math.floor(columnIndex / 3);
    return (squareRow * 3 + squareColumn);

}

export function moveSelectedCell(selectedCell, direction) {

    let rowIndex = selectedCell.rowIndex;
    let columnIndex = selectedCell.columnIndex;

    if (direction === 'ArrowUp' && rowIndex > 0)
        rowIndex--;
    else if (direction === 'ArrowDown' && rowIndex < 8)
        rowIndex++;
    else if (direction === 'ArrowLeft' && columnIndex > 0)
        columnIndex--;
    else if (direction === 'ArrowRight' && columnIndex < 8)
        columnIndex++;

    return {
        rowIndex,
        columnIndex,
        squareIndex: calculateSquareIndex(rowIndex, columnIndex)
    };

}

export function updateConflictMatrix(userPuzzle, selectedCell, conflictMatrix) {


    const selectedValue = userPuzzle[selectedCell.rowIndex][selectedCell.columnIndex];
    const selectedCellConflicts = conflictMatrix[selectedCell.rowIndex][selectedCell.columnIndex];

    const neighborCells = getNeighborsOfCell(selectedCell);
    neighborCells.forEach((neighborCell) => {

        const neighborValue = userPuzzle[neighborCell.rowIndex][neighborCell.columnIndex];
        const neighborCellConflicts = conflictMatrix[neighborCell.rowIndex][neighborCell.columnIndex];

        eliminateConflict(selectedCell, neighborCellConflicts);
        eliminateConflict(neighborCell, selectedCellConflicts);

        if (neighborValue === '.')
            return;

        if (neighborValue === selectedValue) {
            addConflict(neighborCell, selectedCellConflicts);
            addConflict(selectedCell, neighborCellConflicts);
        }

    });

}

function getNeighborsOfCell(currentCell) {

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

function eliminateConflict(conflictCell, conflictArray) {

    const conflictIndex = conflictArray.findIndex((cell) => {
        return (cell.rowIndex === conflictCell.rowIndex && cell.columnIndex === conflictCell.columnIndex);
    });

    if (conflictIndex !== -1)
        conflictArray.splice(conflictIndex, 1);

}

function addConflict(conflictCell, conflictArray) {

    conflictArray.push({
        rowIndex: conflictCell.rowIndex,
        columnIndex: conflictCell.columnIndex
    });


}

export function modifyCellNotes(notesArray, value) {

    if (value === '.')
        return [];

    const noteValue = Number(value);
    const index = notesArray.indexOf(noteValue);

    if (index !== -1)
        notesArray.splice(index, 1);

    else {
        notesArray.push(noteValue);
    }

    return notesArray;

}

