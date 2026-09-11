export function verifyConflict(userPuzzle, selectedCell, inputValue) {

    const conflictCells = [];

    userPuzzle.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {

            if (rowIndex === selectedCell.rowIndex && columnIndex === selectedCell.columnIndex)
                return;

            if ((value == inputValue && rowIndex == selectedCell.rowIndex) ||
                (value == inputValue && columnIndex == selectedCell.columnIndex))
                conflictCells.push({ rowIndex, columnIndex });

            const currentSquareRow = Math.floor(rowIndex / 3);
            const currentSquareColumn = Math.floor(columnIndex / 3);

            const selectedSquareRow = Math.floor(selectedCell.rowIndex / 3);
            const selectedSquareColumn = Math.floor(selectedCell.columnIndex / 3);
            if (value === inputValue &&
                currentSquareRow === selectedSquareRow &&
                currentSquareColumn === selectedSquareColumn)
                conflictCells.push({ rowIndex, columnIndex });
        });
    });

     if (conflictCells.length > 0) {
        conflictCells.push({
            rowIndex: selectedCell.rowIndex,
            columnIndex: selectedCell.columnIndex
        });
    }

    return conflictCells;

}