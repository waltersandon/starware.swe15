$(function () {
    angular.module('EditorModule', []).service('util.Editor', ['util.QML', function (QML) {
            this.editor = function () {
                return new SimpleMDE({
                    element: document.getElementById('editor'),
                    previewRender: function (plainText) {
                        var p = QML.parse(plainText);
                        return p.status ? p.body + p.answerForm : p.message;
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