function ResponseMock() {
	this.status = 200;
	this.response = {};
}

ResponseMock.prototype.status = function(status) {
	this.status = status;
	return this;
};

ResponseMock.prototype.json = function(json) {
	this.response = json;
	return this;
};

ResponseMock.prototype.send = function() {
	return this;
};

module.exports = ResponseMock;