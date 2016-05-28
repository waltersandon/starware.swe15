
if (typeof angular === 'undefined') {
    var markdown = require('./markdown/lib/index').markdown;
}

var QML = function () {
    this.preview = function (plainText) {
        var b = plainText.split('\n'), f = '';
        b.forEach(function (item) {
            if (!item.startsWith('<') && f.trim() === '') {
                f = markdown.toHTML(item);
            }
        });
        return f.substr(3, f.length - 7);
    };

    function extractExplanation(plainText) {
        var expFlag = false, a = plainText.split('\n'), exp = '', newPlainText = '';
        for (var i = 0; i < a.length; i++) {
            if (a[i] === '[explanation]' && !expFlag) {
                expFlag = true;
            } else if (expFlag) {
                exp += markdown.toHTML(a[i]);
            } else {
                newPlainText += a[i] + '\n';
            }
        }
        return {
            explanation: exp,
            plainText: newPlainText
        };
    }

    function trueFalseT(plainText) {
        plainText = plainText.substr(plainText.indexOf('\n') + 1);
        exp = extractExplanation(plainText);
        plainText = exp.plainText;
        exp =  exp.explanation;
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
            answer: true,
            explanation: exp
        };
    }

    function trueFalseF(plainText) {
        plainText = plainText.substr(plainText.indexOf('\n') + 1);
        exp = extractExplanation(plainText);
        plainText = exp.plainText;
        exp =  exp.explanation;
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
            answer: false,
            explanation: exp
        };
    }

    function multipleChoice(plainText) {
        plainText = plainText.substr(plainText.indexOf('\n') + 1);
        exp = extractExplanation(plainText);
        plainText = exp.plainText;
        exp =  exp.explanation;
        var rightAnswers = 0, wrongAnswers = 0, ansFlag = false, a = plainText.split('\n'), txt = '', ans = '', right, choice = [], n = 0; //conta le risposte possibili
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
                choice.push({value: n, str: r.substr(3, r.length - 7)});
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
                choice.push({value: n, str: r.substr(3, r.length - 7)});
                n++;
            } else if (!ansFlag) {
                txt += markdown.toHTML(a[i]);
            }
        }

        if (!ansFlag) {
            return {
                status: false,
                message: '<strong>Errore! </strong> la domanda non contiente il flag <i>[answers]</i> oppure è posizionato in maniera errata'
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
            type: 'MC',
            body: txt,
            answerForm: ans + '</div>',
            answers: choice,
            answer: right,
            explanation: exp
        };
    }

    this.parse = function (plainText) {
        while (plainText.charAt(0) === ' ' || plainText.charAt(0) === '\n') {
            plainText = plainText.substr(1);
        }

        if (plainText.charAt(0) === '<') {
            switch (plainText.substr(1, plainText.indexOf('>') - 1)) {
                case 'TF T':
                    return trueFalseT(plainText);
                case 'TF F':
                    return trueFalseF(plainText);
                case 'MC':
                    return multipleChoice(plainText);
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
};

if (typeof angular === 'undefined') {
    module.exports = QML;
}