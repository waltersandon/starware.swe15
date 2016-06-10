/**
 * @file Editor.js
 * @date 22/04/2016
 * @version 2.0
 * @author Alessio Vitella
 *
 */

/*!
 * @class   Editor
 * @details Classe che si occupa di gestire l'editor per il QML
 */

/*!
 * @details costruttore della classe
 */
$(function () {
    angular.module('EditorModule', []).service('util.Editor', ['util.QML', function (QML) {

        /*!
         * @details provvede a creare un editor per il QML
         */
        this.editor = function () {
            return new SimpleMDE({
                element: document.getElementById('editor'),
                previewRender: function (plainText) {
                    var p = QML.parse(plainText);
                    console.log(p);
                    return p.status ? p.preview : p.message;
                },
                toolbar: ['bold', 'italic', '|', 'quote', 'unordered-list', 'ordered-list', '|', 'link', 'image',
                    {
                        name: 'guide',
                        action: function (editor) {
                            window.open('#/teacher/guide', '_blank');
                        },
                        className: 'fa fa-question-circle',
                        title: 'Guide'
                    }, '|', 'preview']
            });
        };
    }]);
});