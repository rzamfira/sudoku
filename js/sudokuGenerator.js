export function generateSudoku() {
    const puzzle = sudoku.generate('medium');
    const solution = sudoku.solve(puzzle);

    return{
        puzzle,
        solution
    };

}