class Footer {
    /*******************/
    /** Page Elements **/
    /*******************/

    get fanProtectLink() {return $('div.fan-protect > a')}
    get fanProtectLogo() {return $('div.fan-protect-img')};

    /******************/
    /** Page actions **/
    /******************/

    /*
    * Checks whether required elements are displayed
    */
    isLoaded() {
        this.fanProtectLink.waitForDisplayed;
        this.fanProtectLogo.waitForDisplayed;
    }
}

module.exports = new Footer();