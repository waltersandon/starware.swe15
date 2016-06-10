/**
 * @file Role.js
 * @date 21/04/2016
 * @version 2.0
 * @author Thomas Pigarelli
 *
 */

/*!
 * @class   Role
 * @details Classe che rappresenta un ruolo all'interno dell'applicazione
 */

var mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Nome ruolo mancante"]
    }
});

/* Metodo che viene chiamato quando è necessario restituire
 * una ur ruolo in formato JSON all'esterno
 */
RoleSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        delete ret.__v;
        return ret;
    }
};

/* Metodo che viene chiamato quando è necessario restituire
 * una ur ruolo in formato JSON all'esterno
 */
RoleSchema.methods.greaterThan = function(role) {
	var order = ['student', 'teacher', 'admin', 'superadmin'];
	var thisIndex = order.indexOf(this.name);
	var otherIndex = order.indexOf(role.name);
	return (thisIndex > otherIndex);
};

/* Metodo che viene chiamato quando è necessario restituire
 * una ur ruolo in formato JSON all'esterno
 */
RoleSchema.methods.equalTo = function(role) {
	return (this.name == role.name);
};

var Role = mongoose.model('Role', RoleSchema);
module.exports = Role;