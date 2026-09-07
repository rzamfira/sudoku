// function to create the control section
export function createControls() {

    // create an aside element for all the controls
    const control = document.createElement('aside');
    control.classList.add("controls-section");

    // timer section
    const timerSection = document.createElement('section');
    timerSection.classList.add('timer-section');

    // timer
    const timerClass = document.createElement('section');
    timerClass.classList.add('timer-class');
    const timerLabel = document.createElement('span');
    timerLabel.classList.add('timer-label');
    timerLabel.textContent = 'Time';
    const time = document.createElement(`time`);
    time.classList.add(`timer-display`);
    time.setAttribute('id', 'timer');
    time.setAttribute('datetime', 'PT0S');
    time.textContent = '00:00';
    timerClass.appendChild(timerLabel);
    timerClass.appendChild(time);

    // pause button
    const pauseButton = document.createElement('button');
    pauseButton.classList.add('pause-button');
    const pauseIcon = document.createElement('span');
    pauseIcon.classList.add('pause-icon');
    pauseButton.appendChild(pauseIcon);

    timerSection.appendChild(timerClass);
    timerSection.appendChild(pauseButton);

    // game action section
    const gameActionSection = document.createElement('section');
    gameActionSection.classList.add(`game-action-section`);
    const undoButton = createGameActionButton("undo", 'M 13.71 2.46 a 1 1 0 0 1 0.14 1.32 l -0.08 0.1 l -2.15 2.32 l 3.41 0.02 a 10 10 0 1 1 -10 10 a 1 1 0 1 1 2 0 a 8 8 0 1 0 8.25 -8 h -0.25 l -3.48 -0.02 l 2.28 2.53 a 1 1 0 0 1 0.01 1.32 l -0.09 0.1 a 1 1 0 0 1 -1.32 0 l -0.09 -0.08 l -3.76 -4.18 a 1 1 0 0 1 -0.07 -1.25 l 0.08 -0.1 l 3.7 -4.02 a 1 1 0 0 1 1.42 -0.06 Z');
    const eraseButton = createGameActionButton("erase", 'M 27.13 25.11 a 1 1 0 0 1 0.12 2 h -6.9 a 1 1 0 0 1 -0.11 -2 H 27.13 Z M 21.48 4.08 l 0.17 0.14 l 0.16 0.15 l 3.76 3.76 a 4 4 0 0 1 0.15 5.5 l -0.15 0.16 l -11.32 11.32 h 2.04 a 1 1 0 0 1 1 0.89 v 0.11 a 1 1 0 0 1 -0.88 1 H 6.52 a 3 3 0 0 1 -1.98 -0.74 l -0.14 -0.14 l -2.23 -2.22 a 4 4 0 0 1 -0.15 -5.5 l 0.15 -0.16 L 16.15 4.37 a 4 4 0 0 1 5.33 -0.29 Z m -11.52 9.3 l -6.38 6.38 a 2 2 0 0 0 -0.11 2.7 l 0.11 0.13 l 2.23 2.23 a 1 1 0 0 0 0.58 0.28 l 0.13 0.01 h 4.9 l 5.13 -5.13 l -6.59 -6.6 Z m 7.87 -7.82 l -0.14 0.1 l -0.13 0.13 l -6.18 6.18 l 6.59 6.6 l 6.19 -6.2 a 2 2 0 0 0 0.11 -2.7 l -0.11 -0.12 l -3.77 -3.76 a 2 2 0 0 0 -2.56 -0.22 Z');
    const notesButton = createGameActionButton("notes", 'M 25.43 4.76 a 5.42 5.42 0 0 1 0.19 7.52 l -0.18 0.2 l -13.5 13.48 a 0.91 0.91 0 0 1 -1.21 0.08 l -0.1 -0.08 l -5.07 -5.08 l -0.59 4.34 l 3.25 -0.44 c 0.44 -0.05 0.84 0.2 1 0.58 l 0.03 0.11 l 0.02 0.11 c 0.06 0.47 -0.24 0.91 -0.7 1.03 l -0.1 0.02 l -4.45 0.6 a 0.94 0.94 0 0 1 -0.79 -0.27 a 0.92 0.92 0 0 1 -0.26 -0.65 v -0.13 l 1 -7.4 a 0.92 0.92 0 0 1 0.19 -0.44 l 0.08 -0.09 L 17.71 4.76 a 5.45 5.45 0 0 1 7.72 0 Z m 0.35 20.08 a 1 1 0 1 1 0 2 h -8.7 a 1 1 0 0 1 0 -2 h 8.7 Z M 21.4 10.18 L 9.43 22.13 L 11.3 24 l 11.95 -11.95 l -1.86 -1.86 Z m -3.23 -3.23 L 6.2 18.91 l 1.92 1.91 L 20.07 8.86 l -1.9 -1.9 Z m 3.42 -1.93 c -0.69 0 -1.35 0.2 -1.92 0.56 l -0.15 0.1 l 5.01 5 l 0.1 -0.14 c 0.33 -0.5 0.51 -1.09 0.55 -1.7 l 0.01 -0.22 a 3.58 3.58 0 0 0 -3.6 -3.6 Z');
    gameActionSection.appendChild(undoButton);
    gameActionSection.appendChild(eraseButton);
    gameActionSection.appendChild(notesButton);

    // numpad section
    const numpadSection = document.createElement(`section`);
    numpadSection.classList.add(`numpad-section`);
    for (let i = 1; i <= 9; i++) {

        const number = document.createElement('button');
        number.classList.add('numpad-button');
        number.setAttribute('id', `number-${i}`);
        number.textContent = i;
        number.dataset.value = i;
        numpadSection.appendChild(number);

    }

    //new game section
    const newGameSection = document.createElement(`section`);
    newGameSection.classList.add(`new-game-section`);
    const newGameButton = document.createElement('button');
    newGameButton.classList.add('new-game-button');
    newGameButton.textContent = "New Game";
    newGameSection.appendChild(newGameButton);

    control.appendChild(timerSection);
    control.appendChild(gameActionSection);
    control.appendChild(numpadSection);
    control.appendChild(newGameSection);

    return control;
}

// function to create the Game Action Buttons 
function createGameActionButton(type, pathValue) {
    
    const button = document.createElement('button');
    button.classList.add(`game-action-button`);
    button.setAttribute('id',`${type}-button`);
    button.dataset.action = `${type}`;

    // create the icon for each button
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    icon.classList.add('icon-game-action');
    icon.setAttribute('id', `${type}-icon`);
    icon.setAttribute('viewBox', '0 0 30 31');
    path.setAttribute('d', pathValue);
    path.classList.add(`svg-path`);
    icon.appendChild(path);
    button.appendChild(icon);
    return button;

}