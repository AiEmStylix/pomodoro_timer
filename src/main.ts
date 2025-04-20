import { createIcons, Pause, Play, Square } from "lucide";

const renderIcons = () => {createIcons({
  icons: {
    Play,
    Pause,
    Square,
  }
})};

let timerDisplay = document.getElementById("timer") as HTMLElement;
let toggleButton = document.querySelector(".toggle") as HTMLButtonElement;
let resetButton = document.querySelector(".reset") as HTMLButtonElement;

let toggleButtonIcon = toggleButton.firstElementChild;

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
  if (interval === null) {
    startTimer();
    toggleButton.innerHTML =  '<i data-lucide="pause" style="fill: currentColor;"></i>';
    renderIcons();

    //Display the reset button after click
    resetButton.classList.add('show');
  } else {
    pauseTimer();
    toggleButton.innerHTML =  '<i data-lucide="play" style="fill: currentColor;"></i>';
    renderIcons();
  }
});

resetButton.addEventListener('click', () => {
  if (interval !== null) {
    resetTimer();
    toggleButton.innerHTML =  '<i data-lucide="play" style="fill: currentColor;"></i>';
    renderIcons();

    //Hide the button
    resetButton.classList.remove('show');
  }
})

updateDisplay();
renderIcons();
