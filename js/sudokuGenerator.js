export function generateSudokuGame() {

    const puzzleString = sudoku.generate('medium');
    return sudoku.board_string_to_grid(puzzleString);

}
