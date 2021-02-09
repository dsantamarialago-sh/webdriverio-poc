const propsReader = require('properties-reader');
const homePage = require('../pageobjects/HomePage');
const { addSeverity } = require('@wdio/allure-reporter').default;

describe('SH home page', () => {
    it('should render required components', () => {
        addSeverity("Critical");
        console.log(`>>> CURRENT DIR: ${process.cwd()}`);
        const propsEn = propsReader('./test/i18n/en-us/messages.properties');
        const propsEs = propsReader('./test/i18n/es-us/messages.properties');
        
        homePage.open();
        homePage.isLoaded();
        
        expect(homePage.header.logo).toBeDisplayed;
        expect(homePage.header.searchBox).toBeDisplayed;
        expect(homePage.jumbotron).toBeDisplayed;
        expect(homePage.footer.fanProtectLogo).toBeDisplayed;
        expect(homePage.footer.fanProtectLink).toHaveAttributeContaining('href', 'http://www.stubhub.com/promise/')

        const text = homePage.header.signInText.getText();
        console.log(`>>> TEXT: ${text}`);
       
        const expectedEnText = propsEn.get('Header.menu.my-profile');
        console.log(`>>> Expected EN: ${expectedEnText}`);
        
        const expectedEsText = propsEs.get('Header.menu.my-profile');           
        console.log(`>>> Expected ES: ${expectedEsText}`);

        browser.saveScreenshot('./screenshots/image.png');
        expect(homePage.header.signInText).toHaveText(expectedEnText);
        expect(homePage.header.signInText).not.toHaveText(expectedEsText);
    
    });
});