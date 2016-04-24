$(function () {
    angular.module('TagServiceModule', ['TagModule']).service('TagService', ['$http', 'Tag', function ($http, Tag) {
            this.delete = function (tag) {
                var ret;

                $http.delete('api/tags/' + tag.id).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
            this.get = function (keywords) {
                var ret = [];

                $http.get('api/tags', {
                    'keywords': keywords
                }).then(function success(res) {
                    res.forEach(function (item) {
                        ret.push(new Tag(item.description, item.id, item.name, item.parent));
                    });
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.getByID = function (id) {
                var ret;

                $http.get('api/tags/' + id).then(function success(res) {
                    ret = new Tag(res.description, res.id, res.name, res.parent);
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.modify = function (tag) {
                var ret;

                $http.put('api/tags/' + tag.id, {
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

                $http.post('api/tags', {
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