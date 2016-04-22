var _ = require('./Role');
var mongoose = require('mongoose');

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
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    }
});

/* Hook che fa l'hash della password prima di salvare
 * l'utente nel database
 */
var SALT_LENGTH = 10;
UserSchema.pre('save', function(next) {
    if (this.isModified('password') || this.isNew) {
        var bcrypt = require('bcryptjs');
        var hash = bcrypt.hashSync(this.password, SALT_LENGTH);
        this.password = hash;
        next();
    }
});

/* Metodo del model `User` che controlla se la password dell'utente
 * corrisponde a quella specificata.
 */
UserSchema.methods.hasPassword = function(rawPassword) {
    var bcrypt = require('bcryptjs');
    return bcrypt.compareSync(rawPassword, this.password);
};

/* Metodo che viene chiamato quando è necessario restituire
 * un utente in formato JSON all'esterno
 */
UserSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        delete ret.password;
        return ret;
    }
};

var User = mongoose.model('User', UserSchema);

module.exports = User;