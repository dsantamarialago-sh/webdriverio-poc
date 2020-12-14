class TbxoStep1 {

    /*******************/
    /** Page Elements **/
    /*******************/

    get btnGoToStep2() {return $('[data-qa="guardar"]')}; 

    /******************/
    /** Page actions **/
    /******************/

    /**
     * Opens login page
     * @param {*} redirectUrl Url to be redirected after successful login
     */
    open() {
        const url = `https://secure.stubhub.com.ar.qa.sh-env.net/checkout/buy/9403349`
        console.log(`>>> Navigating to ${url}`);
        return browser.url(url);
    }

    /**
     * Check for required elements to be displayed
     */
    isLoaded(){
        this.btnGoToStep2.waitForDisplayed({timeout:15000});
    }
}

module.exports = new TbxoStep1();