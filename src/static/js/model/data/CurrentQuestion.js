$(function () {
    angular.module('CurrentQuestionModule', []).factory('model.data.CurrentQuestion', ['util.QML', function (QML) {
            function CurrentQuestion(question) {
                var quest = QML.parse(question.body);
                this.type = quest.type;
                this.body = quest.body;
                this.answers = quest.answers;
                this.answer = quest.answer.toString();
                this.selectedAnswer = null;
                this.right = false;
                this.explanation = quest.explanation;
            }
            CurrentQuestion.prototype.point = function () {
                if (this.type === 'TF' || this.type === 'MC') {
                    if (this.answer === this.selectedAnswer) {
                        this.right = true;
                        return {point: 1, tot: 1};
                    } else {
                        this.right = false;
                        return {point: 0, tot: 1};
                    }
                }
                return null;
            };
            return CurrentQuestion;
        }]);
});