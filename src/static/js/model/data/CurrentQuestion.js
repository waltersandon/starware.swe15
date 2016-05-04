$(function () {
    angular.module('CurrentQuestionModule', ['CurrentTFQuestionModule']).factory('model.data.CurrentQuestion', ['model.data.CurrentTFQuestion', function (CurrentTFQuestion) {
        function CurrentQuestion(question) {

            this.type = null;
            this.body = null;

            if(question.body.charAt(0) == "<"){

                this.type = question.body.substring(1, question.body.indexOf('>'));
                question.body = question.body.substring(question.body.indexOf('>') + 1);

                if (this.type == "TF T"){
                    var quest = new CurrentTFQuestion(question, true);
                } else if (this.type == "TF F") {
                    var quest = new CurrentTFQuestion(question, false);
                }
                if(quest.body){
                    this.answer = quest.answer;
                    this.body = quest.body;
                    this.responses = quest.responses;
                    this.options = null;
                }
            }
        }
        return CurrentQuestion;
    }]);
});