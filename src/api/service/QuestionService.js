/**
 * @file QuestionService.js
 * @date 22/04/2016
 * @version 2.0
 * @author Nicola De Cao
 *
 */

/*!
 * @class   QuestionService
 * @details Classe che si occupa di gestire domande, sfruttando la classe
 *          server::data::Question per accedere ai dati persistenti nel database
 * @par Usage
 * Offre metodi per restituire le domande. Permette inoltre ad un docente di
 * effettuare l'inserimento, la modifica, l'eliminazione di domande
 */

var Question = require('./../data/Question');
var Questionnaire = require('./../data/Questionnaire');
var QuestionCheck = require('./../validator/QuestionCheck');

/*!
 * @details costruttore della classe
 */
function QuestionService() {}

/*!
 * @details metodo che invia al client una lista di domande attraverso un
 *          Json
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
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

/*!
 * @details metodo che ritorna al client un Json contenente la domanda
 *          specifica identificata nella richiesta http
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
QuestionService.prototype.getByID = function(req,res,next){
    Question.findById(req.params.id).exec(function(err, quest){
        if (err) next(400);
        else if(!quest) next(404);
        else {res.json(quest);}
    });
};

/*!
 * @details metodo che aggiunge una nuova domanda al database
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
QuestionService.prototype.new = function(req,res,next){
    req.body.author = req.session.user._id;
    this.quiz = new Question(req.body);
    this.quiz.save(function (err,quiz) {
        if (err) next(err);
        else {res.json(quiz);}
    });
};

/*!
 * @details metodo che modifica una domanda specificato nella richiesta http
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
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

/*!
 * @details metodo che elimina una domanda selezionata dal database
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
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