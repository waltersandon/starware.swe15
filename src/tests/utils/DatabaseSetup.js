var mongoose = require('mongoose');
var Configuration = require('../../api/app/Configuration');
var Role = require('../../api/data/Role');
var Question = require('../../api/data/Question');
var Questionnaire = require('../../api/data/Questionnaire');
var Tag = require('../../api/data/Tag');
var User = require('../../api/data/User');

function databaseConnect() {
	var config = new Configuration();
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
	mongoose.connect(config.dbTestUri);
}

function objLoader(objs, onLoaded) {
	if (objs.length > 0) {
		var obj = objs.shift(); // pop front
		obj.save().then(function() {
			objLoader(objs, onLoaded);
		}, console.error);
	} else {
		return onLoaded();
	}
}

function resetDatabase(onReset) {
	Promise.all([
		Role.remove({}),
		User.remove({}),
		Tag.remove({}),
		Question.remove({}),
		Questionnaire.remove({})
	]).then(onReset, console.error);
}

function databaseSetup(objs, fn) {
	resetDatabase(function() {
		objLoader(objs, fn);
	});
}

module.exports = {
	databaseConnect: databaseConnect,
	databaseSetup: databaseSetup,
};