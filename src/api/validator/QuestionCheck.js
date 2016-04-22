
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
                return this.checkTF(qml.substring(this.i +1));
            }
        }



        this.checkTF = function(qml) {
            return true;
        };

        this.checkMultipleChoice = function(qml) {
            return true;
        };
    };


}


module.exports = QuestionCheck;

