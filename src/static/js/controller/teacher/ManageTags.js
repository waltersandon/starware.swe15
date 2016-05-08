$(function () {
    angular.module('app.App').controller('controller.teacher.ManageTags', ['util.Check', '$scope', 'model.service.TagService', 'model.data.Tag', 'util.Util', function (Check, $scope, TagService, Tag, Util) {

            $scope.newName = "";
            $scope.newDescription = "";
            $scope.tagSearch = "";

            $scope.submit = function () {
                this.keywords = $scope.tagSearch.split(" ");
                TagService.get(this.keywords, function (tags) {
                    angular.forEach(tags, function (value, key) {
                        value.btnClass = "btn-default";
                    });
                    $scope.tagList = tags;
                }, function (res) {

                });
            };

            $scope.newTag = function () {
                if ($scope.newName !== "") {
                    TagService.new(new Tag($scope.newDescription, '', $scope.newName), function () {
                        $scope.newName = "";
                        $scope.newDescription = "";
                        $scope.tagSearch = "";
                        $scope.submit();
                    }, function (res) {

                    });
                } else {
                    Util.alert("Aggiungere il nome");
                }
            };

            $scope.modifyTag = function (tagIndex) {
                if ($scope.tagList[tagIndex].btnClass !== "btn-default") {
                    TagService.modify($scope.tagList[tagIndex], function () {
                        $scope.tagList[tagIndex].btnClass = "btn-default";
                    }, function (res) {

                    });
                }
            };

            $scope.deleteTag = function (tagIndex) {
                if (Check.confirm('Vuoi eliminare l\'argomento: ' + $scope.tagList[tagIndex].name + '?')) {
                    TagService.delete($scope.tagList[tagIndex], function () {
                        $scope.tagList.splice(tagIndex, 1);
                    }, function (res) {
                        console.log(res);
                        Util.alert(res.data.message);
                    });
                }
            };

            $scope.textChanged = function (tagIndex) {
                $scope.tagList[tagIndex].btnClass = "btn-raised btn-primary";
            };

        }]);
});