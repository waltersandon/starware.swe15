$(function () {
    angular.module('EditorModule', []).service('util.Editor', ['util.QML', function (QML) {
            this.editor = function () {
                return new SimpleMDE({
                    element: document.getElementById('editor'),
                    previewRender: function (plainText) {
                        var p = QML.parse(plainText);
                        return p.status ? p.body + p.answerForm : p.message;
                    },
                    toolbar: ['bold', 'italic', '|', 'quote', 'unordered-list', 'ordered-list', '|', 'link', 'image', 'guide', '|', 'preview', 'guide', '|',
                        {
                            name: "custom",
                            action: function (editor) {
                                window.open('#/user/Welcome.html', '_blank');
                            },
                            className: "fa fa-star",
                            title: "Custom Button"
                        }]
                });
            };
        }]);
});