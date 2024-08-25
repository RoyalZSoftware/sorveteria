const SNACKBAR_SUCCESS = 0;
const SNACKBAR_ERROR = 1;

const Snackbar = {
  isOpen: false,
  timeout: null,
  open: (message, duration = 2000, type = SNACKBAR_SUCCESS) => {
    isOpen = true;
    const snackbar = document.getElementById('snackbar');
    snackbar.innerText = message;
    snackbar.style.visibility = 'visible';

    if (type === SNACKBAR_SUCCESS) {
      snackbar.style.backgroundColor = '#388e3c';
    } else if (type === SNACKBAR_ERROR) {
      snackbar.style.backgroundColor = 'red';
    }
    else { }
    if (Snackbar.timeout != null) {
      clearTimeout(Snackbar.timeout);
    }

    Snackbar.timeout = setTimeout(() => Snackbar.dismiss(), duration);
  },
  dismiss: () => {
    isOpen = false;
    const snackbar = document.getElementById('snackbar');
    snackbar.style.visibility = 'hidden';
    if (Snackbar.timeout != null) {
      clearTimeout(Snackbar.timeout);
    }
  }
};

