const Header = require('./modules/Header');
const Footer = require('./modules/Footer');

class HomePage {
    /*******************/
    /** Page Elements **/
    /*******************/

    get header() {return Header};
    get jumbotron() {return $('div.BrazeJumbotronCarousel__Slider')};
    get footer() {return Footer};

    /******************/
    /** Page actions **/
    /******************/

    /**
    * Opens Home page
    */
    open(domain) {
        return browser.url(`https://www.stubhub.`+domain);
    }

    /*
    * Checks whether required elements are displayed
    */
    isLoaded() {
        this.header.isLoaded();
        this.footer.isLoaded();
        //this.jumbotron.waitForDisplayed({timeout:15000});

    }
}

module.exports = new HomePage();
