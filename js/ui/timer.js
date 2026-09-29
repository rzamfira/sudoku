let timerElement = null;

export function createTimerSection() {

    const timerSection = document.createElement('section');
    timerSection.classList.add('timer-section');

    timerSection.appendChild(createTimer());
    timerSection.appendChild(createPauseButton());

    return timerSection;

}

export function updateTimerDisplay(seconds) {

    const minutes = Math.floor(seconds / 60);
    const remaingSeconds = seconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remaingSeconds < 10 ? `0${remaingSeconds}` : remaingSeconds;

    timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;

}

function createTimer() {

    const timerClass = document.createElement('section');
    timerClass.classList.add('timer-class');

    const timerLabel = document.createElement('span');
    timerLabel.classList.add('timer-label');
    timerLabel.textContent = 'Time';

    timerElement = document.createElement(`time`);
    timerElement.classList.add(`timer-display`);
    timerElement.setAttribute('id', 'timer');
    timerElement.setAttribute('datetime', 'PT0S');
    timerElement.textContent = '00:00';

    timerClass.appendChild(timerLabel);
    timerClass.appendChild(timerElement);

    return timerClass;

}

function createPauseButton() {

    const pauseButton = document.createElement('button');
    pauseButton.classList.add('pause-button');
    pauseButton.id = 'pause-button';

    const pauseIcon = document.createElement('span');
    pauseIcon.classList.add('pause-icon');
    const playIcon = document.createElement('span');
    playIcon.classList.add('play-icon');

    pauseButton.append(pauseIcon, playIcon);

    return pauseButton;

}
