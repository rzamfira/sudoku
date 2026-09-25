let totalSeconds = 0;
let timerId = null;

export function createTimerSection() {

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
    pauseButton.id = 'pause-button';

    const pauseIcon = document.createElement('span');
    pauseIcon.classList.add('pause-icon');
    const playIcon = document.createElement('span');
    playIcon.classList.add('play-icon');

    pauseButton.append(pauseIcon, playIcon);

    timerSection.appendChild(timerClass);
    timerSection.appendChild(pauseButton);

    return timerSection;

}

export function startTimer() {

    timerId = setInterval(updateTimer, 1000);

}

export function pauseTimer() {

    clearInterval(timerId);
    timerId = null;

}

export function resetTimer() {

    const timerElement = document.getElementById('timer');

    pauseTimer();

    totalSeconds = 0;
    timerElement.textContent = '00:00';

    startTimer();

}

function updateTimer() {

    const timerElement = document.getElementById('timer');

    totalSeconds++;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;

}
