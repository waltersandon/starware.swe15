/**
 * @file QuestionnaireService.js
 * @date 21/04/2016
 * @version 2.0
 * @author Alessio Vitella
 *
 */

/*!
 * @class   QuestionnaireService
 * @details Classe che si occupa di gestire questionari, sfruttando la classe
 *          server::data::Questionnaire per accedere ai dati persistenti nel
 *          database.
 * @par Usage
 * Offre metodi per restituire questionari. Permette inoltre ad un docente di
 * effettuare l'inserimento, la modifica, l'eliminazione di questionari
 */

var Questionnaire = require('./../data/Questionnaire');
var QuestionnaireCheck = require('./../validator/QuestionnaireCheck');

/*!
 * @details costruttore della classe
 */
function QuestionnaireService() {}

/*!
 * @details metodo che ritorna al client un Json contenente il questionario
 *          specifico richiesto identificato nella richiesta http
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
QuestionnaireService.prototype.getByID = function(req,res,next){
    Questionnaire.findById(req.params.id).exec(function(err, quest){
        if(err) next(400);
        else if (!quest) next(404);
        else {res.json(quest);}
    });
};

/*!
 * @details metodo che invia al client una lista di questionari attraverso
 *          un Json
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
QuestionnaireService.prototype.get = function(req,res,next){
    this.query = {};
    if(req.query.title){
        this.rex = req.query.title;
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

/*!
 * @details metodo che aggiunge un nuovo questionario al database
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
QuestionnaireService.prototype.new = function(req,res,next){
    req.body.author = req.session.user._id;
    this.quest = new Questionnaire(req.body);
    this.quest.save(function(err,quest){
        if(err) next(err);
        else {res.json(quest);}
    });
};

/*!
 * @details metodo che modifica un questionario specificato nella richiesta
 *          http
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
QuestionnaireService.prototype.modify = function(req,res,next){
    Questionnaire.findById(req.params.id, function (err, questionnaire) {
        if (err) return next(err);
        if (questionnaire.author != req.session.user._id)
            return next(401);
        questionnaire.title = req.body.title;
        questionnaire.tags = req.body.tags;
        questionnaire.questions = req.body.questions;
        questionnaire.save(function(err) {
            if (err) return next(err);
            res.send();
        });
    });
};

/*!
 * @details metodo che cancella un questionario specifico dal database
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
QuestionnaireService.prototype.delete = function(req,res,next){
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

module.exports = QuestionnaireService;