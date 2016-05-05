$(function () {
    angular.module('QMLModule', []).service('util.QML', [function () {
            this.parse = function (plainText) {
                if (plainText.charAt(0) === '<') {
                    switch (plainText.substr(1, plainText.indexOf('>') - 1)) {
                        case 'TF T':
                            plainText = plainText.substr(plainText.indexOf('\n') + 1);
                            return {
                                status: true,
                                message: markdown.toHTML(plainText) + '<form>\
                                    <div class=\'form-group\'>\
                                        <div>\
                                            <label>\
                                                <input type=\'radio\' name=\'ris\' ng-model=\'ris\' value=\'true\'>Vero\
                                            </label>\
                                        </div>\
                                        <div>\
                                            <label>\
                                                <input type=\'radio\' name=\'ris\' ng-model=\'ris\' value=\'false\'>Falso\
                                            </label>\
                                        </div>\
                                    </div>\
                                    </form>'
                            };
                        case 'TF F':
                            plainText = plainText.substr(plainText.indexOf('\n') + 1);
                            return {
                                status: true,
                                message: markdown.toHTML(plainText) + '<form>\
                                    <div class=\'form-group\'>\
                                        <div>\
                                            <label>\
                                                <input type=\'radio\' name=\'ris\' ng-model=\'ris\' value=\'false\'>Vero\
                                            </label>\
                                        </div>\
                                        <div>\
                                            <label>\
                                                <input type=\'radio\' name=\'ris\' ng-model=\'ris\' value=\'true\'>Falso\
                                            </label>\
                                        </div>\
                                    </div>\
                                    </form>'
                            };
                        case 'MC':
                            plainText = plainText.substr(plainText.indexOf('\n') + 1);
                            var rightAnswers = 0, wrongAnswers = 0, ansFlag = false;
                            var res = '';
                            for (var row of plainText.split('\n')) {

                                if (row === '[answers]' && !ansFlag) {
                                    ansFlag = true;
                                    res += '<form>\
                                                <div class=\'form-group\'>';
                                }

                                if (row.startsWith('[]') && ansFlag) {
                                    var r = markdown.toHTML(row.substr(2));
                                    res += '<div>\
                                                <label>\
                                                    <input type=\'radio\' name=\'ris\' ng-model=\'ris[' + rightAnswers + ']\'>' + r.substr(3, r.length - 3) + '\
                                                </label>\
                                            </div>';
                                    rightAnswers++;
                                } else if (row.startsWith('[*]') && ansFlag) {
                                    var r = markdown.toHTML(row.substr(3));
                                    res += '<div>\
                                                <label>\
                                                    <input type=\'radio\' name=\'ris\' ng-model=\'ris[' + wrongAnswers + ']\'>' + r.substr(3, r.length - 3) + '\
                                                </label>\
                                            </div>';
                                    wrongAnswers++;
                                } else if (!ansFlag) {
                                    res += markdown.toHTML(row);
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
                                message: res + '</div></form>'
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