function RequestMock() {
	this.session = {};
	this.params = {};
	this.query = {};
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

module.exports = RequestMock;