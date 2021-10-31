const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

/**
 * Show error label.
 *
 * @param {HTMLElement} input element to raised.
 * @param {string} message The message to shoe.
 * @return {void} 
 */
function showError(input,message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

/**
 * Show success label.
 *
 * @param {HTMLElement} input element to raised.
 * @return {void} 
 */
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

/**
 * Check required fields.
 *
 * @param {array} inputArray elements to raised.
 * @return {void} 
 */
function checkRequired(inputArray){
    inputArray.forEach(input => {
        if (input.value.trim() == '') {
            showError(input,`${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

/**
 * Check length fields.
 *
 * @param {HTMLElement} inputArray elements to raised.
 * @param {number} min length.
 * @param {number} max length.
 * @return {void} 
 */
function checkLength(input,min,max) {
    if (input.value.length <  min) {
        showError(input,`${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input,`${getFieldName(input)} must be less than ${max} characters`);
    }
     else {
        showSuccess(input);
    }
}

/**
 * Check Email format.
 *
 * @param {HTMLElement} input elements to raised.
 * @return {void} 
 */
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

/**
 * Check fields Match.
 *
 * @param {HTMLElement} input1 element to raised.
 * @param {HTMLElement} input2 element to raised.
 * @return {void} 
 */
function checkFieldsMatch(input1, input2){
    if (input1.value !== input2.value) {
        showError(input2, 'Fields do not match');
    } 
}

/**
 * Get field name with firts letter to UpperCase.
 *
 * @param {HTMLElement} input element to raised.
 * @return {string} 
 */
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// event listener
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    checkRequired([username, email, password, password2]);
    
    checkLength(username,3,12);
    checkLength(password,3,25);

    checkEmail(email);
    checkFieldsMatch(password,password2);
})