
if (typeof angular === 'undefined') {
    var markdown = require('./markdown/lib/index').markdown;
}

function myToHTML(str) {
    str = str.replace("\n", "òòòòò");
    var t = markdown.toHTML(str);
    t = t.substr(3, t.length - 7);
    t = t.replace("òòòòò", "<br>");
    return t;
}

function MultiAnswerParser() {
    this.checked = /^\s?(?:\[\s*\*\s*\])([^\(](.+))$/;
    this.unchecked = /^\s?(?:\[\s*\]([^\(](.+)))$/;
}

MultiAnswerParser.prototype.parse = function (qml) {
    var n = 0;
    var right = null;
    var rightAnswers = 0;
    var wrongAnswers = 0;
    var answerForm = '<div class=\'form-group\'>';
    var choices = [];
    var regularLines = [];
    qml.split('\n').forEach((function (line) {
        var match = null;
        if (match = line.match(this.checked)) {
            var statement = match[1].trim();
            var statementHTML = markdown.toHTML(statement);
            answerForm +=
                    '<div>\
                    <label>\
                        <input type=\'checkbox\' name=\'MAQuestion\' ng-model=\'ris\' value=\'' + n + '\'\> ' + statementHTML.substr(3, statementHTML.length - 7) + '\
                    </label>\
                </div>';
            choices.push({value: n, str: statement});
            right = n;
            n++;
            rightAnswers++;
        } else if (match = line.match(this.unchecked)) {
            var statement = match[1].trim();
            var statementHTML = markdown.toHTML(statement);
            answerForm +=
                    '<div>\
                    <label>\
                        <input type=\'checkbox\' name=\'MAQuestion\' ng-model=\'ris\' value=\'' + n + '\'\> ' + statementHTML.substr(3, statementHTML.length - 7) + '\
                    </label>\
                </div>';
            choices.push({value: n, str: statement});
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

MultiChoiceParser.prototype.parse = function (qml) {
    var n = 0;
    var right = null;
    var rightAnswers = 0;
    var wrongAnswers = 0;
    var answerForm = '<div class=\'form-group\'>';
    var choices = [];
    var regularLines = [];
    qml.split('\n').forEach((function (line) {
        var match = null;
        if (match = line.match(this.checked)) {
            var statement = match[1].trim();
            var statementHTML = markdown.toHTML(statement);
            answerForm +=
                    '<div>\
                    <label>\
                        <input type=\'radio\' name=\'MCQuestion\' ng-model=\'ris\' value=\'' + n + '\'> ' + statementHTML.substr(3, statementHTML.length - 7) + '\
                    </label>\
                </div>';
            choices.push({value: n, str: myToHTML(statement)});
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
            choices.push({value: n, str: myToHTML(statement)});
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

function TrueFalseParser() {
    this.true = /^\s?(?:\(\s*\+\s*\))$/;
    this.false = /^\s?(?:\(\s*\-\s*\))$/;
}

TrueFalseParser.prototype.parse = function (qml) {
    var parsedLines = qml.split('\n').map((function (line) {
        if (line.match(this.true) || line.match(this.false)) {
            return {answer: this.true.test(line)};
        } else {
            return line;
        }
    }).bind(this));

    var body = parsedLines.filter(function (line) {
        return (typeof line === 'string');
    }).join('\n');
    var tfs = parsedLines.filter(function (line) {
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


function CompleteTextParser() {
    this.complete = /\[.+?\,.+?\]/g;
    this.rightChoice = /^\s*\*/g;
}

CompleteTextParser.prototype.parse = function (qml) {
    var match, i, found;
    var body = [];
    var answers, answer = [], choice = [];
    var choices;
    var preview = "";
    while ((match = this.complete.exec(qml)) !== null) {
        body.push(qml.substr(0, match.index));
        preview += "<span>" + myToHTML(qml.substr(0, match.index)) + "</span>";
        choices = match[0].substr(1, match[0].length - 2).split(",");
        i = 0;
        found = false;
        answers = [];
        preview += " <select style='display:inline-block; min-width: 3em;' ><option value='null'></option>";
        while (i < choices.length) {
            this.rightChoice.lastIndex = 0;
            if (this.rightChoice.test(choices[i])) {
                if (found) {
                    return {
                        status: false,
                        message: "Ogni scelta può avere solo una risposta esatta"
                    };
                }
                found = true;
                answer.push(i);
                answers.push({value: i, str: choices[i].substr(this.rightChoice.lastIndex)});
                preview += "<option value ='" + i + "'>" + choices[i].substr(this.rightChoice.lastIndex) + "</option>";
            } else {
                answers.push({value: i, str: choices[i]});
                preview += "<option value ='" + i + "'>" + choices[i] + "</option>";
            }
            i++;
        }
        preview += "</select> ";
        if (!found) {
            return {
                status: false,
                message: "Ogni scelta deve avere una risposta esatta"
            };
        }
        choice.push(answers);
        qml = qml.substr(this.complete.lastIndex);
        this.complete.lastIndex = 0;
    }
    body.push(qml);
    preview += "<span>" + myToHTML(qml) + "</span>";
    if (choice.length === 0) {
        return null;
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

function OrderItemsParser() {
    this.order = /^\[.+?\|.+?\]$/;
}

OrderItemsParser.prototype.parse = function (qml) {
    var parsedLines = qml.split('\n').map((function (line) {
        if (line.match(this.order)) {
            return {order: line.match(this.order)};
        } else {
            return line;
        }
    }).bind(this));

    var body = parsedLines.filter(function (line) {
        return (typeof line === 'string');
    }).join('\n');

    var orders = parsedLines.filter(function (line) {
        return !(typeof line === 'string');
    });

    if (orders.length > 1) {
        return {
            status: false,
            message: '<strong>Errore! </strong> ci può essere al massimo una lista da ordinare'
        };
    } else if (orders.length === 0) {
        return null;
    } else {
        var body = markdown.toHTML(body);
        var answer = orders[0].order[0].substr(1, orders[0].order[0].length - 2).split("|");

        /*console.log(Array.from(new Set(answer)).sort());
        console.log(answer.sort());

        if (Array.from(new Set(answer)).sort().toString() !== answer.sort().toString()) {
            return {
                status: false,
                message: '<strong>Errore! </strong> la lista contiene duplicati'
            };
        }*/

        var answers = function (a) {
            var j, x, i, b = a.slice();
            for (i = b.length; i; i -= 1) {
                j = Math.floor(Math.random() * i);
                x = b[i - 1];
                b[i - 1] = b[j];
                b[j] = x;
            }
            return b;
        }(answer);


        var temp = '[';
        preview = body;
        preview += '<ul id="sortable">';
        answers.forEach(function (item) {
            preview += '<li class="ui-state-default">' + item + '</li>';
            temp += item + ',';
        });
        preview += '</ul>';

        return {
            status: true,
            type: 'OI',
            body: body,
            preview: preview,
            answers: answers,
            answer: answer
        };
    }
};

function QML() {
    this.explanation = /^\s?(?:""")\s*$/;
    this.parsers = [
        new MultiChoiceParser(),
        new MultiAnswerParser(),
        new TrueFalseParser(),
        new CompleteTextParser(),
        new OrderItemsParser()
    ];
}

QML.prototype.parse = function (qml) {
    var extractResult = this.extractExplanation(qml);
    var result = null;
    this.parsers.forEach((function (parser) {
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

QML.prototype.extractExplanation = function (plainText) {
    var expFlag = false;
    var explanationLines = [];
    var newTextLines = [];
    if (plainText){
        plainText.split('\n').forEach((function (line) {
            if (expFlag) {
                explanationLines.push(line);
            } else if (line.match(this.explanation)) {
                expFlag = true;
            } else {
                newTextLines.push(line);
            }
        }).bind(this));
    }
    return {
        explanation: explanationLines.join('\n'),
        plainText: newTextLines.join('\n')
    };
};

QML.prototype.preview = function (body) {
    body = this.parse(body).body;
    if (body && body.length > 100) {
        return body.substr(0, 100) + " [..]";
    } else {
        return body;
    }
};

if (typeof angular === 'undefined') {
    module.exports = QML;
}

/*
 $scope.order = //DEVE CARICARE
 $("#sortable").sortable({
 placeholder: "ui-state-highlight",
 update: function (event, ui) {
 $scope.order = [];
 $('#sortable li').each(function (e) {
 $scope.order.push($(this).attr('id'));
 });
 }
 });
 $("#sortable").disableSelection();
 */
