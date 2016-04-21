var _ = require('./Role');
var mongoose = require('mongoose');

// User schema
var UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    userName: {
        type: String,
        unique: true,
        required: true
    }
});

// User model
var User = mongoose.model('User', UserSchema);

// Pre save hook to hash the password
// before saving it
var SALT_LENGTH = 10;
UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) 
        return next();

    var bcrypt = require('bcryptjs');
    var hash = bcrypt.hashSync(this.password, SALT_LENGTH);
    this.password = hash;
    next();
});

// JSON formatting
UserSchema.options.toJSON = {
    transform : function(doc, ret, options) {
        return {
            id: ret._id,
            fullName: ret.fullName,
            userName: ret.userName,
            role: { href: "/api/roles/"+ret.role+"/" }
        };
    }
};

module.exports = User;