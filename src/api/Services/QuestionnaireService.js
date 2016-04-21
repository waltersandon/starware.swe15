var Questionnaire = require('./../data/Questionnaire');


/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @constructor
 */
function QuestionnaireService() {

    /**
     * Metodo che invoca il servizio per ritornare il questionario specifico richiesto dall'utente
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getByID = function(req,res,next){
        Questionnaire.findById(req.params.id,function(err, quest){
            if(err){
                return next({code:404, error:"Questionario non trovati"});
            }
            res.send(quest);
        });
    };

    /**
     * Metodo che invoca il servizio per ritornare una lista di questionari
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.get = function(req,res,next){
        Questionnaire.find({}, function(err, quest){
            if(err){
                return next({code:404, error:"Questionari non trovato"});
            }
            res.send(quest);
        });
    };


    /**
     * Metodo che invoca il servizio per creare un nuovo questionario
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.new = function(req,res,next){
        this.quest = new Questionnaire(req.body);
        this.quest.save(function(err){
            if(err)
                next({code:401, error:"Questionario non valido"});
            res.send();
        });
    };

    /**
     * Metodo che invoca il servizio per modificare un questionario specifico
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.modify = function(req,res,next){
        Questionnaire.findByIdAndUpdate(req.params.id, new Questionnaire(req.body), function (err, tank) {
            if (err) next({code:401, error:"Questionario non valido"});
            res.send();
        });
    };

    /**
     * Metodo che invoca il servizio per cancellare un questionario specifico
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.delete = function(req,res,next){
        console.log("deleteQuestionnaire");
    };



}


module.exports = QuestionnaireService;

