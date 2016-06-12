describe('util.Editor', function() {
    var EditorModule;


    beforeEach(function () {
        module('EditorModule', function ($provide) {
            var QML = function() {
                this.parse = function(status) {
                    return {status: true};
                };
            };

            $provide.service('util.QML', QML);
        });

        inject(function ($injector) {
            EditorModule = $injector.get('util.Editor');
        });
    });
    describe('check editor', function () {

        it('deve ritornare un nuovo simple editor ', function () {
            var risposta = EditorModule.editor();
            expect(risposta).toBeDefined();
        });


    });



});