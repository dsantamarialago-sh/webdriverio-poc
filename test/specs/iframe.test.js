const step1Page = require('../pageobjects/tbxoStep1');
const step2Page = require('../pageobjects/tbxoStep2');
const step3Page = require('../pageobjects/tbxoStep3');

describe('Iframe page', () => {

    it('Should fill iframe form', () => {
        step1Page.open();
        step1Page.isLoaded();
        step1Page.btnGoToStep2.click();

        step2Page.isLoaded();
        step2Page.btnGoToLogin.click();
        step2Page.waitForModalDisplayed();
        step2Page.login('eloy.gb4@evandti.com', 'ticketbis');        

        step3Page.isLoaded();
        step3Page.btnAmericanExpress.click();
    
        step3Page.iframe.waitForDisplayed();
        browser.switchToFrame(step3Page.iframe);
        step3Page.fillCCData('4111111111111111', '737');
        browser.pause(5000);
    });

});