$(function () {
    angular.module('CurrentQuestionModule', []).factory('model.data.CurrentQuestion', ['util.QML', function (QML) {
        function CurrentQuestion(question) {
            var quest = QML.parse(question.body);
            this.type = quest.type;
            this.body = quest.body;
            this.answers = quest.answers;
            if (this.type === 'TF' || this.type === 'MC') {
                this.answer = quest.answer.toString();
                this.selectedAnswer = null;
            }
            else {
                this.answer = quest.answer;
                this.selectedAnswer = [];
            }

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
            } else if (this.type === 'MA') {
                var rightPoint = 1 / this.answer.length;
                var wrongPoint = 1 / (this.answers.length - this.answer.length);
                var tot = 0;
                var self = this;
                this.selectedAnswer.forEach(function (ans) {
                    var found = false;
                    self.answer.forEach(function (rightAnswer) {
                        if (ans == rightAnswer) {
                            found = true;
                        }
                    });
                    if (found) {
                        tot += rightPoint;
                    }
                    else {
                        tot -= wrongPoint;
                    }
                });
                if (tot < 0) {
                    tot = 0;
                }
                else if(tot === 1){
                    this.right = true;
                }
                return {point: tot, tot: 1};
            }
            return null;
        };
        return CurrentQuestion;
    }]);
});