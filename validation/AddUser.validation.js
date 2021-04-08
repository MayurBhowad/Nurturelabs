const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = validateNewUser = data => {
    let errors = {};

    data.userName = !isEmpty(data.userName) ? data.userName : '';
    data.userEmail = !isEmpty(data.userEmail) ? data.userEmail : '';
    data.userPassword = !isEmpty(data.userPassword) ? data.userPassword : '';

    if (Validator.isEmpty(data.userName)) {
        errors.userName = 'user name is required!'
    }


    if (Validator.isEmpty(data.userEmail)) {
        errors.userEmail = 'email is required!'
    }

    if (!Validator.isEmail(data.userEmail)) {
        errors.userEmail = 'invalid email!'
    }

    if (Validator.isEmpty(data.userPassword)) {
        errors.userPassword = 'password is required!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}