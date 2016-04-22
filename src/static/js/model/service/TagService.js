
angular.module('TagService', ['TagModule']).service('TagService', ['$http', 'Tag', function ($http, Tag) {
        this.delete = function (tag) {
            $http.delete('/tags/' + tag.id).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
        this.get = function (keywords) {
            $http.get('/tags', {
                'keywords': keywords
            }).then(function success(res) {
                var a = [];
                res.forEach(function (item) {
                    a.push(new Tag(item.description, item.id, item.name, item.parent));
                });
                return a;
            }, function error(res) {
                return res;
            });
        };
        this.getByID = function (id) {
            $http.get('/tags/' + id).then(function success(res) {
                return new Tag(res.description, res.id, res.name, res.parent);
            }, function error(res) {
                return res;
            });
        };
        this.modify = function (tag) {
            $http.put('/tags/' + tag.id, {
                'description': tag.description,
                'id': tag.id,
                'name': tag.name,
                'parent': parent
            }).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
        this.new = function (tag) {
            $http.post('/tags', {
                'description': tag.description,
                'name': tag.name,
                'parent': tag.parent
            }).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
    }]);

        