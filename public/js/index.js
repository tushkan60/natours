/*eslint-disable*/
import '@babel/polyfill';
import { login, logout } from './login';
import { updateMe } from './updateSettings';
import { displayMap } from './mapBox';

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const updateDataForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-settings');
const logOutBtn = document.querySelector('.nav__el--logout');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (updateDataForm) {
  updateDataForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const form = new FormData();

    form.append('email', document.getElementById('email').value);
    form.append('name', document.getElementById('name').value);

    form.append('photo', document.getElementById('photo').files[0]);

    updateMe(form, 'user data');
  });
}

if (updatePasswordForm) {
  updatePasswordForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateMe({ passwordCurrent, password, passwordConfirm }, 'password');

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', () => {
    logout();
  });
}
