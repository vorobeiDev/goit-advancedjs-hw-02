import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;

iziToast.settings({
  position: 'topRight',
  timeout: 3000,
});

const disableNode = (node) => {
  node.setAttribute('disabled', true);
}

const enableNode = (node) => {
  node.removeAttribute('disabled');
}

const onCloseDatepickerHandler = (selectedDates, button) => {
  if (selectedDates[0] < new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    disableNode(button);
  } else {
    userSelectedDate = selectedDates[0];
    enableNode(button);
  }
};

const addLeadingZero = (value) => {
  return String(value).padStart(2, '0');
};

const convertMs = (ms) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

const updateTimer = (timerNode, { days, hours, minutes, seconds }) => {
  timerNode.days.textContent = days;
  timerNode.hours.textContent = hours;
  timerNode.minutes.textContent = minutes;
  timerNode.seconds.textContent = seconds;
}

const startTimer = (timerNode) => {
  const timerId = setInterval(() => {
    const deltaTime = userSelectedDate - new Date();
    const time = convertMs(deltaTime);
    updateTimer(timerNode, time);
    if (deltaTime < 1000) {
      clearInterval(timerId);
      enableNode(input);
    }
  }, 1000);
};



document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('button[data-start]');
  const input = document.querySelector('#datetime-picker');
  const timer = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  };

  disableNode(button);
  flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      onCloseDatepickerHandler(selectedDates, button);
    },
  });

  button.addEventListener(('click'), () => {
    startTimer(timer);
    disableNode(button);
    disableNode(input);
  });
});