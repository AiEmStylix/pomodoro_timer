let timerDisplay = document.getElementById("timer") as HTMLElement;
let startButton = document.getElementById("start") as HTMLButtonElement;
let pauseButton = document.getElementById("pause") as HTMLButtonElement;
let resetButton = document.getElementById("reset") as HTMLButtonElement;

let duration = 25 * 60;

let timeLeft = duration;

let interval: number | null = null;

const updateDisplay = () => {
  const minutes = Math.floor(timeLeft/ 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const startTimer = () => {
  if (interval !== null) return;
  //Change text content of button
  startButton.textContent = "Start";
  pauseButton.disabled = false;
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
  }, 1000)
};

const pauseTimer = () => {
  if (interval !== null) {
    clearInterval(interval!);
    interval = null;
  }

  //Change text context for start button
  startButton.textContent = "Continue";
  //Disable pause button
  pauseButton.disabled = true;
}

const resetTimer = () => {
  if (interval !== null) {
    clearInterval(interval!);
    interval = null;
  }
  timeLeft = duration;

  //Reset text content of button
  startButton.textContent = "Start";

  updateDisplay();
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

updateDisplay();
