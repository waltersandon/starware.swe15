/**
 * @file Questionnaire.js
 * @date 19/04/2016
 * @version 2.0
 * @author Thomas Pigarelli
 *
 */

/*!
 * @class   Questionnaire
 * @details Questa classe modella il tipo di dato "questionario" nella rappresentazione locale dei dati lato client
 */
$(function () {
    angular.module('QuestionnaireModule', []).factory('model.data.Questionnaire', function () {
    /*!
     * @details costruttore della classe
     * @param[in]  author    ID dell'autore del questionario
     * @param[in]  id        ID del Questionnaire
     * @param[in]  questions insieme di ID di riferimenti a Question
     * @param[in]  tags      lista di ID di riferimenti ad argomenti
     * @param[in]  title     nome del questionario
     */
        function Questionnaire(author, id, questions, tags, title) {
          //!ID dell'autore del questionario
            this.author = typeof author !== 'undefined' ? author : '';
          //!ID del Questionnaire
            this.id = typeof id !== 'undefined' ? id : '';
          //!insieme di ID di riferimenti a Question
            this.questions = typeof questions !== 'undefined' ? questions : [];
          //!lista di ID di riferimenti ad argomenti 
            this.tags = typeof tags !== 'undefined' ? tags : [];
          //!nome del questionario
            this.title = typeof title !== 'undefined' ? title : '';
        }
        return Questionnaire;
    });
});