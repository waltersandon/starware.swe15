/*!
 * @class   ManageTags
 * @details Classe che si occupa della gestione degli argomenti lato docente
 * @par Usage 
 * Viene richiamata quando un docente vuole creare un nuovo argomento o
 * modificarne o eliminarne uno già esistente
 */
$(function () {
    angular.module('app.App').controller('controller.teacher.ManageTags', ['$scope', 'model.data.Tag', 'model.service.TagService', 'util.Util', function ($scope, Tag, TagService, Util) {
        $scope.tagSearch = '';
      
    /*!
     * @details dopo aver controllato la validità dei dati inseriti, richiama
     *          il servizio per aggiungere un nuovo argomento
     */
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
      
    /*!
     * @details richiama il servizio che modifica l'argomento passato come
     *          parametro
     * @param[in]  tag contiene l'argomento che serve modificare 
     */
        $scope.modify = function (tag) {
            if (tag.btnClass !== 'btn-default') {
                TagService.modify(tag, function () {
                    tag.btnClass = 'btn-default';
                }, function (res) {

                });
            }
        };
      
    /*!
     * @details richiama il servizio per rimuovere l'argomento passato come
     *          parametro
     * @param[in]  tag contiene l'argomento da eliminare 
     */
        $scope.remove = function (tag) {
            if (Util.confirm('Vuoi eliminare l\'argomento: ' + tag.name + '?')) {
                TagService.delete(tag, function () {
                    $scope.tags.splice($scope.tags.indexOf(tag), 1);
                }, function (res) {
                    Util.alert(res.data.message);
                });
            }
        };
      
    /*!
     * @details cerca i tag filtrandoli in base alle keywords inserite
     *          dall'utente
     */
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
      
    /*!
     * @details cerca i tag filtrandoli in base alle keywords inserite
     *          dall'utente
     */
        $scope.submit();

    }]);
});