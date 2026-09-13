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

                    if (currentValue !== verifyValue)
                        return;

                    const currentSquareRow = Math.floor(currentRowIndex / 3);
                    const currentSquareColumn = Math.floor(currentColumnIndex / 3);

                    const verifySquareRow = Math.floor(verifyRowIndex / 3);
                    const verifySquareColumn = Math.floor(verifyColumnIndex / 3);

                    if (currentRowIndex === verifyRowIndex || currentColumnIndex === verifyColumnIndex ||
                        (currentSquareRow === verifySquareRow && currentSquareColumn === verifySquareColumn)) {

                        conflictMatrix[currentRowIndex][currentColumnIndex].push({
                            rowIndex: verifyRowIndex,
                            columnIndex: verifyColumnIndex
                        });

                        conflictMatrix[verifyRowIndex][verifyColumnIndex].push({
                            rowIndex: currentRowIndex,
                            columnIndex: currentColumnIndex
                        });

                    }

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