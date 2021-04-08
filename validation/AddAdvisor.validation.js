const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = validateNewAdvisor = data => {
    let errors = {};

    data.advisorName = !isEmpty(data.advisorName) ? data.advisorName : '';
    data.photoUrl = !isEmpty(data.photoUrl) ? data.photoUrl : '';

    if (Validator.isEmpty(data.advisorName)) {
        errors.advisorName = 'Advisor name is required!'
    }

    if (Validator.isEmpty(data.photoUrl)) {
        errors.photoUrl = 'Photo is required!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}