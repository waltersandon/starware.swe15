$(function () {
    angular.module('EditorModule', []).service('util.Editor', ['util.QML', function (QML) {
            this.editor = function () {
                return new SimpleMDE({
                    element: document.getElementById('editor'),
                    previewRender: function (plainText) {
                        var p = QML.parse(plainText);
                        console.log(p);
                        
                        if (p.status) {
                            if (p.type === 'TF' || p.type === 'MC' || p.type === 'MA') {
                                return p.body + p.answerForm;
                            } else if (p.type === 'CT') {
                                var ret = '';
                                for (var i = 0; i < p.preview.length; i++) {
                                    ret += p.body[i] + p.preview[i];
                                }
                                return ret + p.body[p.preview.length];
                            }
                        } else {
                            return p.message;
                        }
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