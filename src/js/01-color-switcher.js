const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;
stopBtn.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    startBtn.setAttribute('disabled', true);
    stopBtn.disabled = false;
  }, 1000)
})
stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  stopBtn.setAttribute('disabled', true);
  startBtn.disabled = false;
})