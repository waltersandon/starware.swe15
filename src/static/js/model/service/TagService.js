$(function () {
    angular.module('TagServiceModule', ['ConfigurationModule', 'TagModule']).service('model.service.TagService', ['app.Configuration', '$http', 'model.data.Tag', function (Configuration, $http, Tag) {
            this.delete = function (tag) {
                var ret;

                $http.delete(Configuration.remote + 'api/tags/' + tag.id).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
            this.get = function (keywords) {
                var ret = [];

                $http.get(Configuration.remote + 'api/tags', {
                    'keywords': keywords
                }).then(function success(res) {
                    res.forEach(function (item) {
                        ret.push(new Tag(item.description, item._id, item.name, item.parent));
                    });
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.getByID = function (id) {
                var ret;

                $http.get(Configuration.remote + 'api/tags/' + id).then(function success(res) {
                    ret = new Tag(res.description, res._id, res.name, res.parent);
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.modify = function (tag) {
                var ret;

                $http.put(Configuration.remote + 'api/tags/' + tag.id, {
                    'description': tag.description,
                    'id': tag.id,
                    'name': tag.name,
                    'parent': parent
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
            this.new = function (tag) {
                var ret;

                $http.post(Configuration.remote + 'api/tags', {
                    'description': tag.description,
                    'name': tag.name,
                    'parent': tag.parent
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
        }]);
});