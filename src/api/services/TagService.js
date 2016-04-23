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
    this.get = function(req,res,next){
        Tag.find({},function(err,tags){
            res.send(tags);
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
            if (!tag)
                return res.status(404).json({ error: "Argomento non trovato" });
            res.send(tag);
        });
    };

    /**
     * Metodo che invoca il servizio per creare un nuovo argomento
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.new = function(req,res,next){
        var check = new TagCheck();
        if (!check.checkName(req.body.name))
            return res.status(400).json({ error: 'Nome troppo corto' });

        if (req.body.parent && req.body.parent.id) {
            Tag.findById(req.body.parent.id, function(err, tag) {
                if (!tag)
                    res.status(400).json({ error: 'Padre non trovato' });
            });
        }

        this.tag = new Tag(req.body);
        this.tag.save(function(err) {
            res.sendStatus(200);
        });
    };

    /**
     * Metodo che invoca il servizio per modificare un argomento specifico
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.modifyTag = function(req,res,next) {
        var check = new TagCheck();
        if (!check.checkName(req.body.name))
            return res.status(400).json({ error: 'Nome troppo corto' });

        if (req.body.parent && req.body.parent.id) {
            Tag.findById(req.body.parent.id, function(err, tag) {
                if (!tag)
                    res.status(400).json({ error: 'Padre non trovato' });
            });
        }
    };

    /**
     * Metodo che invoca il servizio per eliminare un argomento specifico
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.deleteTag = function(req,res,next){
        console.log("deleteSubject");
    };

}


module.exports = TagService;

