# Sudoku

## Requirements
- Develop a sudoku game
- New game option (no difficulty settings, just use normal difficulty) 
- Keyboard support for navigating the grid and inputting numbers. 
- Highlight for: 
  - selected cell,  
  - line, column, and square neighbors 
  - same value cells 
  - visible conflict with another cell value 
- Validation: only mark a cell as invalid if the mistake is visible on the grid. Otherwise let the player discover his mistake at a later time in the game. 
- Undo, Erase and Notes. 
- Timer with pause button and hiding the grid. 
- Responsive layout. The design should be identical to the one on the website. 
- Do not implement: the mistake counter, the hint functionality. 

## Overview

A browser-based Sudoku game with keyboard and mouse controls, notes, undo, visible-conflict highlighting, and a timer with pause functionality.

## How to Play

- Select a cell by clicking it or navigating with the arrow keys.
- Enter a number using the keyboard or on-screen number pad.
- Use Erase to clear an editable cell.
- Enable Notes to enter or remove notes.
- Use Undo to revert the previous change.
- Select Pause to pause the timer and hide the grid.
- Select New Game to start a new puzzle.

## Sudoku generator

The project uses the `sudoku.js` library by Robatron.
Source : [sudoku.js](https://github.com/robatron/sudoku.js/)

The library is used to:
- generate a new Sudoku puzzle;
- will have medium difficulty set as default
- convert the puzzle between string and 9x9 gird formats.

## Application Layout

The application is organised into two main areas:
- the sudoku grid
- the controls panel (timer section, controls section, new game section)

The main layout uses a flexible horizontal structure, where the sudoku board is displayed on the left, while the controls panel is displayed on the right.

### Design for the sudoku grid

The sudoku board is structured as a 9x9 grid divided into nine 3x3 squares. Each square contains nine cells with values generated from `sudoku.js`.

Every cell stores its rowIndex, columnIndex and squareIndex. These indexes are used to place cells correctly and support highlighting and validation.

The main grid and each square use equal rows and column to preserve the layout. The board uses square proportions so the cells remain proportional when the layout is resized.

The Sudoku board has a main outer border that defines the limits of the entire grid.

To avoid duplicated borders between neighboring 3×3 squares, the square elements do not all use borders on every side:
- the right border is applied to the squares that separate the first and second 3×3 columns;
- the bottom border is applied to the squares that separate the first and second 3×3 rows;
- the remaining outer border is provided by the main grid container.

### Design for the control section

The control panel is displayed next to the Sudoku board. It is structured into three main sections

- Timer Section that displays the elapsed time and contains the pause button
- Controls Section that contanins the Undo, Erase, Notes buttons and the numbers from 1 to 9 which uses a 3x3 grid layout, where each number is represented by a button
- New Game Section that contains the New Game button and stretches to the width of the numpad

The controls are generated dynamically with JavaScript and grouped inside the `timer-section`,`controls-section` and `new-game-section` elements.

## JavaScript Structure

### Game Logic

#### `main.js`

This module initializes the game interface and connects DOM elements to the application logic through event listeners.

It handels user actions:
- key presses
- cell selection
- entering or erasing numbers
- undo
- notes
- pausing
- starting a new game
For each action, it checks the game state, such as whether the game has been won or is paused, and then calls the appropiate methods on `state.js`.

#### state.js

The `state.js` module defines the `SudokuState` class, which stores and manages the current state of a Sudoku game. It acts as the connection between user actions and the game’s data: methods such as `updateCell()`, `undoChange()`, and `togglePause()` update the state, while relevant UI modules are called to display those changes.

The class keeps its internal fields private using JavaScript’s `#` syntax. These fields store:
- `#initialPuzzle` — the original puzzle, used to determine which cells are fixed and cannot be edited.
- `#userPuzzle` — the current board, including the player’s entries.
- `#selectedCell` — the currently selected cell’s row, column, and square indexes.
- `#conflictMatrix` — visible conflicts between entered values.
- `#isNotesEnabled` and `#notesMatrix` — whether notes mode is active and the notes stored in each cell.
- `#history` — previous cell values and notes, used by the Undo feature.
- `#isPaused`, `#timerId`, and `#elapsedSeconds` — the timer and pause state.
- `#isWon` — whether the player has completed the puzzle.

Getters and setters provide controlled access to selected state values.

The class also provides helper methods for querying cells, including checking whether a cell is editable or empty, and whether it has conflicts.

Its main action methods handle game operations:
- `updateCell()` enters or erases a value, or updates notes when Notes mode is enabled.
- `undoChange()` restores the previous selected cell, value, and notes.
- `toggleNotesEnabled()` switches Notes mode on or off.
- `togglePause()` pauses or resumes the game.
- `startGameTimer()` resets the elapsed time and starts the game timer.
- `initializeGame()` creates a new game state, renders the grid, and starts the timer.

#### puzzle.js
This module contains helper functions for working with Sudoku cells and puzzle rules. It supports grid navigation, cell-coordinate lookup, conflict detection, notes, and win-condition checking.

`puzzle.js` does not access or modify the state stored inside `SudokuState` directly. Instead, `state.js` passes the required data such as the user’s puzzle, the selected cell, and the conflict matrix to functions in `puzzle.js`. Those functions process the data they receive and return a result or, where needed, update a passed-in structure:
- `calculateSquareIndex()` calculates which 3×3 square contains a cell, based on its row and column.
- `getNextCellCoordinates()` calculates the next cell’s coordinates when the player presses an arrow key. Movement stops at the grid’s edges.
- `getCellCoordinates()` reads a cell’s row, column, and square indexes from its DOM data attributes.
- `updateConflictMatrix()` checks the selected cell against other cells in the same row, column, or 3×3 square. It updates the conflict matrix when matching values are found and removes conflicts that are no longer present.
- `getNeighborsOfCell()`, `eliminateConflict()`, and `addConflict()` are internal helper functions used by the conflict-checking logic.
- `modifyCellNotes()` adds or removes a number from a cell’s notes. Passing `'.'` clears the notes.
- `isGameWon()` returns `true` when every cell contains a value and the conflict matrix contains no conflicts.

#### `sudokuGenerator.js`
This module generates a new Sudoku puzzle at medium difficulty and converts it into a grid format for the game.

### UI modules

#### `appLayout.js`
This module creates the main game layout by combining the Sudoku grid, timer, controls, and New Game section. It also updates the layout’s UI state by toggling CSS classes when the game is paused or won.

#### `controlsPanel.js`

This module creates the controls panel, including the Undo, Erase, and Notes buttons, the number pad, and the New Game button. It also updates the Notes button’s appearance when Notes mode is enabled or disabled.

#### `grid.js`

This module creates the Sudoku board, including its 3×3 squares, cells, notes grids, and pause and win overlays. It also renders the current game state in the cells, displaying values and notes and applying the appropriate highlights.

Cell values, notes, and other cell properties are read through the `SudokuState` methods rather than by accessing its internal puzzle data directly.

#### `highlight.js`

This module manages the CSS highlights applied to Sudoku cells. It highlights the selected cell, its row, column, and 3×3 square, matching values, and visible conflicts. It also removes previous highlight classes before the grid is rendered again.

#### `timer.js`

This module creates the timer section, including the elapsed-time display and Pause button. It also formats elapsed seconds as `MM:SS` and updates the timer display as the game progresses.





