$(function () {
    angular.module('QMLModule', []).service('util.QML', [function () {
            this.parse = function (plainText) {
                if (plainText.charAt(0) === '<') {
                    switch (plainText.substr(1, plainText.indexOf('>') - 1)) {
                        case 'TF T':
                            plainText = plainText.substr(plainText.indexOf('\n') + 1);
                            return {
                                status: true,
                                type: 'TF',
                                body: markdown.toHTML(plainText),
                                answerForm: '<div class=\'form-group\'>\
                                                <div>\
                                                    <label>\
                                                        <input type=\'radio\' name=\'TFQuestion\' ng-model=\'ris\' value=\'true\'> Vero\
                                                    </label>\
                                                </div>\
                                                <div>\
                                                    <label>\
                                                        <input type=\'radio\' name=\'TFQuestion\' ng-model=\'ris\' value=\'false\'> Falso\
                                                    </label>\
                                                </div>\
                                            </div>',
                                answers: [{value: true, str: 'Vero'}, {value: false, str: 'Falso'}],
                                answer: true
                            };
                        case 'TF F':
                            plainText = plainText.substr(plainText.indexOf('\n') + 1);
                            return {
                                status: true,
                                type: 'TF',
                                body: markdown.toHTML(plainText),
                                answerForm: '<div class=\'form-group\'>\
                                                <div>\
                                                    <label>\
                                                        <input type=\'radio\' name=\'TFQuestion\' ng-model=\'ris\' value=\'true\' onchange=\'foo(true)\'> Vero\
                                                    </label>\
                                                </div>\
                                                <div>\
                                                    <label>\
                                                        <input type=\'radio\' name=\'TFQuestion\' ng-model=\'ris\' value=\'false\' onchange=\'foo(false)\'> Falso\
                                                    </label>\
                                                </div>\
                                            </div>',
                                answers: [{value: true, str: 'Vero'}, {value: false, str: 'Falso'}],
                                answer: false
                            };
                        case 'MultipleChoice':
                            plainText = plainText.substr(plainText.indexOf('\n') + 1);
                            var rightAnswers = 0, wrongAnswers = 0, ansFlag = false, a = plainText.split('\n'), txt = '', ans = '', right, choice = [], n = 0;//conta le risposte possibili
                            for (var i = 0; i < a.length; i++) {

                                if (a[i] === '[answers]' && !ansFlag) {
                                    ansFlag = true;
                                    ans += '<div class=\'form-group\'>';
                                }

                                if (a[i].startsWith('[]') && ansFlag) {
                                    wrongAnswers++;
                                    var r = markdown.toHTML(a[i].substr(2));
                                    ans += '<div>\
                                                <label>\
                                                    <input type=\'radio\' name=\'MCQuestion\' ng-model=\'ris\' value=\'' + n + '\' onchange=\'foo(' + n + ')\'>' + r.substr(3, r.length - 3) + '\
                                                </label>\
                                            </div>';
                                    choice.push({value: n, str: r.substr(3, r.length - 3)});
                                    n++;
                                } else if (a[i].startsWith('[*]') && ansFlag) {
                                    rightAnswers++;
                                    var r = markdown.toHTML(a[i].substr(3));
                                    ans += '<div>\
                                                <label>\
                                                    <input type=\'radio\' name=\'MCQuestion\' ng-model=\'ris\' value=\'' + n + '\' onchange=\'foo(' + n + ')\'>' + r.substr(3, r.length - 3) + '\
                                                </label>\
                                            </div>';
                                    right = n;
                                    choice.push({value: n, str: r.substr(3, r.length - 3)});
                                    n++;
                                } else if (!ansFlag) {
                                    txt += markdown.toHTML(a[i]);
                                }
                            }

                            if (!ansFlag) {
                                return {
                                    status: false,
                                    message: '<strong>Errore! </strong> la domanda non contiente il flag <i>[answers]</i> '
                                };
                            }

                            if (rightAnswers !== 1) {
                                return {
                                    status: false,
                                    message: '<strong>Errore! </strong> la domanda non contiene la risposta giusta o ne contiene più di una'
                                };
                            }

                            if (wrongAnswers === 0) {
                                return {
                                    status: false,
                                    message: '<strong>Errore! </strong> la domanda non contiene almeno una risposta sbagliata'
                                };
                            }

                            return {
                                status: true,
                                type: 'MultipleChoice',
                                body: txt,
                                answerForm: ans + '</div>',
                                answers: choice,
                                answer: right
                            };
                        default:
                            return {
                                status: false,
                                message: '<strong>Errore! </strong> tipo domanda non corretto'
                            };
                    }
                } else {
                    return {
                        status: false,
                        message: '<strong>Errore! </strong> tipo domanda non specificato'
                    };
                }
            };
        }]);
});