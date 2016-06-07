/**
 * @file Router.js
 * @date 22/04/2016
 * @version 2.0
 * @author Nicola De Cao
 *
 */
var express = require('express');
var Configuration = require('./../app/Configuration');
var UserService = require('../service/UserService');
var QuestionService = require('../service/QuestionService');
var QuestionnaireService = require('../service/QuestionnaireService');
var AnswerService = require('../service/AnswerService');
var SessionService = require('../service/SessionService');
var TagService = require('../service/TagService');
var RoleService = require('../service/RoleService');

/*!
 * @class   Router
 * @details Classe che si occupa di instradare le richieste verso le relative
 *          richieste
 * @par Usage
 * Si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare
 * l’opportuno servizio
 */
function Router(auth, error) {

    this.router = express.Router();
    //!campo dati che rappresenta un oggetto SessionService
    this.sessionService = new SessionService();
    //!campo dati che rappresenta un oggetto UserService
    this.userService = new UserService();
    //!campo dati che rappresenta un oggetto QuestionService
    this.questionService = new QuestionService();
    //!campo dati che rappresenta un oggetto QuestionnaireService
    this.questionnaireService = new QuestionnaireService();
    //!campo dati che rappresenta un oggetto Answer Service
    this.answerService = new AnswerService();
    //!campo dati che rappresenta un oggetto TagService
    this.tagService = new TagService();
    //!campo dati che rappresenta un oggetto RoleService
    this.roleService = new RoleService();

    //login & logout
    this.router.post("/session",this.sessionService.new);
    this.router.delete("/session",this.sessionService.delete);

    //Routing user requests
    this.router.get('/users',auth.requireRole('student'),this.userService.get);
    this.router.get('/users/me',auth.requireRole('student'), this.userService.getMe);
    this.router.get('/users/:id',auth.requireRole('student'),this.userService.getByID);
    this.router.post('/users',this.userService.new);
    this.router.post('/users/me',auth.requireRole('student'),this.userService.modifyMe);
    this.router.post('/users/:id',auth.requireRole('admin'),this.userService.modify);
    this.router.delete('/users/:id',auth.requireRole('admin'),this.userService.delete);

    //Routing question request
    this.router.get('/questions',this.questionService.get);
    this.router.get('/questions/:id',this.questionService.getByID);
    this.router.post('/questions',auth.requireRole('teacher'),this.questionService.new);
    this.router.put('/questions/:id',auth.requireRole('teacher'),this.questionService.modify);
    this.router.delete('/questions/:id',auth.requireRole('teacher'),this.questionService.delete);

    //Routing questionnaire requests
    this.router.get('/questionnaires',this.questionnaireService.get);
    this.router.get('/questionnaires/:id',this.questionnaireService.getByID);
    this.router.post('/questionnaires',auth.requireRole('teacher'),this.questionnaireService.new);
    this.router.put('/questionnaires/:id',auth.requireRole('teacher'),this.questionnaireService.modify);
    this.router.delete('/questionnaires/:id',auth.requireRole('teacher'),this.questionnaireService.delete);

    //Routing answer request
    this.router.get('/answers',this.answerService.get);
    this.router.get('/answers/:id',this.answerService.getByID);
    this.router.post('/answers',this.answerService.new);

    //Routing subject requests
    this.router.get('/tags',this.tagService.get);
    this.router.get('/tags/:id',this.tagService.getByID);
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