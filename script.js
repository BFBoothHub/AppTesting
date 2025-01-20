let timeLeft;
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let isWorkTime = true;
let timerId = null;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const workModeButton = document.getElementById('work-mode');
const restModeButton = document.getElementById('rest-mode');
const modeToggleButton = document.getElementById('mode-toggle');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update display elements
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update browser tab title
    document.title = `${timeString} - ${isWorkTime ? 'Work' : 'Break'}`;
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workTime : breakTime;
    modeText.textContent = isWorkTime ? 'Time to focus!' : 'Break Time';
    modeToggleButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    
    // Toggle button classes
    if (isWorkTime) {
        modeToggleButton.classList.remove('break-mode-btn');
        modeToggleButton.classList.add('work-mode-btn');
    } else {
        modeToggleButton.classList.remove('work-mode-btn');
        modeToggleButton.classList.add('break-mode-btn');
    }
    
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                alert(isWorkTime ? 'Break is over! Time to work!' : 'Work session complete! Take a break!');
                startTimer();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = workTime;
    modeText.textContent = 'Time to focus!';
    modeToggleButton.textContent = 'Switch to Break';
    updateDisplay();
}

// Initialize
timeLeft = workTime;
modeToggleButton.textContent = 'Switch to Break';
updateDisplay();

// Initialize button style
modeToggleButton.classList.add('work-mode-btn');

// Remove work/rest mode buttons if they exist
if (workModeButton) workModeButton.remove();
if (restModeButton) restModeButton.remove();

// Event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    switchMode();
}); 