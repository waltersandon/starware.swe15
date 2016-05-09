$(function () {
    angular.module('app.App').controller('controller.teacher.ManageTags', ['$scope', 'model.data.Tag', 'model.service.TagService', 'util.Util', function ($scope, Tag, TagService, Util) {
            $scope.tagSearch = '';
            $scope.add = function () {
                if ($scope.newName !== '') {
                    TagService.new(new Tag($scope.newDescription, '', $scope.newName), function () {
                        $scope.newName = $scope.newDescription = $scope.tagSearch = '';
                        $scope.submit();
                    }, function (res) {

                    });
                } else {
                    Util.alert('Aggiungere il nome');
                }
            };
            $scope.modify = function (tag) {
                if (tag.btnClass !== 'btn-default') {
                    TagService.modify(tag, function () {
                        tag.btnClass = 'btn-default';
                    }, function (res) {

                    });
                }
            };
            $scope.remove = function (tag) {
                if (Util.confirm('Vuoi eliminare l\'argomento: ' + tag.name + '?')) {
                    TagService.delete(tag, function () {
                        $scope.tags.splice($scope.tags.indexOf(tag), 1);
                    }, function (res) {
                        Util.alert(res.data.message);
                    });
                }
            };
            $scope.submit = function () {
                var keywords = $scope.tagSearch.split(' ');
                TagService.get(keywords, function (tags) {
                    tags.forEach(function (item) {
                        item.btnClass = 'btn-default';
                    });
                    $scope.tags = tags;
                }, function (res) {

                });
            };
        }]);
});