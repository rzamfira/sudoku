export function highlightSelected(grid, selectedCell) {

    const cells = grid.querySelectorAll('.grid-item');
    cells.forEach((currentCell) => {

        highlightNeighbors(currentCell, selectedCell);

    });

    selectedCell.classList.add("selected-cell");

}

export function highlightConflict(grid, conflictCells){
    const cells = grid.querySelectorAll('.grid-item');
    cells.forEach((currentCell) => {
        currentCell.classList.remove('highlight-invalid');
    });

    conflictCells.forEach(({rowIndex,columnIndex}) =>{
         const cell = grid.querySelector(`.grid-item[data-row-index="${rowIndex}"][data-column-index="${columnIndex}"]`);
         if(cell)
            cell.classList.add('highlight-invalid');
    })
}


// function to highlight the row, column & square of the selected cell
function highlightNeighbors(cell, selectedCell) {

    removeHighlight(cell);

    if (cell.dataset.rowIndex === selectedCell.dataset.rowIndex ||
        cell.dataset.columnIndex === selectedCell.dataset.columnIndex ||
        cell.dataset.squareIndex === selectedCell.dataset.squareIndex) {
        cell.classList.add('highlight-neighbors');
    }

    if (cell.textContent != '' && cell.textContent === selectedCell.textContent) {
        cell.classList.add('highlight-value'); // highlight the elements with same value too
    }

}

function removeHighlight(cell) {

    cell.classList.remove('highlight-neighbors');
    cell.classList.remove('highlight-value');
    cell.classList.remove('selected-cell');

}