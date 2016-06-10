/**
 * @file User.js
 * @date 23/04/2016
 * @version 2.0
 * @author Alessio Vitella
 *
 */
/*!
 * @class   User
 * @details Classe che rappresenta un utente dell'applicazione
 */

var _ = require('./Role');
var mongoose = require('mongoose');

var UserCheck = require('./../validator/UserCheck');
var check = new UserCheck();

var UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Nome completo mancante"],
        validate: {
            validator: check.checkFullName,
            message: 'Nome completo incorretto'
        }
    },
    userName: {
        type: String,
        required: [true, "Nome utente mancante"],
        unique: true,
        validate: {
            validator: check.checkUserName,
            message: 'Nome utente incorretto'
        }
    },
    password: {
        type: String,
        required: [true, "Password mancante"],
        validate: {
            validator: check.checkPassword,
            message: 'Password troppo corta'
        }
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    }
});

/* Hooks che fa l'hash della password prima di salvare
 * l'utente nel database
 */
function hashPassword(rawPassword) {
    var SALT_LENGTH = 10;
    var bcrypt = require('bcryptjs');
    return bcrypt.hashSync(rawPassword, SALT_LENGTH);
}

function hashPasswordIfModified(next) {
    if (this.isModified('password')) {
        this.password = hashPassword(this.password);
        next();
    }
}

UserSchema.pre('save', hashPasswordIfModified);

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
		delete ret.__v;
        delete ret.password;
        return ret;
    }
};

var User = mongoose.model('User', UserSchema);

module.exports = User;