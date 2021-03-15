const homePage = require('../pageobjects/HomePage');
const dataProviders = require("../dataproviders/dataProviders");

describe('SH home page', () => {
    domainList = dataProviders.domainListProvider();
    var using = require('jasmine-data-provider');
    using(domainList, function(data){
        it('should render required components', () => {
            homePage.open(data.d);
            homePage.isLoaded();
            //sleep(15000);
            expect(homePage.header.logo.isDisplayed()).toBe(true);
            expect(homePage.header.searchBox.isDisplayed()).toBe(true);
            expect(homePage.jumbotron.isDisplayed()).toBe(true);
            expect(homePage.footer.fanProtectLogo.isDisplayed()).toBe(true);
            expect(homePage.footer.fanProtectLink).toHaveAttributeContaining('href', 'http://www.stubhub.'+data.d+'/promise/')
        });
    });
});
