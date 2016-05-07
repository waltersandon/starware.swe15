var Tag = require('./../data/Tag');
var TagCheck = require('./../validator/TagCheck');
var Question = require('./../data/Question');
var Questionnaire = require('./../data/Questionnaire');

/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @constructor
 */
function TagService() {}

/**
 * Metodo che invoca il servizio per ritornare la lista degli argomenti
 * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
 * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
 * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
 * per passare il controllo ai successivi middleware.
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

/**
 * Metodo che invoca il servizio per ritornare un argomento specifico
 * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
 * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
 * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
 * per passare il controllo ai successivi middleware.
 */
TagService.prototype.getByID = function(req,res,next){
    Tag.findById(req.params.id, function(err, tag){
        if (err) next(400);
        else if (!tag) next(404);
        else {res.json(tag);}
    });
};

/**
 * Metodo che invoca il servizio per creare un nuovo argomento
 * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
 * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
 * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
 * per passare il controllo ai successivi middleware.
 */
TagService.prototype.new = function(req, res, next){
    this.tag = new Tag(req.body);
    this.tag.save(function(err,tag) {
        if (err) next(err);
        else {res.json(tag);}
    });
};

/**
 * Metodo che invoca il servizio per modificare un argomento specifico
 * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
 * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
 * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
 * per passare il controllo ai successivi middleware.
 */
TagService.prototype.modify = function(req, res, next) {
    Tag.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if (err) next(err);
        else {res.send();}
    });
};

/**
 * Metodo che invoca il servizio per eliminare un argomento specifico
 * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
 * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
 * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
 * per passare il controllo ai successivi middleware.
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