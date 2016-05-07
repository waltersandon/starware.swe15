var express = require('express');

var Configuration = require('./../app/Configuration');

var UserService = require('../service/UserService');
var QuestionService = require('../service/QuestionService');
var QuestionnaireService = require('../service/QuestionnaireService');
var SessionService = require('../service/SessionService');
var TagService = require('../service/TagService');
var RoleService = require('../service/RoleService');

/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @param auth
 * @param error
 * @constructor
 */
function Router(auth, error) {

    this.router = express.Router();
    this.sessionService = new SessionService();
    this.userService = new UserService();
    this.questionService = new QuestionService();
    this.questionnaireService = new QuestionnaireService();
    this.tagService = new TagService();
    this.roleService = new RoleService();

    //login & logout
    this.router.post("/session",this.sessionService.login);
    this.router.delete("/session",this.sessionService.logout);

    //Routing user requests
    this.router.get('/users',auth.requireRole('admin'),this.userService.get);
    this.router.get('/users/me',auth.requireRole('student'), this.userService.getMe);
    this.router.get('/users/:id',auth.requireRole('student'),this.userService.getByID);
    this.router.post('/users',this.userService.new);
    this.router.post('/users/me',auth.requireRole('student'),this.userService.modifyMe);
    this.router.post('/users/:id',auth.requireRole('admin'),this.userService.modify);
    this.router.delete('/users/:id',auth.requireRole('admin'),this.userService.delete);

    //Routing question request
    this.router.get('/questions',auth.requireRole('student'),this.questionService.get);
    this.router.get('/questions/:id',auth.requireRole('student'),this.questionService.getByID);
    this.router.post('/questions',auth.requireRole('teacher'),this.questionService.new);
    this.router.put('/questions/:id',auth.requireRole('teacher'),this.questionService.modify);
    this.router.delete('/questions/:id',auth.requireRole('teacher'),this.questionService.delete);

    //Routing questionnaire requests
    this.router.get('/questionnaires',auth.requireRole('student'),this.questionnaireService.get);
    this.router.get('/questionnaires/:id',auth.requireRole('student'),this.questionnaireService.getByID);
    this.router.post('/questionnaires',auth.requireRole('teacher'),this.questionnaireService.new);
    this.router.put('/questionnaires/:id',auth.requireRole('teacher'),this.questionnaireService.modify);
    this.router.delete('/questionnaires/:id',auth.requireRole('teacher'),this.questionnaireService.delete);

    //Routing subject requests
    this.router.get('/tags',auth.requireRole('student'),this.tagService.get);
    this.router.get('/tags/:id',auth.requireRole('student'),this.tagService.getByID);
    this.router.post('/tags',auth.requireRole('teacher'),this.tagService.new);
    this.router.put('/tags/:id',auth.requireRole('teacher'),this.tagService.modify);
    this.router.delete('/tags/:id',auth.requireRole('teacher'),this.tagService.delete);

    //Routing role requests
    this.router.get('/roles',auth.requireRole('admin'),this.roleService.get);
    this.router.get('/roles/:id',auth.requireRole('student'),this.roleService.getByID);

    // Error handler
    this.router.use(error.handler);
    
}

module.exports = Router;