const storageKeyTheme = 'theme-preference';

const getColorPreference = () => {
  if (localStorage.getItem(storageKeyTheme)) {
    return localStorage.getItem(storageKeyTheme);
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

const setPreference = () => {
  localStorage.setItem(storageKeyTheme, theme.value);
  reflectPreference();
}

const reflectPreference = () => {
  document.documentElement.setAttribute('data-theme', theme.value);
};

const theme = {
  value: getColorPreference()
}

// Set early so no page flashes
reflectPreference();

window.onload = () => {
  reflectPreference();

  const themeToggleButton = document.querySelector('#theme-toggle');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      theme.value = (theme.value === 'light') ? 'dark' : 'light';
      setPreference();
    });
  }
}

// Sync with system changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches:isDark}) => {
  theme.value = (isDark) ? 'dark' : 'light';
  setPreference();
});