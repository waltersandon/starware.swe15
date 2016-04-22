var mongoose = require('mongoose');

var Role = mongoose.model('Role', new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}));

module.exports = Role;