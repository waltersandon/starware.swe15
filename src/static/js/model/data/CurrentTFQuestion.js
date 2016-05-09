$(function () {
    angular.module('CurrentTFQuestionModule', []).factory('model.data.CurrentTFQuestion', function () {
        function CurrentTFQuestion(question, ans) {
            this.answer = ans;
            this.body = question.body;
            this.responses = '<div class="form-group">\
                                <div><label><input type="radio" name="ris" ng-model="value""> Vero</label></div>\
                                <div><label><input type="radio" name="ris"> Falso</label></div>\
                            </div>';
        }
        return CurrentTFQuestion;
    });
});