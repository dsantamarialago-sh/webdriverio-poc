class Header {
    /*******************/
    /** Page Elements **/
    /*******************/

    get logo() {return $('a.logo__link')};
    get searchBox() {return $('div.SearchBar__view > input')};

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
        return expect(this.logo).toBeDisplayed 
            && expect(this.jumbotron).toBeDisplayed 
            && expect(this.searchBox).toBeDisplayed;
    }
}

module.exports = new Header();