$(function () {
    angular.module('CurrentQuestionModule', []).factory('model.data.CurrentQuestion', ['util.QML', function (QML) {
            function CurrentQuestion(question) {
                var quest = QML.parse(question.body);
                this.type = quest.type;
                this.body = quest.body;
                this.answers = quest.answers;
                if (this.type === 'TF' || this.type === 'MC') {
                    this.answer = quest.answer;
                    this.selectedAnswer = null;
                } else if (this.type === "OI" || this.type === "CI") {
                    this.answer = quest.answer;
                    this.selectedAnswer = quest.answers;
                } else {
                    this.answer = quest.answer;
                    this.selectedAnswer = [];
                }
                this.id = question.id;
                this.stat = [];
                this.right = false;
                this.explanation = quest.explanation;
            }

            CurrentQuestion.prototype.point = function () {
                var self = this;
                if (this.type === 'TF' || this.type === 'MC') {
                    if (this.answer.toString() == this.selectedAnswer) {
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
                    this.selectedAnswer.forEach(function (ans) {
                        var found = false;
                        self.answer.forEach(function (rightAnswer) {
                            if (ans == rightAnswer) {
                                found = true;
                            }
                        });
                        if (found) {
                            tot += rightPoint;
                        } else {
                            tot -= wrongPoint;
                        }
                    });
                    if (tot < 0) {
                        tot = 0;
                    } else if (tot === 1) {
                        this.right = true;
                    }
                    return {point: tot, tot: 1};
                } else if (this.type === 'CT') {
                    var tot = 0;
                    var point = 0;
                    this.selectedAnswer.forEach(function (ans, i) {
                        tot++;
                        if (ans == self.answer[i]) {
                            point++;
                        }
                    });
                    if (point == tot) {
                        this.right = true;
                    }
                    return {point: point / tot, tot: 1};
                } else if (this.type === 'OI') {
                    var right = true;

                    this.answer.forEach(function (el, i) {
                        if (el !== self.selectedAnswer[i]) {
                            right = false;
                        }
                    });

                    if (right) {
                        this.right = true;
                        return {point: 1, tot: 1};
                    } else {
                        this.right = false;
                        return {point: 0, tot: 1};
                    }
                } else if (this.type === 'CI') {
                    var right = true;

                    this.selectedAnswer.left.forEach(function (el, i) {
                        self.answer.left.forEach(function(ans, j){
                            if(el === ans && self.selectedAnswer.right[i] != self.answer.right[j]){
                                right = false;
                            }
                        });
                    });

                    if (right) {
                        this.right = true;
                        return {point: 1, tot: 1};
                    } else {
                        this.right = false;
                        return {point: 0, tot: 1};
                    }
                }

                return null;
            };

            CurrentQuestion.prototype.answered = function () {
                if (this.type === 'TF' || this.type === 'MC') {
                    return this.selectedAnswer !== null;
                } else if (this.type === 'MA') {
                    return this.selectedAnswer.length !== 0;
                } else if (this.type === 'CT') {
                    var all = true;
                    if (this.selectedAnswer.length < this.answers.length) {
                        all = false;
                    }
                    this.selectedAnswer.forEach(function (ans) {
                        if (ans === null) {
                            all = false;
                        }
                    });
                    return all;
                } else if (this.type === 'OI' || this.type === 'CI') {
                    return true;
                }
            };
            return CurrentQuestion;
        }]);
});


                