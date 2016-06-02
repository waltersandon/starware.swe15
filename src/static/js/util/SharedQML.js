
if (typeof angular === 'undefined') {
    var markdown = require('./markdown/lib/index').markdown;
}

function myToHTML(str){
    str = str.replace("\n","òòòòò");
    var t = markdown.toHTML(str);
    t = t.substr(3, t.length - 7);
    t = t.replace("òòòòò","<br>");
    return t;
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
                        <input type=\'checkbox\' name=\'MAQuestion\' ng-model=\'ris\' value=\'' + n + '\'\> ' + statementHTML.substr(3, statementHTML.length - 7)  + '\
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
                        <input type=\'checkbox\' name=\'MAQuestion\' ng-model=\'ris\' value=\'' + n + '\'\> ' + statementHTML.substr(3, statementHTML.length - 7)  + '\
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

    if (n === 0) {
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
        var body = markdown.toHTML(regularLines.join('\n'));
        return {
            status: true,
            type: 'MA',
            body: body,
            preview: body + answerForm,
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
                        <input type=\'radio\' name=\'MCQuestion\' ng-model=\'ris\' value=\'' + n + '\'> ' + statementHTML.substr(3, statementHTML.length - 7)  + '\
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
                        <input type=\'radio\' name=\'MCQuestion\' ng-model=\'ris\' value=\'' + n + '\'> ' + statementHTML.substr(3, statementHTML.length - 7) + '\
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

    if (n === 0) {
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
        var body = markdown.toHTML(regularLines.join('\n'));
        return {
            status: true,
            type: 'MC',
            body: body,
            preview: body + answerForm,
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
            return { answer: line.match(this.true)};
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
    } else if (tfs.length === 0) {
        return null;
    } else {
        var body = markdown.toHTML(body);
        return {
            status: true,
            type: 'TF',
            body: body,
            preview: body + '<div class=\'form-group\'>\
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


function CompleteTextParser(unescaped) {
    this.complete = /\[.+?\,.*?\]/g;
    this.rightChoice = /^\s*\*/g;
}


CompleteTextParser.prototype.parse = function(qml) {
    var match, i, found;
    var body = [];
    var answers, answer = [], choice = [];
    var choices;
    var preview = "";
    while ((match = this.complete.exec(qml)) !== null){
        body.push(qml.substr(0,match.index));
        preview += "<span>" + myToHTML(qml.substr(0,match.index)) + "</span>";
        choices = match[0].substr(1, match[0].length - 2).split(",");
        i = 0;
        found = false;
        answers = [];
        preview += " <select style='display:inline-block; min-width: 3em;' ><option value='null'></option>";
        while (i < choices.length){
            this.rightChoice.lastIndex=0;
            if(this.rightChoice.test(choices[i])){
                if(found){
                    return {status: false, message: "Ogni scelta può avere solo una risposta esatta"}
                }
                found = true;
                answer.push(i);
                answers.push({value:i, str: choices[i].substr(this.rightChoice.lastIndex)});
                preview += "<option value ='" + i + "'>" + choices[i].substr(this.rightChoice.lastIndex) + "</option>";
            }
            else{
                answers.push({value:i, str: choices[i]});
                preview += "<option value ='" + i + "'>" + choices[i] + "</option>";
            }
            i++;
        }
        preview += "</select> ";
        if(!found){
            return {status: false, message: "Ogni scelta deve avere una risposta esatta"}
        }
        choice.push(answers);
        qml = qml.substr(this.complete.lastIndex);
        this.complete.lastIndex=0;
    }
    body.push(qml);
    preview += "<span>" + myToHTML(qml) + "</span>";
    if(choice.length === 0){
        return {status: false, message: "Non è stata inserita nessuna scelta"}
    }
    return {
        status: true,
        type: 'CT',
        body: body,
        preview: preview,
        answers: choice,
        answer: answer
    };
};


function QML() {
    this.explanation = /^\s?(?:""")\s*$/;
    this.parsers = [
        new MultiChoiceParser(),
        new MultiAnswerParser(),
        new TrueFalseParser(),
        new CompleteTextParser()
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

QML.prototype.preview = function (body) {
    var b = body.split('\n'), f = '';
    b.forEach(function (item) {
        if (!item.startsWith('<') && f.trim() === '') {
            f = item;
        }
    });
    return f;
};


if (typeof angular === 'undefined') {
    module.exports = QML;
}