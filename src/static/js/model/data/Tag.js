/*
 * @class   Tag
 * @details Questa classe modella il tag argomento di un questionario e/o di una
 *          domanda nella rappresentazione locale dei dati lato client
 */
$(function () {
    angular.module('TagModule', []).factory('model.data.Tag', function () {
    /*!
     * @details costruttore della classe
     * @param[in]  description descrizione dell'argomento
     * @param[in]  id          ID del Tag
     * @param[in]  name        nome dell'argomento
     */
        function Tag(description, id, name) {
          //!descrizione dell'argomento
            this.description = description;
          //!ID del Tag
            this.id = id;
          //!nome dell'argomento
            this.name = name;
        }
        return Tag;
    });
});