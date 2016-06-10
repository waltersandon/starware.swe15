/**
 * @file TagCheck.js
 * @date 19/04/2016
 * @version 2.0
 * @author Alessio Vitella
 *
 */

/*!
 * @class   TagCheck
 * @details Classe contenente tutte le funzioni di controllo della validità dei
 *          campi del model Tag
 * @par Usage 
 * Viene utilizzata dai service per effettuare controlli sul model Tag
 *
 * @constructor
 */
function TagCheck() {}

/*
 * @details metodo che controlla che il nome dell'argomento non sia vuoto
 * @param[in]  name il nome dell'argomento da controllare
 */
TagCheck.prototype.checkName = function(name){
    return (name.length !== 0);
};

module.exports = TagCheck;