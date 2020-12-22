
const homePage = require('../pageobjects/HomePage');
const assert = require('assert');

describe('SH home page', () => {

    before(() => {
            browser.enablePerformanceAudits()
            browser.url('https://www.stubhubstage.com')
            metrics = browser.getMetrics()
            score = browser.getPerformanceScore()
     })


it('should render required components', () => {
        //homePage.open();
        homePage.isLoaded();
        
        expect(homePage.header.logo).toBeDisplayed;
        expect(homePage.header.searchBox).toBeDisplayed;
        expect(homePage.jumbotron).toBeDisplayed;
        expect(homePage.footer.fanProtectLogo).toBeDisplayed;
        expect(homePage.footer.fanProtectLink).toHaveAttributeContaining('href', 'http://www.stubhub.com/promise/');

        assert.ok(metrics.speedIndex < 150000) // check that speedIndex is below 1.5ms
        assert.ok(score >= .09) 

    });

    it('should not increase firstMeaningfulPaint limit', () => {
        expect(metrics.firstMeaningfulPaint < (3 * 1000)) // 3 seconds
    })

    it('should not increase firstInteractive limi', function () {
        expect(metrics.firstInteractive < (3 * 1000)) // 3 seconds
    })
    
    it('should not increase speedIndex limit', () => {
        expect(metrics.speedIndex < (4.2 * 1000))
    })
    
    it('should have a minimum Lighthouse performance score', () => {
        expect(score > 0.92)
    })


    after(() => {
        browser.disablePerformanceAudits();
        console.log(browser.getMetrics());
        console.log(browser.getDiagnostics());
        console.log(browser.getPerformanceScore());
    })


});