$(function () {
    angular.module('EditorModule', []).service('util.Editor', [function () {
            var self = this;
            this.editor = function () {
                return new SimpleMDE({
                    element: document.getElementById('editor'),
                    previewRender: function (plainText) {
                        var p = self.parse(plainText);
                        return p.status ? p.body + p.answerForm : p.message;
                    },
                    toolbar: ['bold', 'italic', '|', 'quote', 'unordered-list', 'ordered-list', '|', 'link', 'image', 'guide', '|', 'preview']
                });
            };
        }]);
});