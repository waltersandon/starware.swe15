/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model Question
 * @constructor
 */
function QuestionCheck() {

    this.checkTags = function(tagsArray){
        return (typeof tagsArray !== 'undefined' && tagsArray.length > 0);
    };

    this.checkQML = function(qml){

        this.checkTF = function(qml) {
            var answers = [];
            var text = "";
            qml.split('\n').map(function(row) {
                if (row.startsWith('[T]')) {
                    answers.push({
                        value: "T"
                    });
                }
                else if (row.startsWith('[F]')) {
                    answers.push({
                        value: "F"
                    });
                }
                else text += row;
            });
            text.replace("\\[","[");
            text.replace("\\]","]");
            if (answers.length == 1){
                return true;
            }
            return false;
        };

        this.checkMultipleChoice = function(qml) {
            var answers = [];
            var text = "";
            var rightAnswer = 0;
            var wrongAnswer = 0;
            qml.split('\n').map(function(row) {
                if (row.startsWith('[]')) {
                    answers.push({
                        text: row.replace("[]", ""),
                        correct: false
                    });
                    rightAnswer++;
                }
                else if (row.startsWith('[*]')) {
                    answers.push({
                        text: row.replace("[*]", ""),
                        correct: true
                    });
                    wrongAnswer++;
                }
                else text += row;
            });
            text.replace("\\[","[");
            text.replace("\\]","]");
            if (rightAnswer == 1 && wrongAnswer > 0){
                return true;
            }
            return false;
        };

        if(qml.charAt(0) == "<"){
            this.i = 1;
            while(qml.charAt(this.i) != ">"){
                this.i++
            }
            this.type = qml.substring(1,this.i);
            if(this.type == "TF"){
                return this.checkTF(qml.substring(this.i + 1));
            }
            else if(this.type == "MultipleChoice"){
                return this.checkMultipleChoice(qml.substring(this.i + 1));
            }
        }
        return false;
    };

}


module.exports = QuestionCheck;

