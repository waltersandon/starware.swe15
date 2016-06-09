/*!
 * @class   Welcome
 * @details Classe che si occupa della visualizzazione della pagina di benvenuto
 */

$(function () {
    angular.module('app.App').controller('controller.user.Welcome', ['model.service.AnswerService', '$scope', '$rootScope', function (AnswerService, $scope, $rootScope) {
            function retriveStatistics() {
                AnswerService.get(null, null, [$rootScope.me.id], function (res) {

                    var scores = [];

                    res.forEach(function (item) {
                        scores.push(item.score);
                    });

                    var vars = new Set(scores);
                    vars = vars.add(0);
                    vars = vars.add(1);

                    vars = Array.from(vars).sort();
                    var counters = [];
                    vars.forEach(function () {
                        counters.push(0);
                    });

                    var tot = 0;
                    scores.forEach(function (s) {
                        var i = vars.indexOf(s);
                        counters[i]++;
                        tot++;
                    });

                    var data = [];
                    if (tot !== 0) {
                        for (var i = 0; i < vars.length; i++) {
                            data.push(counters[i] * 100 / tot);
                        }
                    }

                    $scope.stat = [];
                    for (var i = 0; i < vars.length; i++) {
                        $scope.stat.push({pt: vars[i],txt: 'Hai fatto <strong>' + vars[i] + '</strong> punti nel <strong>' + data[i] + ' %</strong> delle domande'});
                    }
                }, function (res) {

                });
            }
            
            if ($rootScope.me) {
                retriveStatistics();
            } else {
                $scope.me = {fullName: 'Visitatore'};
            }
        }]);
});