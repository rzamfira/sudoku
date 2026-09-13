export function getCellConflict(userPuzzle) {

    const conflictMatrix = createEmptyConflicts();

    userPuzzle.forEach((currentRow, currentRowIndex) => {
        currentRow.forEach((currentValue, currentColumnIndex) => {
            
            if (currentValue === '.')
                return;
            const currentCellIndex = currentRowIndex * 9 + currentColumnIndex;

            userPuzzle.forEach((verifyRow, verifyRowIndex) => {
                verifyRow.forEach((verifyValue, verifyColumnIndex) => {

                    if (verifyValue === '.')
                        return;

                    const verifyCellIndex = verifyRowIndex * 9 + verifyColumnIndex;
                    if (verifyCellIndex <= currentCellIndex)
                        return;

                    const currentCell = { value: currentValue, rowIndex: currentRowIndex, columnIndex: currentColumnIndex };
                    const verifyCell = { value: verifyValue, rowIndex: verifyRowIndex, columnIndex: verifyColumnIndex };
                    verifyConflict(currentCell, verifyCell, conflictMatrix);

                });
            });
        });
    });

    return conflictMatrix;

}

function createEmptyConflicts() {

    const conflicts = [];

    for (let row = 0; row < 9; row++) {
        const currentRow = [];
        for (let column = 0; column < 9; column++) {
            currentRow.push([]);
        }
        conflicts.push(currentRow);
    }

    return conflicts;
}

function verifyConflict(currentCell, verifyCell, conflictMatrix) {

    if (currentCell.value !== verifyCell.value)
        return;

    const currentSquareRow = Math.floor(currentCell.rowIndex / 3);
    const currentSquareColumn = Math.floor(currentCell.columnIndex / 3);

    const verifySquareRow = Math.floor(verifyCell.rowIndex / 3);
    const verifySquareColumn = Math.floor(verifyCell.columnIndex / 3);

    if (currentCell.rowIndex === verifyCell.rowIndex || currentCell.columnIndex === verifyCell.columnIndex ||
        (currentSquareRow === verifySquareRow && currentSquareColumn === verifySquareColumn)) {

        conflictMatrix[currentCell.rowIndex][currentCell.columnIndex].push({
            rowIndex: verifyCell.rowIndex,
            columnIndex: verifyCell.columnIndex
        });

        conflictMatrix[verifyCell.rowIndex][verifyCell.columnIndex].push({
            rowIndex: currentCell.rowIndex,
            columnIndex: currentCell.columnIndex
        });

    }
}