function ResponseMock() {
	this.status = 200;
	this.response = {};
	this.next = null;
	this.onDone = function() {};
}

ResponseMock.prototype.status = function(status) {
	this.status = status;
	return this;
};

ResponseMock.prototype.json = function(json) {
	this.response = json;
	this.onDone();
	return this;
};

ResponseMock.prototype.send = function() {
	this.onDone();
	return this;
};

ResponseMock.prototype.next = function(code) {
	this.next = code;
	this.onDone();
};

module.exports = ResponseMock;