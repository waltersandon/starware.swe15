if (typeof angular === 'undefined') {
    var markdown = require('./markdown/lib/index').markdown;
}

function MultiAnswerParser() {
    this.checked = /^\s?(?:\[\s*\*\s*\])([^\(](.+))$/;
    this.unchecked = /^\s?(?:\[\s*\]([^\(](.+)))$/;
}

MultiAnswerParser.prototype.parse = function(qml) {
    var n = 0;
    var right = null;
    var rightAnswers = 0;
    var wrongAnswers = 0;
    var answerForm = '<div class=\'form-group\'>';
    var choices = [];
    var regularLines = [];
    qml.split('\n').forEach((function(line) {
        var match = null;
        if (match = line.match(this.checked)) {
            var statement = match[1].trim();
            var statementHTML = markdown.toHTML(statement);
            answerForm += 
                '<div>\
                    <label>\
                        <input type=\'checkbox\' name=\'MAQuestion\' ng-model=\'ris\' value=\'' + 
                            n + '\'\>' + statementHTML + '\
                    </label>\
                </div>';
            choices.push({value: n, str: statement });
            right = n;
            n++;
            rightAnswers++;
        } else if (match = line.match(this.unchecked)) {
            var statement = match[1].trim();
            var statementHTML = markdown.toHTML(statement);
            answerForm += 
                '<div>\
                    <label>\
                        <input type=\'checkbox\' name=\'MAQuestion\' ng-model=\'ris\' value=\'' + 
                            n + '\'\>' + statementHTML + '\
                    </label>\
                </div>';
            choices.push({value: n, str: statement });
            n++;
            wrongAnswers++;
        } else {
            regularLines.push(line);
        }
    }).bind(this));
    answerForm += '</div>';

    if (n == 0) {
        return null;
    } else if (rightAnswers < 1) {
        return {
            status: false,
            message: '<strong>Errore! </strong> la domanda non contiene la risposta giusta'
        };
    } else if (wrongAnswers === 0) {
        return {
            status: false,
            message: '<strong>Errore! </strong> la domanda non contiene almeno una risposta sbagliata'
        };
    } else {
        return {
            status: true,
            type: 'MA',
            body: markdown.toHTML(regularLines.join('\n')),
            answerForm: answerForm,
            answers: choices,
            answer: right
        };
    }
};

function MultiChoiceParser() {
    this.checked = /^\s?(?:\(\s*\*\s*\))(.+)$/;
    this.unchecked = /^\s?(?:\(\s*\)(.+))$/;
}

MultiChoiceParser.prototype.parse = function(qml) {
    var n = 0;
    var right = null;
    var rightAnswers = 0;
    var wrongAnswers = 0;
    var answerForm = '<div class=\'form-group\'>';
    var choices = [];
    var regularLines = [];
    qml.split('\n').forEach((function(line) {
        var match = null;
        if (match = line.match(this.checked)) {
            var statement = match[1].trim();
            var statementHTML = markdown.toHTML(statement);
            answerForm += 
                '<div>\
                    <label>\
                        <input type=\'radio\' name=\'MCQuestion\' ng-model=\'ris\' value=\'' + 
                            n + '\' onchange=\'foo(' + n + ')\'>' + statementHTML + '\
                    </label>\
                </div>';
            choices.push({value: n, str: statement });
            right = n;
            n++;
            rightAnswers++;
        } else if (match = line.match(this.unchecked)) {
            var statement = match[1].trim();
            var statementHTML = markdown.toHTML(statement);
            answerForm += 
                '<div>\
                    <label>\
                        <input type=\'radio\' name=\'MCQuestion\' ng-model=\'ris\' value=\'' + 
                            n + '\' onchange=\'foo(' + n + ')\'>' + statementHTML + '\
                    </label>\
                </div>';
            choices.push({value: n, str: statement });
            n++;
            wrongAnswers++;
        } else {
            regularLines.push(line);
        }
    }).bind(this));
    answerForm += '</div>';

    if (n == 0) {
        return null;
    } else if (rightAnswers > 1) {
        return {
            status: false,
            message: '<strong>Errore! </strong> la domanda contiene più di una risposta giusta'
        };
    } else if (rightAnswers < 1) {
        return {
            status: false,
            message: '<strong>Errore! </strong> la domanda non contiene la risposta giusta'
        };
    } else if (wrongAnswers === 0) {
        return {
            status: false,
            message: '<strong>Errore! </strong> la domanda non contiene almeno una risposta sbagliata'
        };
    } else {
        return {
            status: true,
            type: 'MC',
            body: markdown.toHTML(regularLines.join('\n')),
            answerForm: answerForm,
            answers: choices,
            answer: right
        };
    }
};

function TrueFalseParser(unescaped) {
    this.true = /^\s?(?:\(\s*\+\s*\))$/;
    this.false = /^\s?(?:\(\s*\-\s*\))$/;
}

TrueFalseParser.prototype.parse = function(qml) {
    var parsedLines = qml.split('\n').map((function(line) {
        if (line.match(this.true) || line.match(this.false)) {
            return { answer: (line.match(this.true)) ? true : false };
        } else {
            return line;
        }
    }).bind(this));

    var body = parsedLines.filter(function(line) {
        return (typeof line === 'string');
    }).join('\n');
    var tfs = parsedLines.filter(function(line) {
        return !(typeof line === 'string');
    });

    if (tfs.length > 1) {
        return {
            status: false,
            message: '<strong>Errore! </strong> ci può essere al massimo una vero/falso per domanda'
        };
    } else if (tfs.length == 0) {
        return null;
    } else {
        return {
            status: true,
            type: 'TF',
            body: markdown.toHTML(body),
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
            answer: tfs[0].answer
        };
    }
};

function QML() {
    this.explanation = /^\s?(?:""")\s*$/;
    this.parsers = [
        new MultiChoiceParser(),
        new MultiAnswerParser(),
        new TrueFalseParser()
    ];
}

QML.prototype.parse = function(qml) {
    var extractResult = this.extractExplanation(qml);
    var result = null;
    this.parsers.forEach((function(parser) {
        var currentResult = parser.parse(extractResult.plainText);
        if (currentResult) {
            if (result) {
                result = {
                    status: false,
                    message: '<strong>Errore! </strong> sono stati rilevati più tipi di domanda differenti'
                };
            } else {
                result = currentResult;
            }
        }
    }).bind(this));

    if (!result) {
        return {
            status: false,
            message: '<strong>Errore! </strong> non è stata rilevata alcuna domanda'
        };
    } else {
        result.explanation = markdown.toHTML(extractResult.explanation);
        return result;
    }
};

QML.prototype.extractExplanation = function(plainText) {
    var expFlag = false;
    var explanationLines = [];
    var newTextLines = [];
    plainText.split('\n').forEach((function(line) {
        if (expFlag) {
            explanationLines.push(line);
        } else if (line.match(this.explanation)) {
            expFlag = true;
        } else {
            newTextLines.push(line);
        }
    }).bind(this));
    return {
        explanation: explanationLines.join('\n'),
        plainText: newTextLines.join('\n')
    };
};

/*
QML.prototype.completeText = function(plainText) {
    plainText = plainText.substr(plainText.indexOf('\n') + 1);
    exp = extractExplanation(plainText);
    plainText = exp.plainText;
    exp = exp.explanation;

    var rightAnswers = 0, wrongAnswers = 0, ansFlag = false, a = plainText.split('\n'), txt = [''], preview = '', right = [], choice = [], c = 0; //conta i completamenti
    for (var i = 0; i < a.length; i++) {

        if ((/^(\t|\s)*\((\t|\s)*\)/.test(a[i]) || /^(\t|\s)*\((\t|\s)*\*(\t|\s)*\)/.test(a[i])) && !ansFlag) {
            ansFlag = true;
            choice.push([]);
            txt.push('');
            preview += '<select class=\'form-control\' style=\'display: block;\' >';
            n = 0; //conta le risposte possibili
        }

        if (/^(\t|\s)*\((\t|\s)*\)/.test(a[i])) {
            wrongAnswers++;
            var r = markdown.toHTML(a[i].substring(a[i].indexOf(')') + 1));
            preview += '<option name=\'CTQuestion\' ng-model=\'ris\' value=\'' + n + '\'\>' + r.substr(3, r.length - 7) + '</option>';
            choice[c].push({value: n, str: r.substr(3, r.length - 7)});
            n++;
        } else if (/^(\t|\s)*\((\t|\s)*\*(\t|\s)*\)/.test(a[i])) {
            rightAnswers++;
            var r = markdown.toHTML(a[i].substring(a[i].indexOf(')') + 1));
            preview += '<option name=\'CTQuestion\' ng-model=\'ris\' value=\'' + n + '\'\>' + r.substr(3, r.length - 7) + '</option>';
            right.push(n);
            choice[c].push({value: n, str: r.substr(3, r.length - 7)});
            n++;
        } else if (ansFlag) {
            ansFlag = false;
            preview += '</select>';
            c++;
            txt[c] += markdown.toHTML(a[i]);
            preview += txt[c];
        } else {
            txt[c] += markdown.toHTML(a[i]);
            preview += txt[c];
        }
    }
    
    if (ansFlag) {
        preview += '</select>';
        txt.push('');
    }

    return {
        status: true,
        type: 'CT',
        body: txt,
        preview: preview,
        answers: choice,
        answer: right,
        explanation: exp
    };
};
*/

if (typeof angular === 'undefined') {
    module.exports = QML;
}