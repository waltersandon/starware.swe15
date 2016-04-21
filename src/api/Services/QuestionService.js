var Question = require('./../data/Question');



/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @constructor
 */
function QuestionService() {

    /**
     * Metodo che invoca il servizio per ritornare una lista di domande
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.get = function(req,res,next){
        Question.find({},function(err,quest){
            if(err){
                return next({code:404, error:"Domande non trovate"});
            }
            res.send(quest);
        });
        console.log("getQuestions");
    };

    /**
     * Metodo che invoca il servizio per ritornare una domanda specifica
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getByID = function(req,res,next){
        Question.findById(req.params.id,function(err,quest){
            if(err){
                return next({code:404, error:"Domanda non trovata"});
            }
            res.send(quest);
        });
        console.log("getQuestion");
    };

    /**
     * Metodo che invoca il servizio per creare una nuova domanda
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.new = function(req,res,next){
        this.quiz = new Question(req.body);
        this.quiz.save(function(err){
            if(err)
                next({code:401, error:"Domanda non valida"});
            else
                res.send();
        });
        console.log("createQuestion");
    };

    /**
     * Metodo che invoca il servizio per modificare una domanda selezionata
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.modify = function(req,res,next){
        Question.findByIdAndUpdate(req.params.id, new Question(req.body), function (err, tank) {
            if (err) next({code:401, error:"Domanda non valida"});
            res.send();
        });
        console.log("modifyQuestion");
    };

    /**
     * Metodo che invoca il servizio per eliminare una domanda selezionata
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.delete = function(req,res,next){
        Question.findByIdAndRemove(req.params.id, function (err, tank) {
            if (err) next({code:401, error:"Domanda non trovata"});
            res.send();
        });
        console.log("deleteQuestion");
    };
}


module.exports = QuestionService;

