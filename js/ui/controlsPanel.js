// function to create the Control Panel
export function createControlPanel() {

    const control = document.createElement('aside');
    control.classList.add("controls-section");

    control.appendChild(createTimerSection());
    control.appendChild(createGameAction());
    control.appendChild(createNumpadSection());
    control.appendChild(createNewGameSection());

    return control;

}

function createTimerSection() {
    
    const timerSection = document.createElement('section');
    timerSection.classList.add('timer-section');

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

    const pauseButton = document.createElement('button');
    pauseButton.classList.add('pause-button');
    const pauseIcon = document.createElement('span');
    pauseIcon.classList.add('pause-icon');
    pauseButton.appendChild(pauseIcon);

    timerSection.appendChild(timerClass);
    timerSection.appendChild(pauseButton);

    return timerSection;

}

// function to create the Game Action Buttons (Undo, Erase, Notes)
function createGameAction() {
    
    const gameActionSection = document.createElement('section');
    gameActionSection.classList.add(`game-action-section`);

    gameActionSection.appendChild(createIconButton('undo'));
    gameActionSection.appendChild(createIconButton('erase'));
    gameActionSection.appendChild(createIconButton('notes'));
    
    return gameActionSection;

}

function createIconButton(type) {

    const button = document.createElement('button');
    button.classList.add(`game-action-button`);
    button.setAttribute('id',`${type}-button`);
    button.dataset.action = `${type}`;

    const icon = document.createElement('img');
    icon.classList.add('icon-game-action');
    icon.src = `./icons/${type}.svg`;
    icon.alt = `${type}`;

    button.appendChild(icon);
    
    return button;

}

function createNumpadSection(){
    
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

    return numpadSection;

}

function createNewGameSection(){
    
    const newGameSection = document.createElement(`section`);
    newGameSection.classList.add(`new-game-section`);
    const newGameButton = document.createElement('button');
    newGameButton.classList.add('new-game-button');
    newGameButton.textContent = "New Game";
    newGameSection.appendChild(newGameButton);

    return newGameSection;

}
