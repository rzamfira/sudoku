import { removeHighlight } from "./state.js";

export function newGameEventHandler() {

    const puzzle = sudoku.generate('medium');  // generate the sudoku puzzle with medium difficulty
    const puzzleMatrix = sudoku.board_string_to_grid(puzzle);

    puzzleMatrix.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {

            const cell = document.querySelector(`.grid-item[data-row-index="${rowIndex}"][data-column-index="${columnIndex}"]`);
            removeHighlight(cell);

            if (value !== '.') {
                cell.textContent = value;
            }
            else {
                cell.textContent = '';
            }

        });
    });

}