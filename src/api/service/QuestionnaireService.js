var Questionnaire = require('./../data/Questionnaire');
var QuestionnaireCheck = require('./../validator/QuestionnaireCheck');

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
        Questionnaire.findById(req.params.id).exec(function(err, quest){
            if(err) next(400);
            else if (!quest) next(404);
            else {res.json(quest);}
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
            this.rex = "\\b("+req.query.title+")\\b";
            this.query.title = new RegExp(this.rex, 'i');
        }
        if(req.query.author){
            this.authors = req.query.author.split("|");
            this.query.author = {$in: this.authors};
        }
        if(req.query.tags) {
            this.tags = req.query.tags.split("|");
            this.query.tags = {"$in": this.tags};
        }
        Questionnaire.find(this.query).exec(function(err, quest){
            if(err) next(400);
            else if (!quest) next(404);
            else {res.json(quest);}
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
        req.body.author = req.session.user._id;
        this.quest = new Questionnaire(req.body);
        this.quest.save(function(err,quest){
            if(err) next(err);
            else {res.json(quest);}
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
        Questionnaire.findById(req.params.id, function (err, questionnaire) {
            if (questionnaire.author != req.session.user._id)
                return next(401);
            if (err) return next(err);
            questionnaire.title = req.body.title;
            questionnaire.tags = req.body.tags;
            questionnaire.questions = req.body.questions;
            questionnaire.save(function(err) {
                if (err) return next(err);
                res.send();
            });
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
        Questionnaire.findById(req.params.id, function(err, questionnaire) {
           if (questionnaire.author != req.session.user._id)
                return next(401);
            if (err) return next(err);
            questionnaire.remove(function(err) {
                if (err) return next(err);
                res.send();
            });
        });
    };

}

module.exports = QuestionnaireService;