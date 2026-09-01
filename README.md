# Sudoku

## Requirements
- Develop a sudoku game
- New game option (no difficulty settings, just use normal difficulty) 
- Keyboard support for navigating the grid and inputting numbers. 
- Highlight for: 
-  selected cell,  
-  line, column, and square neighbors 
-  same value cells 
-  visible conflict with another cell value 
- Validation: only mark a cell as invalid if the mistake is visible on the grid. Otherwise let the player discover his mistake at a later time in the game. 
- Undo, Erase and Notes. 
- Timer with pause button and hiding the grid. 
- Responsive layout. The design should be identical to the one on the website. 
- Do not implement: the mistake counter, the hint functionality. 

## JavaScript Structure

### `main.js`
- initialize the app
- make the connections between js modules
- create initial state ( puzzle generator, get the solution, send data to state.js ) 
- render initial grid and controls (grid.js)
- event handlers: 
-  click on a grid cell (puzzle.js)
-  numpad click (puzzle.js)
-  keyboard input (puzzle.js)
-  undo click (puzzle.js)
-  erase click (puzzle.js)
-  notes click (puzzle.js)
-  pause click 
-  new game click (sudokuGenerator.js -> state.js -> grid.js)
- timer start
- handle state changes:
-  request grid re-rendering (grid.js)
-  request victory validation (puzzle.js)
-  trigger the victory screen 

### `state.js` 
- define the initial state:
-  initialPuzzle: initial sudoku numbers
-  solution
-  currentPuzzle: sudoku after changes
-  notes
-  selectedCell
-  history: for undo ( keeping track of notes & other actions )
-  time
-  isPaused ( for hiding grid )
-  isWon	
- new game state ( starting from initial state, receive a different puzzle from sudokuGenerator.js, reset the properties )
- update state ( handling the changes, updating the properties )

### `grid.js`
- create the grid structure ( to keep track of the cell numbers )
- render the values 
- handle selectedCell ( highlight the column, the row, the square, cells with same value, conflicts )
- render notes
- hide or show the grid during pause

### `puzzle.js`
- handle player input ( can come from keyboard, from numpad buttons or from undo, erase, notes buttons )
- verify if the selectedCell can be modified
- insert a value in selectedCell
- erase a value from the selectedCell
- add notes or erase notes ( using backspace or erase button )
- undo the last action
- keeping track of history for undo button
- check for conflicts
- check for game won
- send updates to state.js

### `sudokuGenerator.js`
- generate puzzle
- solution
