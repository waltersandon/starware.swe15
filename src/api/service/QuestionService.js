var Question = require('./../data/Question');
var Questionnaire = require('./../data/Questionnaire');
var QuestionCheck = require('./../validator/QuestionCheck');

/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @constructor
 */
function QuestionService() {}

/**
 * Metodo che invoca il servizio per ritornare una lista di domande
 * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
 * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
 * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
 * per passare il controllo ai successivi middleware.
 */
QuestionService.prototype.get = function(req,res,next){
    this.query = {};
    if(req.query.keywords) {
        //this.keywords = req.query.keywords.split("|");
        this.rex = "\\b("+req.query.keywords+")\\b";
        this.query.body = new RegExp(this.rex, 'i');
    }
    if(req.query.author){
        this.authors = req.query.author.split("|");
        this.query.author = {$in: this.authors};
    }
    if(req.query.tags) {
        this.tags = req.query.tags.split("|");
        this.query.tags = {"$in": this.tags};
    }
    Question.find(this.query).exec(function(err, quest) {
        if (err) next(400);
        else {res.json(quest);}
    });
};

/**
 * Metodo che invoca il servizio per ritornare una domanda specifica
 * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
 * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
 * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
 * per passare il controllo ai successivi middleware.
 */
QuestionService.prototype.getByID = function(req,res,next){
    Question.findById(req.params.id).exec(function(err, quest){
        if (err) next(400);
        else if(!quest) next(404);
        else {res.json(quest);}
    });
};

/**
 * Metodo che invoca il servizio per creare una nuova domanda
 * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
 * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
 * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
 * per passare il controllo ai successivi middleware.
 */
QuestionService.prototype.new = function(req,res,next){
    req.body.author = req.session.user._id;
    this.quiz = new Question(req.body);
    this.quiz.save(function (err,quiz) {
        if (err) next(err);
        else {res.json(quiz);}
    });
};

/**
 * Metodo che invoca il servizio per modificare una domanda selezionata
 * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
 * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
 * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
 * per passare il controllo ai successivi middleware.
 */
QuestionService.prototype.modify = function(req,res,next){
    Question.findById(req.params.id, function (err, question) {
        if (err) return next(err);
        if (question.author != req.session.user._id)
            return next(401);
        question.body = req.body.body;
        question.tags = req.body.tags;
        question.save(function(err) {
            if (err) return next(err);
            res.send();
        });
    });
};

/**
 * Metodo che invoca il servizio per eliminare una domanda selezionata
 * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
 * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
 * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
 * per passare il controllo ai successivi middleware.
 */
QuestionService.prototype.delete = function(req,res,next){
    Question.findById(req.params.id, function (err, question) {
        if (err) return next(err);
        if (question.author != req.session.user._id)
            return next(401);
        Questionnaire.count({ questions: question._id }, function(err, count) {
            if (err) return next(err);
            if (count > 0)
                return next({type: 400, message:"Impossibile eliminare: questa domanda è ancora presente in qualche questionario"});
            question.remove(function(err) {
                if (err) return next(err);
                res.send();
            });
        });
    });
};
    
module.exports = QuestionService;