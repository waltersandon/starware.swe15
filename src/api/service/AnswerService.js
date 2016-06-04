var Question = require('./../data/Question');
var Questionnaire = require('./../data/Questionnaire');
var Answer = require('./../data/Answer');

/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @constructor
 */
function AnswerService() {}

/**
 * Metodo che invoca il servizio per ritornare una lista di risposte
 * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
 * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
 * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
 * per passare il controllo ai successivi middleware.
 */
AnswerService.prototype.get = function(req,res,next){
    var query = {};
    if(req.query.authors) {
        var authors = req.query.authors.split("|");
        query.author = {"$in": authors};
    }
    if(req.query.questions) {
        var questions = req.query.questions.split("|");
        query.question = {"$in": questions};
    }
    if(req.query.questionnaires) {
        var questionnaires = req.query.questionnaires.split("|");
        query.questionnaire = {"$in": questionnaires};
    }
    Answer.find(query).exec(function(err, answers) {
        if (err) next(400);
        else {res.json(answers);}
    });
};

/**
 * Metodo che invoca il servizio per ritornare una risposta specifica
 * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
 * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
 * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
 * per passare il controllo ai successivi middleware.
 */
AnswerService.prototype.getByID = function(req,res,next){
    Answer.findById(req.params.id).exec(function(err, answer){
        if (err) next(400);
        else if(!answer) next(404);
        else {res.json(answer);}
    });
};

/**
 * Metodo che invoca il servizio per creare una nuova risposta
 * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
 * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
 * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
 * per passare il controllo ai successivi middleware.
 */
AnswerService.prototype.new = function(req,res,next){
    if (req.session.user)
        req.body.author = req.session.user._id;
    else req.body.author = null;
    var answer = new Answer(req.body);
    answer.save(function (err, answer) {
        if (err) next(err);
        else {res.json(answer);}
    });
};
    
module.exports = AnswerService;