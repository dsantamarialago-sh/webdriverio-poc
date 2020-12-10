class Footer {
    /*******************/
    /** Page Elements **/
    /*******************/

    get fanProtectLink() {return $('div.fan-protect > a')}
    get fanProtectLogo() {return $('div.fan-protect-img')};
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
        return expect(this.fanProtectLink).toBeDisplayed 
            && expect(this.fanProtectLogo).toBeDisplayed;
    }
}

module.exports = new Footer();