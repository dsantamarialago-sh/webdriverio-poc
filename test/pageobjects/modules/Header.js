class Header {
    /*******************/
    /** Page Elements **/
    /*******************/

    get logo() {return $('a.logo__link')};
    get searchBox() {return $('div.SearchBar__view > input')};
    get signInText() {return $('div.mh__nav-menu > a > span.mh__nav-menu-header-text.menu__header-text-sign-in')};

    /******************/
    /** Page actions **/
    /******************/

    /*
    * Checks whether required elements are displayed
    */
    isLoaded() {
        this.logo.waitForDisplayed;
        this.searchBox.waitForDisplayed;
    }
}

module.exports = new Header();