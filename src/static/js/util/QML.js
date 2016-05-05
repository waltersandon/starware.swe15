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
                                answerForm: '<form>\
                                    <div class=\'form-group\'>\
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
                                    </div>\
                                    </form>',
                                answers:[{value:true, str:'Vero'},{value:false, str:'Falso'}],
                                answer: true
                            };
                        case 'TF F':
                            plainText = plainText.substr(plainText.indexOf('\n') + 1);
                            return {
                                status: true,
                                type: 'TF',
                                body: markdown.toHTML(plainText),
                                answerForm: '<form>\
                                    <div class=\'form-group\'>\
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
                                    </div>\
                                    </form>',
                                answers:[{value:true, str:'Vero'},{value:false, str:'Falso'}],
                                answer: false
                            };
                        case 'MultipleChoice':
                            plainText = plainText.substr(plainText.indexOf('\n') + 1);
                            var rightAnswers = 0, wrongAnswers = 0, ansFlag = false;
                            var a = plainText.split('\n');
                            var txt = '';
                            var ans = '';
                            var right;
                            var choice = [];
                            var n = 0;//conta le risposte possibili
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
                                    message: '<strong>Errore: la domanda non contiente <i></i> </strong>'
                                };
                            }

                            if (!(rightAnswers === 1 && wrongAnswers > 0)) {
                                return {
                                    status: false,
                                    message: '<strong>Errore: la domanda non contiene </strong>'
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
                                message: '<strong>Errore: tipo domanda non corretto</strong>'
                            };
                    }
                } else {
                    return {
                        status: false,
                        message: '<strong>Errore: tipo domanda non specificato</strong>'
                    };
                }
            };
        }]);
});