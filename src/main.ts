let timerDisplay = document.getElementById("timer") as HTMLElement;
let toggleButton = document.querySelector(".toggle") as HTMLButtonElement;
let resetButton = document.querySelector(".reset") as HTMLButtonElement;

let duration = 25 * 60;
let timeLeft = duration;
let interval: number | null = null;

const updateDisplay = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const startTimer = () => {
  if (interval !== null) return;
  interval = window.setInterval(() => {
    if (timeLeft <= 0) {
      timeLeft = 0;
      updateDisplay();
      clearInterval(interval!);
      interval = null;
      alert("Time's up");
    }
    timeLeft--;
    updateDisplay();
  }, 1000);
};

const pauseTimer = () => {
  if (interval !== null) {
    clearInterval(interval!);
    interval = null;
  }
}

const resetTimer = () => {
  if (interval !== null) {
    clearInterval(interval!);
    interval = null;
  }
  timeLeft = duration;
  updateDisplay();
}

toggleButton.addEventListener('click', () => {
  toggleButton.classList.add("start");
});

resetButton.addEventListener('click', () => {
  resetTimer();
  resetButton.classList.remove('visible');
  toggleButton.textContent = "Start";
});

updateDisplay();
