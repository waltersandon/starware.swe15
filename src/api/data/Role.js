var mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

/* Metodo che viene chiamato quando è necessario restituire
 * una ur ruolo in formato JSON all'esterno
 */
TagSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        delete ret.__v;
        return ret;
    }
};

var Role = mongoose.model('Role', RoleSchema);
module.exports = Role;