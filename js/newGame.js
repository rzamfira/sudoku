import { updateGrid } from "./grid.js";

export function startNewGame() {

    const puzzle = sudoku.generate('medium'); 
    updateGrid(sudoku.board_string_to_grid(puzzle));

}