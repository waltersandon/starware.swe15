/**
 * @file AnswerService.js
 * @date 18/04/2016
 * @version 2.0
 * @author Alessio Vitella
 *
 */

/*!
 * @class   AnswerService
 * @details Classe che si occupa della operazioni di inserimento e
 *          visualizzazione di risposte a domande dei questionari, sfruttando la
 *          classe server::data::Answer per accedere ai dati persistenti nel
 *          database.
 * @par Usage
 * Fornisce i punteggi delle risposte date alle domande dei questionari a chi ne
 * ha il permesso di accesso ed esegue operazioni di aggiunta e visualizzazione.
 */

var Question = require('./../data/Question');
var Questionnaire = require('./../data/Questionnaire');
var Answer = require('./../data/Answer');

/*!
 * @details costruttore della classe
 */
function AnswerService() {}

/*!
 * @details metodo che invia al client la lista delle risposte in formato
 *          JSON in base alle impostazioni di filtraggio impostate
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
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

/*!
 * @details metodo che ritorna al client un oggetto JSON contenente i dati
 *          della risposta identificata nella richiesta http
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
AnswerService.prototype.getByID = function(req,res,next){
    Answer.findById(req.params.id).exec(function(err, answer){
        if (err) next(400);
        else if(!answer) next(404);
        else {res.json(answer);}
    });
};

/*!
 * @details metodo che aggiunge una nuova risposta nel database
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
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