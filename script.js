const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

let timeRemaining = WORK_DURATION;
let isRunning = false;
let currentMode = 'work';
let intervalId = null;

const app = document.getElementById('app');
const modeIndicator = document.getElementById('mode-indicator');
const timeDisplay = document.getElementById('time-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function durationFor(mode) {
  return mode === 'work' ? WORK_DURATION : BREAK_DURATION;
}

function render() {
  timeDisplay.textContent = formatTime(timeRemaining);
  modeIndicator.textContent = currentMode === 'work' ? 'Work' : 'Break';
  app.dataset.mode = currentMode;
  startPauseBtn.textContent = isRunning ? 'Pause' : 'Start';
}

function switchMode() {
  currentMode = currentMode === 'work' ? 'break' : 'work';
  timeRemaining = durationFor(currentMode);
}

function tick() {
  if (timeRemaining === 0) {
    switchMode();
  } else {
    timeRemaining -= 1;
  }
  render();
}

function start() {
  if (isRunning) return;
  isRunning = true;
  intervalId = setInterval(tick, 1000);
  render();
}

function pause() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(intervalId);
  intervalId = null;
  render();
}

function reset() {
  pause();
  timeRemaining = durationFor(currentMode);
  render();
}

startPauseBtn.addEventListener('click', () => {
  if (isRunning) {
    pause();
  } else {
    start();
  }
});

resetBtn.addEventListener('click', reset);

render();
