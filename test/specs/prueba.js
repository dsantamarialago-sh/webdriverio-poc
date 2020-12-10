const homePage = require('../pageobjects/HomePage');

describe('SH home page', () => {
    it('should render required components', () => {
        homePage.open();
        homePage.isLoaded();
    });
});