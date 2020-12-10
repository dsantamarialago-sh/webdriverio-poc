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
        return expect(this.fanProtectLink).toBeDisplayed 
            && expect(this.fanProtectLogo).toBeDisplayed;
    }
}

module.exports = new Footer();