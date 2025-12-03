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
}

// Set early so no page flashes
reflectPreference();

window.addEventListener('DOMContentLoaded', init);

// Sync with system changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches:isDark}) => {
  theme.value = (isDark) ? 'dark' : 'light';
  setPreference();
});