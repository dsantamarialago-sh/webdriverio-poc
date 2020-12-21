
const googlePage = require('../pageobjects/GooglePage');

describe('Google home page', () => {
    it('render page', () => {
        googlePage.open();
        googlePage.isLoaded();
        browser.debug();
    });
});