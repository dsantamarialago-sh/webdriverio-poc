const propsReader = require('properties-reader');
const homePage = require('../pageobjects/HomePage');
const i18n = require('../i18n/i18n');

describe('SH home page', () => {
    it('should render required components', () => {
        console.log(`>>> CURRENT DIR: ${process.cwd()}`);
        
        const currentLocale = 'en-US';
        
        homePage.open();
        homePage.isLoaded();
        
        expect(homePage.header.logo).toBeDisplayed;
        expect(homePage.header.searchBox).toBeDisplayed;
        expect(homePage.jumbotron).toBeDisplayed;
        expect(homePage.footer.fanProtectLogo).toBeDisplayed;
        expect(homePage.footer.fanProtectLink).toHaveAttributeContaining('href', 'http://www.stubhub.com/promise/')

        const text = homePage.header.signInText.getText();
        console.log(`>>> TEXT: ${text}`);

        Object.keys(i18n).forEach((key) => {
            const value = i18n[key].get('Header.menu.my-profile');
            if (key === currentLocale) {
                expect(homePage.header.signInText).toHaveText(value);
            }
            else {
                expect(homePage.header.signInText).not.toHaveText(value);
            }
        });
        browser.saveScreenshot('./screenshots/image.png');
    });
});