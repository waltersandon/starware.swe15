if (typeof angular === 'undefined') {
    var markdown = require('./markdown/lib/index').markdown;
}

function MultiAnswerParser() {
    this.unescaped = /(?:^|[^\\])(?:\\\\)*/.source; /* common */
    this.checked = this.unescaped + /(?:\[\s*\*\s*\])([^\(](.+))/.source;
    this.unchecked = this.unescaped + /(?:\[\s*\]([^\(](.+)))/.source;
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
        if (match = line.match(new RegExp(this.checked))) {
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
        } else if (match = line.match(new RegExp(this.unchecked))) {
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
            body: txt,
            body: markdown.toHTML(regularLines.join('\n')),
            answerForm: answerForm,
            answers: choices,
            answer: right
            // @todo: explanation: exp
        };
    }
};

function MultiChoiceParser() {
    this.unescaped = /(?:^|[^\\])(?:\\\\)*/.source; /* common */
    this.checked = this.unescaped + /(?:\(\s*\*\s*\))(.+)/.source;
    this.unchecked = this.unescaped + /(?:\(\s*\)(.+))/.source;
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
        if (match = line.match(new RegExp(this.checked))) {
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
        } else if (match = line.match(new RegExp(this.unchecked))) {
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
            // @todo: explanation: exp
        };
    }
};

function TrueFalseParser() {
    this.unescaped = /(?:^|[^\\])(?:\\\\)*/.source; /* common */
    this.true = this.unescaped + /(?:\(\s*\+\s*\))/.source;
    this.false = this.unescaped + /(?:\(\s*\-\s*\))/.source;
}

TrueFalseParser.prototype.parse = function(qml) {
    var parsedLines = qml.split('\n').map(function(line) {
        if (line.match(this.true) || this.match(this.false)) {
            return { answer: (line.match(this.true)) ? true : false };
        } else {
            return line;
        }
    });

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
            // @todo: explanation: exp
        };
    }
};

function QML() {
    this.parsers = [
        new MultiChoiceParser(),
        new MultiAnswerParser(),
        new TrueFalseParser()
    ];
}

QML.prototype.parse = function(qml) {
    console.log("Fuck");
    var result = null;
    this.parsers.forEach((function(parser) {
        var currentResult = parser.parse(qml);
        if (currentResult && result) {
            result = {
                status: false,
                message: '<strong>Errore! </strong> sono stati rilevati più tipi di domanda differenti'
            };
        } else {
            result = currentResult;
        }
    }).bind(this));

    if (!result) {
        result = {
            status: false,
            message: '<strong>Errore! </strong> non è stata rilevata alcuna domanda'
        };
    } else {
        return result;
    }
};

if (typeof angular === 'undefined') {
    module.exports = QML;
}