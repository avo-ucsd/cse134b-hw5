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
  // (1) Name
  const nameInput = document.getElementById('contact-name');
  nameInput.addEventListener('change', (event) => {
    if (!nameInput.checkValidity()) {
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
    } else {
      nameInput.setCustomValidity('');
    }
  });
}

// function init() {
//   // Set up theme
//   reflectPreference();

//   const themeToggleButton = document.querySelector('#theme-toggle');
//   if (themeToggleButton) {
//     themeToggleButton.addEventListener('click', changeTheme);
//   }

//   // Form validation
//   const form = document.querySelector('form');
//   const form_errors = [];

//   // Name field validation
//   const nameInput = document.getElementById('contact-name');
//   const nameErrorLog = document.getElementById('contact-error-name');
  
//   nameInput.addEventListener('input', (event) => {
//     const value = nameInput.value;
//     const lastChar = value[value.length - 1];
    
//     // Check for disallowed characters
//     if (lastChar && !/[A-Za-z\s\-']/.test(lastChar)) {
//       nameErrorLog.innerText = `${lastChar} is not a valid character.`;
      
//       // setTimeout(() => {
//       //   nameErrorLog.innerText = '';
//       // }, 2000);
//     }
    
//     // Standard validation feedback
//     if (nameInput.validity.valueMissing) {
//       nameInput.setCustomValidity('Please enter your name.');
//     } else if (nameInput.validity.tooShort) {
//       nameInput.setCustomValidity('Name must be at least 2 characters long.');
//     } else if (nameInput.validity.patternMismatch) {
//       nameInput.setCustomValidity('Please use only letters, spaces, hyphens, and apostrophes.');
//     } else {
//       nameInput.setCustomValidity('');
//     }
//   });

//   // Email field validation
//   const emailInput = document.getElementById('contact-email');
//   const emailErrorLog = document.getElementById('contact-error-email');
  
//   emailInput.addEventListener('input', (event) => {
//     if (emailInput.validity.valueMissing) {
//       emailInput.setCustomValidity('Please enter your email address.');
//     } else if (emailInput.validity.typeMismatch) {
//       emailInput.setCustomValidity('Please enter a valid email address.');
//     } else if (emailInput.validity.tooShort) {
//       emailInput.setCustomValidity('Email must be at least 2 characters long.');
//     } else {
//       emailInput.setCustomValidity('');
//     }
//   });

//   // Subject field validation
//   const subjectInput = document.getElementById('contact-subject');
//   const subjectErrorLog = document.getElementById('contact-error-subject');
  
//   subjectInput.addEventListener('input', (event) => {
//     const value = subjectInput.value;
//     const lastChar = value[value.length - 1];
    
//     // Check for disallowed characters
//     if (lastChar && !/[A-Za-z\s\-'.!?]/.test(lastChar)) {
//       subjectInput.style.animation = 'shake 0.3s';
//       subjectErrorLog.innerText = '❌ Illegal character typed! Only letters, spaces, hyphens, apostrophes, and punctuation allowed.';
//       subjectErrorLog.style.color = 'red';
      
//       setTimeout(() => {
//         subjectInput.style.animation = '';
//         subjectErrorLog.innerText = '';
//       }, 2000);
//     }
    
//     // Standard validation feedback
//     if (subjectInput.validity.valueMissing) {
//       subjectInput.setCustomValidity('Please enter a subject.');
//     } else if (subjectInput.validity.tooShort) {
//       subjectInput.setCustomValidity('Subject must be at least 2 characters long.');
//     } else if (subjectInput.validity.patternMismatch) {
//       subjectInput.setCustomValidity('Please use only letters, spaces, hyphens, apostrophes, and punctuation.');
//     } else {
//       subjectInput.setCustomValidity('');
//     }
//   });

//   // Message field validation with character counter
//   const messageInput = document.getElementById('contact-message');
//   const messageErrorLog = document.getElementById('contact-error-message');
//   const messageInfoOutput = messageInput.parentElement.querySelector('output[data-output="info"]');
//   const maxLength = parseInt(messageInput.getAttribute('maxlength'));
  
//   messageInput.addEventListener('input', (event) => {
//     const currentLength = messageInput.value.length;
//     const remaining = maxLength - currentLength;
    
//     // Update character counter
//     messageInfoOutput.innerText = `${currentLength}/${maxLength} characters`;
    
//     // Change style when near limit
//     if (remaining <= 100) {
//       messageInfoOutput.style.color = 'orange';
//       messageInfoOutput.style.fontWeight = 'bold';
//     } else if (remaining <= 50) {
//       messageInfoOutput.style.color = 'red';
//       messageInfoOutput.style.fontWeight = 'bold';
//     } else {
//       messageInfoOutput.style.color = '';
//       messageInfoOutput.style.fontWeight = '';
//     }
    
//     // Standard validation feedback
//     if (messageInput.validity.valueMissing) {
//       messageInput.setCustomValidity('Please enter a message.');
//     } else if (messageInput.validity.tooShort) {
//       messageInput.setCustomValidity('Message must be at least 10 characters long.');
//     } else {
//       messageInput.setCustomValidity('');
//     }
//   });

//   // Form submission handler
//   form.addEventListener('submit', (event) => {
//     // Check validity of all fields
//     const fields = [nameInput, emailInput, subjectInput, messageInput];
//     let hasErrors = false;
    
//     fields.forEach(field => {
//       if (!field.checkValidity()) {
//         hasErrors = true;
        
//         // Add to form_errors array
//         form_errors.push({
//           field: field.name,
//           fieldId: field.id,
//           value: field.value,
//           error: field.validationMessage,
//           timestamp: new Date().toISOString()
//         });
//       }
//     });
    
//     if (hasErrors) {
//       event.preventDefault();
      
//       // Create a hidden input to submit form_errors
//       let errorsInput = document.querySelector('input[name="form-errors"]');
//       if (!errorsInput) {
//         errorsInput = document.createElement('input');
//         errorsInput.type = 'hidden';
//         errorsInput.name = 'form-errors';
//         form.appendChild(errorsInput);
//       }
//       errorsInput.value = JSON.stringify(form_errors);
      
//       alert('Please fix the errors in the form before submitting.');
//     } else {
//       // If there were previous errors, include them in the submission
//       if (form_errors.length > 0) {
//         let errorsInput = document.querySelector('input[name="form-errors"]');
//         if (!errorsInput) {
//           errorsInput = document.createElement('input');
//           errorsInput.type = 'hidden';
//           errorsInput.name = 'form-errors';
//           form.appendChild(errorsInput);
//         }
//         errorsInput.value = JSON.stringify(form_errors);
//       }
//     }
//   });
// }

// Set early so no page flashes

reflectPreference();

window.addEventListener('DOMContentLoaded', init);

// Sync with system changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches:isDark}) => {
  theme.value = (isDark) ? 'dark' : 'light';
  setPreference();
});