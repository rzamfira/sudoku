let totalSeconds = 0;
let timerId = null;
let timerElement = null;

export function startTimer() {

    timerElement = document.getElementById('timer');
    timerId = setInterval(updateTimer, 1000);

}

export function pauseTimer() {

    clearInterval(timerId);
    timerId = null;

}

export function resetTimer() {

    pauseTimer();

    totalSeconds = 0;
    timerElement.textContent = '00:00';

    startTimer();

}

function updateTimer() {

    totalSeconds++;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;

}
