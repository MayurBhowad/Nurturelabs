const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advisorSchema = Schema({
    advisor_name: {
        type: String,
        required: true
    },
    advisor_photo: {
        type: String,
        required: true
    }
})

module.exports = Advisor = mongoose.model('advisors', advisorSchema)