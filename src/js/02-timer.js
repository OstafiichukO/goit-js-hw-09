import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
flatpickr('#datetime-picker', options);

let currentDate = new Date();
let selectedDate = new Date();
let timeLeft = 0;
let timerId = null;

startBtn.setAttribute('disabled', 'true');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const timer = () => {
  const endTime = convertMs(timeLeft);
  daysEl.textContent = addLeadingZero(endTime.days);
  hoursEl.textContent = addLeadingZero(endTime.hours);
  minutesEl.textContent = addLeadingZero(endTime.minutes);
  secondsEl.textContent = addLeadingZero(endTime.seconds);
};
const interval = () => {
  timerId = setInterval(() => {
    if (timeLeft >= 1000) {
      currentDate = new Date();
      timeLeft = selectedDate.getTime() - currentDate.getTime();
      timer();
      return timeLeft;
    } else {
      clearInterval(timerId);
      startBtn.removeEventListener('click', interval);
    }
  }, 1000);
};

startBtn.addEventListener('click', interval);
