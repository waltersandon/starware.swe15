$(function () {
    angular.module('QMLModule', []).service('util.QML', [function () {
            
            this.parse = function (plainText) {
                if (plainText.charAt(0) === '<') {
                    switch (plainText.substr(1, plainText.indexOf('>') - 1)) {
                        case 'TF T':
                            plainText = plainText.substr(plainText.indexOf('\n') + 1);
                            return {
                                status: true,
                                message: markdown(plainText) + '<form>\
                                    <div class=\'form-group\'>\
                                        <div>\
                                            <label>\
                                                <input type=\'radio\' ng-model=\'ris\' value=\'true\'>Vero\
                                            </label>\
                                        </div>\
                                        <div>\
                                            <label>\
                                                <input type=\'radio\' ng-model=\'ris\' value=\'false\'>Falso\
                                            </label>\
                                        </div>\
                                    </div>\
                                    </form>'
                            };
                        case 'TF F':
                            plainText = plainText.substr(plainText.indexOf('\n') + 1);
                            return {
                                status: true,
                                message: markdown(plainText) + '<form>\
                                    <div class=\'form-group\'>\
                                        <div>\
                                            <label>\
                                                <input type=\'radio\' ng-model=\'ris\' value=\'false\'>Vero\
                                            </label>\
                                        </div>\
                                        <div>\
                                            <label>\
                                                <input type=\'radio\' ng-model=\'ris\' value=\'true\'>Falso\
                                            </label>\
                                        </div>\
                                    </div>\
                                    </form>'
                            };
                        case 'MultipleChoice':
                            plainText = plainText.substr(plainText.indexOf('\n') + 1);
                            var rightAnswers = 0, wrongAnswers = 0, ansFlag = false;
                            var a = plainText.split('\n');
                            var res = '';
                            for (var i = 0; i < a.length; i++) {

                                if (a[i] === '[answers]' && !ansFlag) {
                                    ansFlag = true;
                                    res += '<div class=\'form-group\'>';
                                }

                                if (a[i].startsWith('[]') && ansFlag) {
                                    rightAnswers++;
                                    var r = markdown(a[i].substr(2));
                                    res += '<div>\
                                                <label>\
                                                    <input type=\'radio\' name=\'ris\' value=\'true\'>' + r.substr(3, r.length - 3) + '\
                                                </label>\
                                            </div>';
                                } else if (a[i].startsWith('[*]') && ansFlag) {
                                    wrongAnswers++;
                                    var r = markdown(a[i].substr(3));
                                    res += '<div>\
                                                <label>\
                                                    <input type=\'radio\' name=\'ris\' value=\'false\'>' + r.substr(3, r.length - 3) + '\
                                                </label>\
                                            </div>';
                                } else if (!ansFlag) {
                                    res += markdown(a[i]);
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
                                message: res + '</div>'
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