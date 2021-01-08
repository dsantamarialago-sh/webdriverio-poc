const homePage = require('../pageobjects/HomePage');
const dataProviders = require("../dataproviders/dataProviders");

describe('SH home page', () => {
    domainList = dataProviders.domainListProvider();
    var using = require('jasmine-data-provider');
    using(domainList, function(data){
        it('should render required components', () => {
            homePage.open(data.d);
            homePage.isLoaded();
            
            expect(homePage.header.logo).toBeDisplayed;
            expect(homePage.header.searchBox).toBeDisplayed;
            expect(homePage.jumbotron).toBeDisplayed;
            expect(homePage.footer.fanProtectLogo).toBeDisplayed;
            expect(homePage.footer.fanProtectLink).toHaveAttributeContaining('href', 'http://www.stubhub.'+data.d+'/promise/')
        });
    });        
});