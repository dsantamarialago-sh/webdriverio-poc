const propsReader = require('properties-reader');
const homePage = require('../pageobjects/HomePage');

let metrics = {
    firstMeaningfulPaint: 0,
    firstInteractive: 0,
    speedIndex: 0
};
let score;

describe('SH home page', () => {
    before(() => {
        if (browser.enablePerformanceAudits) {
            browser.enablePerformanceAudits();
            metrics = browser.getMetrics();
            score = browser.getPerformanceScore();
        }
    });
    it('should render required components', () => {
       
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

    it('should not increase firstMeaningfulPaint limit', () => {
        expect(metrics.firstMeaningfulPaint < (3 * 1000)).toBe(true); // 3 seconds
    });
    
    it('should not increase firstInteractive limi', function () {
        expect(metrics.firstInteractive < (3 * 1000)).toBe(true); // 3 seconds
    });
    
    it('should not increase speedIndex limit', () => {
        expect(metrics.speedIndex < (4.2 * 1000)).toBe(true);
    });
    
    it('should have a minimum Lighthouse performance score', () => {
        if (score) {
            expect(score > 0.92).toBe(true);
        }
    });
});
