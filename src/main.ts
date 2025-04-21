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

let duration = 5;
let timeLeft = duration;
let interval: number | null = null;

const updateDisplay = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const buttonPressed = () : void => {
  const audio = new Audio('src/assets/button-pressed.mp3');
  audio.play();
}

const startTimer = () => {
  if (interval !== null) return;
  interval = window.setInterval(() => {
    timeLeft--;
    if (timeLeft < 0) {
      timeLeft = 0;
      updateDisplay();
      pauseTimer();
      
      // Change toggle button icon to play when timer is over
      toggleButton.innerHTML = '<i data-lucide="play" style="fill: currentColor;"></i>';
      
      // Hide the reset button when timer is over
      resetButton.classList.remove('show');
      
      renderIcons();
      timeLeft = duration;
      alert("Time's up");
    }
    
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

/*
Click event for state buttons
*/
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
  buttonPressed();
});

resetButton.addEventListener('click', () => {
  if (interval !== null) {
    resetTimer();
    toggleButton.innerHTML =  '<i data-lucide="play" style="fill: currentColor;"></i>';
    renderIcons();

    //Hide the button
    resetButton.classList.remove('show');
    buttonPressed();
  }
})

updateDisplay();
renderIcons();
