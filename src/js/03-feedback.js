import throttle from 'lodash.throttle';

//constants
const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const textArea = document.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

const formData = {};

//eventlisteners
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

//saving formData
function saveFormData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

//onform input
function onFormInput(event) {
  formData[event.target.name] = event.target.value;

  saveFormData();
}

//submit function
function onFormSubmit(event) {
  event.preventDefault();

  if (formData.email && formData.message) {
    console.log(formData);
    form.reset();
    localStorage.removeItem(STORAGE_KEY);
  } else {
    alert('Заповніть всі поля!');
  }
}

//loading formData
function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const parsedData = JSON.parse(savedData);
    Object.assign(formData, parsedData);

    emailInput.value = parsedData.email || '';
    textArea.value = parsedData.message || '';
  }
}

loadFormData();
