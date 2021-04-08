const mongooose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = Schema({
    admin_name: {
        type: String,
        required: true
    },
    admin_email: {
        type: String,
        required: true
    },
    admin_password: {
        type: String,
        required: true
    }
})

module.exports = Admin = mongooose.model('admins', adminSchema)