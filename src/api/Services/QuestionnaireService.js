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
        Questionnaire.findById(req.params.id)
            .populate("author")
            .populate("question")
            .populate("tags")
            .exec(function(err, quest){
            if(err) next({code:404, error:"Questionario non trovati"});
            res.json(quest);
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
        this.query = {};
        if(req.query.title){
            this.query.title = new RegExp(req.query.title, 'i');
        }
        if(req.query.author){
            this.query.author = req.query.author;
        }
        if(req.query.tags) {
            this.tags = req.query.tags.split("|");
            this.query.tags = {"$in": this.tags};
        }
        Questionnaire.find(this.query)
            .populate("author")
            .populate("question")
            .populate("tags")
            .exec(function(err, quest){
            if(err) next({code:404, error:"Questionari non trovato"});
            res.json(quest);
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
            if(err) next({code:404, error:"Questionario non valido"});
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
        this.newQuest = new Questionnaire(req.body);
        this.newQuest._id = req.params.id;
        Questionnaire.findByIdAndUpdate(req.params.id, this.newQuest, function (err) {
            if (err) next({code:404, error:"Questionario non valido"});
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
        Questionnaire.findByIdAndRemove(req.params.id, function (err) {
            if (err) next({code:404, error:"Questionario non trovato"});
            res.send();
        });
    };

}


module.exports = QuestionnaireService;

