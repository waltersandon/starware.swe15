$(function () {
    angular.module('TagServiceModule', ['ConfigurationModule', 'TagModule']).service('model.service.TagService', ['app.Configuration', '$http', 'model.data.Tag', function (Configuration, $http, Tag) {
            this.delete = function (tag, next, err) {
                $http.delete(Configuration.remote + 'api/tags/' + tag._id).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.get = function (keywords, next, err) {
                $http.get(Configuration.remote + 'api/tags?' +
                        'keywords=' + function () {
                            var a = '';
                            if (keywords instanceof Array)
                                keywords.forEach(function (item) {
                                    a += item + '|';
                                });
                            if (a.length >= 1)
                                a = a.substr(0, a.length - 1);
                            return a;
                        }()
                        ).then(function success(res) {
                    console.log(res);

                    var ret = [];
                    res.data.forEach(function (item) {
                        ret.push(new Tag(item.description, item._id, item.name, item.parent));
                    });

                    next(ret);
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.getByID = function (id, next, err) {
                $http.get(Configuration.remote + 'api/tags/' + id).then(function success(res) {
                    console.log(res);
                    next(new Tag(res.data.description, res.data._id, res.data.name));
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.modify = function (tag, next, err) {
                $http.put(Configuration.remote + 'api/tags/' + tag._id, {
                    _id: tag._id,
                    name: tag.name,
                    description: tag.description
                }).then(function success(res) {
                    console.log(res);
                    next(res.data);
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.new = function (tag, next, err) {
                $http.post(Configuration.remote + 'api/tags', {
                    description: tag.description,
                    name: tag.name
                }).then(function success(res) {
                    console.log(res);
                    next(res.data);
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
        }]);
});