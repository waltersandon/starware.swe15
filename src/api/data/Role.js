/**
 * Created by andre on 21/04/2016.
 */
var mongoose = require('mongoose');

var Role = mongoose.model('Role', new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['owner', 'user'],
        default: 'user'
    }
}));

module.exports = Role;