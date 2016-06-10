/**
 * @file TagService.js
 * @date 19/04/2016
 * @version 2.0
 * @author Andrea Venier
 *
 */

/*!
 * @class   TagService
 * @details Classe che si occupa di gestire gli argomenti, sfruttando la classe
 *          server::data::Tag per accedere ai dati persistenti nel database
 * @par Usage
 * Offre metodi per restituire gli argomenti presenti. Permette inoltre ad un
 * docente di effettuare l'inserimento, la modifica, l'eliminazione di argomenti
 */

var Tag = require('./../data/Tag');
var TagCheck = require('./../validator/TagCheck');
var Question = require('./../data/Question');
var Questionnaire = require('./../data/Questionnaire');

/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @constructor
 */
function TagService() {}

/*!
 * @details metodo che invia al client la lista degli argomenti attraverso
 *          un Json
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
TagService.prototype.get = function(req, res, next){
    this.query = {};
    if (req.query.keywords){
        this.rex = req.query.keywords;
        this.queryArray = [{name:new RegExp(this.rex, 'i')},{description:new RegExp(this.rex, 'i')}]
        this.query.$or = this.queryArray;
    }
    Tag.find(this.query,function(err, tags){
        res.json(tags);
    });
};

/*!
 * @details metodo che ritorna al client un Json contenente l'argomento
 *          specifico identificato nella richiesta http
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
TagService.prototype.getByID = function(req,res,next){
    Tag.findById(req.params.id, function(err, tag){
        if (err) next(400);
        else if (!tag) next(404);
        else {res.json(tag);}
    });
};

/*!
 * @details metodo che aggiunge un nuovo argomento al database
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
TagService.prototype.new = function(req, res, next){
    this.tag = new Tag(req.body);
    this.tag.save(function(err,tag) {
        if (err) next(err);
        else {res.json(tag);}
    });
};

/*!
 * @details metodo che modifica un argomento specificato nella richiesta
 *          http
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
TagService.prototype.modify = function(req, res, next) {
    Tag.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if (err) next(err);
        else {res.send();}
    });
};

/*!
 * @details metodo che elimina un argomento specifico dal database
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
TagService.prototype.delete = function(req,res,next){
    Tag.findById(req.params.id, function(err, tag) {
        if (err) return next(err);
        Questionnaire.count({ tags: tag._id }, function(err, questionCount) {
            if (err) return next(err);
            Question.count({ tags: tag._id }, function(err, questionnaireCount) {
                if (err) return next(err);
                if (questionCount > 0 || questionnaireCount > 0)
                    return next({type: 400, message:"Impossibile eliminare l'argomento, perchè è ancora presente in alcune domande o questionari"});
                tag.remove(function(err) {
                    if (err) return next(err);
                    res.send();
                });
            });
        });
    });
};

module.exports = TagService;