const Header = require('./modules/Header');
const Footer = require('./modules/Footer');

class HomePage {
    /*******************/
    /** Page Elements **/
    /*******************/

    //get logo() {return $('a.logo__link')};
    //get searchBox() {return $('div.SearchBar__view > input')};
    get header() {return Header};
    get jumbotron() {return $('.BrazeJumbotronCarousel__Slider')};
    get footer() {return Footer};

    /******************/
    /** Page actions **/
    /******************/

    /**
    * Opens Home page
    */
    open() {
        return browser.url(`https://www.stubhubstage.com`);
    }

    /*
    * Checks whether required elements are displayed
    */
    isLoaded() {
        return expect(this.header.logo).toBeDisplayed 
            && expect(this.header.searchBox).toBeDisplayed
            && expect(this.jumbotron).toBeDisplayed
            && expect(this.footer.isLoaded());
            
    }
}

module.exports = new HomePage();
