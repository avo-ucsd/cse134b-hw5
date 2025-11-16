const storageKeyTheme = 'theme-preference';
const theme = {
  value: getColorPreference()
}

// Theme functions
function getColorPreference() {
  if (localStorage.getItem(storageKeyTheme)) {
    return localStorage.getItem(storageKeyTheme);
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

function setPreference() {
  localStorage.setItem(storageKeyTheme, theme.value);
  reflectPreference();
}

function reflectPreference() {
  document.documentElement.setAttribute('data-theme', theme.value);
}

function changeTheme() {
  theme.value = (theme.value === 'light') ? 'dark' : 'light';
  setPreference();
}

// Page set-up
function init() {
  // Set up theme
  reflectPreference();

  const themeToggleButton = document.querySelector('#theme-toggle');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', changeTheme);
  }

  // Form validation
  const errorOutput = document.getElementById('contact-error');
  const infoOutput = document.getElementById('contact-info');

  // (1) Name
  const nameInput = document.getElementById('contact-name');
  nameInput.addEventListener('change', (event) => {
    const nameValidity = nameInput.validity;

    if (nameValidity.valueMissing) {
      nameInput.setCustomValidity('Please enter a name.');
    } else if (nameValidity.tooShort) {
      nameInput.setCustomValidity('Name must be at least 2 characters.');
    } else if (nameValidity.tooLong) {
      nameInput.setCustomValidity('Name must be at most 100 characters.');
    } else {
      nameInput.setCustomValidity('');
    }
  });
  nameInput.addEventListener('input', (event) => {
    const value = nameInput.value;
    const lastChar = value[value.length - 1];
    const namePattern = /[A-Za-z\s\-']/;

    if (lastChar && !namePattern.test(lastChar)) {
      errorOutput.innerText = `"${lastChar}" is not a valid character for a name.`;
      errorOutput.style.visibility = 'visible';

      setTimeout(() => {
        errorOutput.style.visibility = 'hidden';
      }, '5000');
    }
  });

  // (2) Email
  const emailInput = document.getElementById('contact-email');
  emailInput.addEventListener('input', (event) => {
    const emailValidity = emailInput.validity;
    const emailPattern = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)+$/i;;

    if (emailValidity.valueMissing) {
      emailInput.setCustomValidity('Please enter an email.');
    } else if (emailValidity.typeMismatch) {
      emailInput.setCustomValidity('Please enter in a valid email address.');
    } else if (emailValidity.tooShort) {
      emailInput.setCustomValidity('Email must be at least 2 characters.');
    } else if (emailValidity.tooLong) {
      emailInput.setCustomValidity('Email must be at most 255 characters.');
    } else if (!emailPattern.test(emailInput.value)) {
      emailInput.setCustomValidity('Email must include a domain e.g. \"example@email.com\".');
    } else {
      emailInput.setCustomValidity('');
    }
  });

  // (3) Subject
  const subjectInput = document.getElementById('contact-subject');
  subjectInput.addEventListener('change', (event) => {
    const subjectValidity = subjectInput.validity;

    if (subjectValidity.valueMissing) {
      subjectInput.setCustomValidity('Please enter a subject.');
    } else if (subjectValidity.tooShort) {
      subjectInput.setCustomValidity('Subject must be at least 2 characters.');
    } else if (subjectValidity.tooLong) {
      subjectInput.setCustomValidity('Subject must be at most 200 characters.');
    } else {
      subjectInput.setCustomValidity('');
    }
  });
  subjectInput.addEventListener('input', (event) => {
    const value = subjectInput.value;
    const lastChar = value[value.length - 1];
    const subjectPattern = /[0-9A-Za-z\s\-'.!?]/;

    if (lastChar && !subjectPattern.test(lastChar)) {
      errorOutput.innerText = `"${lastChar}" is not a valid character for a subject.`;
      errorOutput.style.visibility = 'visible';

      setTimeout(() => {
        errorOutput.style.visibility = 'hidden';
      }, '5000');
    }
  });

  // (4) Message
  const messageInput = document.getElementById('contact-message');
  const maxLength = parseInt(messageInput.getAttribute('maxlength'));
  messageInput.addEventListener('input', (event) => {
    const currentLength = messageInput.value.length;
    const remainingLength = maxLength - currentLength;

    infoOutput.innerText = `${currentLength} / ${maxLength}`;

    if (remainingLength <= 50) {
      infoOutput.style.color = 'red';
      infoOutput.style.fontWeight = 'bold';
    } else if (remainingLength <= 100) {
      infoOutput.style.color = 'orange';
      infoOutput.style.fontWeight = 'bold';
    } else {
      infoOutput.style.color = '';
      infoOutput.style.fontWeight = '';
    }
  });
}

// Set early so no page flashes
reflectPreference();

window.addEventListener('DOMContentLoaded', init);

// Sync with system changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches:isDark}) => {
  theme.value = (isDark) ? 'dark' : 'light';
  setPreference();
});