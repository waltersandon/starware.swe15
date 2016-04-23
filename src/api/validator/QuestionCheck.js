var markdown = require("markdown").markdown;

/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model Question
 * @constructor
 */
function QuestionCheck() {

    this.checkQML = function(qml){
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

        this.checkTF = function(qml) {
            this.i = 0;
            while(qml.charAt(this.i) != "["){
                this.i++
            }
            if((qml.charAt(this.i + 1) == "T" || qml.charAt(this.i + 1) == "F" )
                && qml.charAt(this.i + 2) == "]"
                && qml.length == 3) {
                return true;
            }
            else{
                return false;
            }
        };

        this.checkMultipleChoice = function(qml) {
            return true;
        };
    };

    console.log( markdown.toHTML( "Hello *World*!" ) );
}


module.exports = QuestionCheck;

