/*
 * @class   Question
 * @details Questa classe modella il tipo di dato "domanda" nella rappresentazione locale dei dati lato client
 */

$(function () {
    angular.module('QuestionModule', []).factory('model.data.Question', function () {
    /*!
     * @details costruttore della classe
     * @param[in]  author ID dell'autore della domanda
     * @param[in]  body   e' la rappresentazione testuale della domanda
     * @param[in]  id     ID della Question
     * @param[in]  tags   lista di ID di riferimenti ad argomenti
     */
        function Question(author, body, id, tags) {
          //!ID dell'autore della domanda
            this.author = typeof author !== 'undefined' ? author : '';
          //!e' la rappresentazione testuale della domanda
            this.body = typeof body !== 'undefined' ? body : '';
          //!ID della Question
            this.id = typeof id !== 'undefined' ? id : '';
          //!lista di ID di riferimenti ad argomenti
            this.tags = typeof tags !== 'undefined' ? tags : [];
        }
        return Question;
    });
});