class GooglePage {
    /*******************/
    /** Page Elements **/
    /*******************/

    get inputSearch() {return $('input[name="q"]')};

    /******************/
    /** Page actions **/
    /******************/

    /**
    * Opens Home page
    */
    open() {
        return browser.url(`https://www.google.com`);
    }

    /*
    * Checks whether required elements are displayed
    */
    isLoaded() {
        this.inputSearch.waitForDisplayed({timeout:15000});
            
    }
}

module.exports = new GooglePage();
