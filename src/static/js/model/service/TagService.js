$(function () {
    angular.module('TagServiceModule', ['ConfigurationModule', 'TagModule']).service('model.service.TagService', ['app.Configuration', '$http', 'model.data.Tag', function (Configuration, $http, Tag) {
            this.delete = function (tag, next, err) {
                $http.delete(Configuration.remote + 'api/tags/' + tag.id).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.get = function (keywords, next, err) {
                $http.get(Configuration.remote + 'api/tags', {
                    'keywords': keywords
                }).then(function success(res) {
                    console.log(res);

                    var ret = [];
                    res.data.forEach(function (item) {
                        ret.push(new Tag(item.description, item._id, item.name, item.parent));
                    });

                    next(ret);
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.getByID = function (id, next, err) {
                $http.get(Configuration.remote + 'api/tags/' + id).then(function success(res) {
                    console.log(res);
                    next(new Tag(res.data.description, res.data._id, res.data.name, res.data.parent));
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.modify = function (tag, next, err) {
                $http.put(Configuration.remote + 'api/tags/' + tag.id, {
                    'description': tag.description,
                    'id': tag.id,
                    'name': tag.name,
                    'parent': parent
                }).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.new = function (tag, next, err) {
                $http.post(Configuration.remote + 'api/tags', {
                    'description': tag.description,
                    'name': tag.name,
                    'parent': tag.parent
                }).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
        }]);
});