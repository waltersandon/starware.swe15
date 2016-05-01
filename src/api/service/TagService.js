var Tag = require('./../data/Tag');
var TagCheck = require('./../validator/TagCheck');

/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @constructor
 */
function TagService() {

    /**
     * Metodo che invoca il servizio per ritornare la lista degli argomenti
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.get = function(req, res, next){
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
    this.getByID = function(req,res,next){
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
    this.new = function(req, res, next){
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
    this.modifyTag = function(req, res, next) {
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
    this.deleteTag = function(req,res,next){
        Tag.findByIdAndRemove(req.params.id, function(err) {
            if (err) next(400);
            else {res.send();}
        });
    };

}

module.exports = TagService;