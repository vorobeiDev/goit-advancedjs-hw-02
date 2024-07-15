import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


iziToast.settings({
  position: 'topRight',
  timeout: 3000,
});

const onFormSubmit = (event) => {
  event.preventDefault();
  const elements = event.target.elements;

  const delayInput = elements.delay;
  const stateInput = elements.state;

  const promiseType = stateInput.value;
  const delay = Number(delayInput.value);
  let promise;

  if (promiseType === 'fulfilled') {
    promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  } else {
    promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject();
      }, delay);
    });
  }

  promise
    .then(() => {
      iziToast.success({
        icon: '',
        iconText: '',
        title: '✅ OK',
        message: `Fulfilled promise in ${delay}ms`
      });
    })
    .catch(() => {
      iziToast.error({
        icon: '',
        iconText: '',
        title: '❌ Error',
        message: `Rejected promise in ${delay}ms`
      });
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    onFormSubmit(event);
  });
})
