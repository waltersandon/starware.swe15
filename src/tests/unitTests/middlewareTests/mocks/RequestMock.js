function RequestMock() {
	this.session = {};
	this.params = {};
	this.query = {};
	this.body = null;
}

RequestMock.prototype.setUser = function(user) {
	this.session.user = user;
};

RequestMock.prototype.setParam = function(name, value) {
	this.params[name] = value;
};

RequestMock.prototype.setQueryParam = function(name, value) {
	this.query[name] = value;
};
RequestMock.prototype.setBody = function(body) {
	this.body = body;
};

module.exports = RequestMock;