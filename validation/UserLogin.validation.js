const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = validateUserLogin = data => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (Validator.isEmpty(data.email)) {
        errors.email = 'email is required!'
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'invalid email!'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'password is required!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}