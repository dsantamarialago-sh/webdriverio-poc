const homePage = require('../pageobjects/HomePage');
const loginPage = require('../pageobjects/LoginPage.js')

describe('SH home page', () => {

    it('should render required components', () => {
        homePage.open();
        homePage.isLoaded();
        
        expect(homePage.header.logo).toBeDisplayed;
        expect(homePage.header.searchBox).toBeDisplayed;
        expect(homePage.jumbotron).toBeDisplayed;
        expect(homePage.footer.fanProtectLogo).toBeDisplayed;
        expect(homePage.footer.fanProtectLink).toHaveAttributeContaining('href', 'http://www.stubhub.com/promise/')
    });

    it('should open SH home page and another tab with SH Login page', () => {
        homePage.open();
        homePage.isLoaded();
        //const initialTab = browser.getWindowHandle();

        loginPage.openInNewTab(browser.getUrl());
        const tabs = browser.getWindowHandles();
        console.log(`>>> TABS: ${tabs[1]}`);

        browser.switchToWindow(tabs[1]);

        loginPage.isLoaded();
        loginPage.login('api_uk_sell_buyer20@testmail.com', 'Password');
        browser.pause(5000);
        
        browser.switchToWindow(tabs[0]);
        browser.refresh();
    });
});