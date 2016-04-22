var _ = require('./Tag');
var _ = require('./User');
var mongoose = require('mongoose');

var QuestionSchema = mongoose.model('Question', new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false 
    },
    body: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
    }]
}));


// User model
var Question = mongoose.model('Question', QuestionSchema);
/*
// JSON formatting
QuestionSchema.options.toJSON = {
    transform : function(doc, ret, options) {
        return {
            id: ret._id,
            body: ret.fullName,
            author: { href: "/api/roles/"+ret.role+"/" },
            tags: { href: "/api/roles/"+ret.role+"/" }
        };
    }
};
*/
module.exports = Question;
