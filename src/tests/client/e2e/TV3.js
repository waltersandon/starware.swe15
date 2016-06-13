'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Execute Questionnaire', function() {
    beforeEach(function () {
        browser.get('/index.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('');
            element(by.id('login')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("mario.rossi");
            element(by.id('inputPassword')).sendKeys("password.mario.rossi");
            element(by.css('[type="submit"]')).click();
        });
    });

     it('studente deve poter eseguire un questionario Quiz 1', function () {
     element(by.css('[ng-click="changePath(\'student/questionnaires\')"]')).click();
     element(by.id('titleSearch')).sendKeys("Quiz 1");
     element(by.id('authorSearch')).sendKeys("Tullio Vardanega");
     element(by.id('tagSearch')).sendKeys("Matematica");
     element(by.css('[type="submit"]')).click();
     element.all(by.css('[ng-click="executeQuestionnaire(quest.id)"]')).first().click();
     var i;
     for( i = 0; i < 3; i++){
     browser.waitForAngular();
     if(element(by.css('[ng-switch-when="TF"]')).isPresent()) {
     var TF = element(by.css('[ng-switch-when="TF"]')).isDisplayed();
     }
     browser.waitForAngular();
     if(TF){
     browser.waitForAngular();
     element(by.css('[value="true"]')).click();

     }
     element(by.css('[ng-click="getNext()"]')).click();
     browser.waitForAngular();
     }

     element(by.css('[ng-click="submit()"]')).click();
     browser.switchTo().alert().accept();
     for( i = 0; i < 3; i++){
     element(by.css('[ng-click="getNext()"]')).click();
     }
     element(by.css('[ng-click="logout()"]')).click();
     browser.switchTo().alert().accept();
     });
     it('studente deve poter eseguire un questionario Quiz 2', function () {


     element(by.css('[ng-click="changePath(\'student/questionnaires\')"]')).click();
     element(by.id('titleSearch')).sendKeys("Quiz 2");
     element(by.id('authorSearch')).sendKeys("Tullio Vardanega");
     element(by.id('tagSearch')).sendKeys("Matematica");
     element(by.css('[type="submit"]')).click();
     element.all(by.css('[ng-click="executeQuestionnaire(quest.id)"]')).first().click();
     var i;
     for( i = 0; i < 1; i++){
     browser.waitForAngular();

     if(element(by.css('[ng-switch-when="MC"]')).isPresent()) {
     var MC = element(by.css('[ng-switch-when="MC"]')).isDisplayed();
     }
     if(MC){
     browser.waitForAngular();
     element(by.css('[value="2"]')).click();
     }
     element(by.css('[ng-click="getNext()"]')).click();
     browser.waitForAngular();
     }

     element(by.css('[ng-click="submit()"]')).click();
     browser.switchTo().alert().accept();
     for( i = 0; i < 1; i++){
     var result = element(by.css('[ng-bind-html="result.message"]')).getText();
     expect(result).toEqual("1 / 1");
     element(by.css('[ng-click="getNext()"]')).click();
     }
     element(by.css('[ng-click="logout()"]')).click();
     browser.switchTo().alert().accept();
     });

     it('studente deve poter eseguire un questionario Quiz 3', function () {
     element(by.css('[ng-click="changePath(\'student/questionnaires\')"]')).click();
     element(by.id('titleSearch')).sendKeys("Quiz 3");
     element(by.id('authorSearch')).sendKeys("Tullio Vardanega");
     element(by.id('tagSearch')).sendKeys("Matematica");
     element(by.css('[type="submit"]')).click();
     element.all(by.css('[ng-click="executeQuestionnaire(quest.id)"]')).first().click();
     var i;
     for( i = 0; i < 1; i++){

     browser.waitForAngular();

     if(element(by.css('[ng-switch-when="MA"]')).isPresent()) {
     var MA = element(by.css('[ng-switch-when="MA"]')).isDisplayed();
     }
     browser.waitForAngular();


     if(MA){
     browser.waitForAngular();
     element(by.css('[ng-true-value="1"]')).click();
     element(by.css('[ng-true-value="2"]')).click();

     }

     element(by.css('[ng-click="getNext()"]')).click();
     browser.waitForAngular();
     }

     element(by.css('[ng-click="submit()"]')).click();
     browser.switchTo().alert().accept();
     for( i = 0; i < 1; i++){
     var result = element(by.css('[ng-bind-html="result.message"]')).getText();
     expect(result).toEqual("1 / 1");
     element(by.css('[ng-click="getNext()"]')).click();
     }
     element(by.css('[ng-click="logout()"]')).click();
     browser.switchTo().alert().accept();
     });

     it('studente deve poter eseguire un questionario Quiz 4', function () {


     element(by.css('[ng-click="changePath(\'student/questionnaires\')"]')).click();
     element(by.id('titleSearch')).sendKeys("Quiz 4");
     element(by.id('authorSearch')).sendKeys("Tullio Vardanega");
     element(by.id('tagSearch')).sendKeys("Matematica");
     element(by.css('[type="submit"]')).click();
     element.all(by.css('[ng-click="executeQuestionnaire(quest.id)"]')).first().click();
     var i;
     for( i = 0; i < 1; i++){

     browser.waitForAngular();

     if(element(by.css('[ng-switch-when="CT"]')).isPresent()) {
     var CT = element(by.css('[ng-switch-when="CT"]')).isDisplayed();
     }
     browser.waitForAngular();


     if(CT){
     browser.waitForAngular();
     var select = element.all(by.css('[ng-change="changeAnswer()"]'));
     select.get(0).click();
     select.get(0).$$('[value="0"]').click();
     browser.waitForAngular();

     select.get(1).click();
     select.get(1).$$('[value="1"]').click();
     browser.waitForAngular();

     select.get(2).click();
     select.get(2).$$('[value="1"]').click();
     browser.waitForAngular();

     select.get(3).click();
     select.get(3).$$('[value="2"]').click();
     browser.waitForAngular();

     select.get(4).click();
     select.get(4).$$('[value="0"]').click();
     browser.waitForAngular();


     }

     element(by.css('[ng-click="getNext()"]')).click();
     browser.waitForAngular();
     }

     element(by.css('[ng-click="submit()"]')).click();
     browser.switchTo().alert().accept();

     for( i = 0; i < 1; i++){
     var result = element(by.css('[ng-bind-html="result.message"]')).getText();
     expect(result).toEqual("1 / 1");
     element(by.css('[ng-click="getNext()"]')).click();
     }
     element(by.css('[ng-click="logout()"]')).click();
     browser.switchTo().alert().accept();
     });

    it('studente deve poter eseguire un questionario Quiz 5', function () {


        element(by.css('[ng-click="changePath(\'student/questionnaires\')"]')).click();
        element(by.id('titleSearch')).sendKeys("Quiz 5");
        element(by.id('authorSearch')).sendKeys("Tullio Vardanega");
        element(by.id('tagSearch')).sendKeys("Matematica");
        element(by.css('[type="submit"]')).click();
        element.all(by.css('[ng-click="executeQuestionnaire(quest.id)"]')).first().click();
        var i;
        for( i = 0; i < 1; i++){

            browser.waitForAngular();

            if(element(by.css('[ng-switch-when="OI"]')).isPresent()) {
                var OI = element(by.css('[ng-switch-when="OI"]')).isDisplayed();
            }
            browser.waitForAngular();



            if(OI){
                var lost = element(by.css('[id="Lost"]'));
                var breakingBad = element(by.css('[id="Breaking Bad"]'));
                var gameOfThrones = element(by.css('[id="Game of Thrones"]'));
                var list = element.all(by.css('[ng-repeat="ans in currentQuestion.selectedAnswer track by $index"]'));
                browser.sleep(500);

                browser.actions().dragAndDrop(lost.getLocation(),list.get(0).getLocation()).perform();

                browser.sleep(500);

                browser.actions().dragAndDrop(breakingBad.getLocation(),list.get(1).getLocation()).perform();

                browser.sleep(500);

                browser.actions().dragAndDrop(gameOfThrones.getLocation(),list.get(2).getLocation()).perform();



            }

            element(by.css('[ng-click="getNext()"]')).click();
            browser.waitForAngular();
        }

        element(by.css('[ng-click="submit()"]')).click();
        browser.switchTo().alert().accept();
        for( i = 0; i < 1; i++){
            var result = element(by.css('[ng-bind-html="result.message"]')).getText();
            expect(result).toEqual("1 / 1");
            element(by.css('[ng-click="getNext()"]')).click();
        }
        element(by.css('[ng-click="logout()"]')).click();
        browser.switchTo().alert().accept();
    });

    it('studente deve poter eseguire un questionario Quiz 7', function () {


        element(by.css('[ng-click="changePath(\'student/questionnaires\')"]')).click();
        element(by.id('titleSearch')).sendKeys("Quiz 7");
        element(by.id('authorSearch')).sendKeys("Tullio Vardanega");
        element(by.id('tagSearch')).sendKeys("Matematica");
        element(by.css('[type="submit"]')).click();
        element.all(by.css('[ng-click="executeQuestionnaire(quest.id)"]')).first().click();
        var i;
        for( i = 0; i < 1; i++){

            browser.waitForAngular();

            if(element(by.css('[ng-switch-when="NT"]')).isPresent()) {
                var NT = element(by.css('[ng-switch-when="NT"]')).isDisplayed();
            }

            if(NT){
                element(by.css('[name="Question"]')).clear().sendKeys("1.74");

            }
            element(by.css('[ng-click="getNext()"]')).click();
            browser.waitForAngular();
        }

        element(by.css('[ng-click="submit()"]')).click();
        browser.switchTo().alert().accept();
        for( i = 0; i < 1; i++){
            var result = element(by.css('[ng-bind-html="result.message"]')).getText();
            expect(result).toEqual("1 / 1");
            element(by.css('[ng-click="getNext()"]')).click();
        }
        element(by.css('[ng-click="logout()"]')).click();
        browser.switchTo().alert().accept();
    });



});