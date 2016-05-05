$(function () {
    angular.module('CurrentQuestionModule', ['CurrentTFQuestionModule']).factory('model.data.CurrentQuestion', ['util.QML', function (QML) {
        function CurrentQuestion(question) {

            var quest = QML.parse(question.body);

            this.type = quest.type;
            this.body = quest.body;
            this.answers = quest.answers;
            this.answer = quest.answer.toString();
            this.selectedAnswer = null;

            }

        CurrentQuestion.prototype.point = function(){
            if (this.type == "TF" || this.type == "MultipleChoice"){
                if(this.answer == this.selectedAnswer) {
                    return {point: 1, tot: 1};
                }
                else{
                    return {point:0, tot: 1};
                }
            }
            return null;
        };


        return CurrentQuestion;
    }]);
});