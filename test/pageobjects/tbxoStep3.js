class TbxoStep3 {

    /*******************/
    /** Page Elements **/
    /*******************/

    get btnAmericanExpress() {return $('[data-qa="medio-pago-logo-115"]')}; 

    // iframe
    get iframe() {return $('iframe[data-qa="frame-pago"]')};
    //get iframe() {return $('iframe#paymentIframe')};
    get iframeBody() {return $('#pageGetMissingData')};
    get inputCC() {return $('#F1009')};
    get inputCCV() {return $('#F1136')};


    /******************/
    /** Page actions **/
    /******************/

    /**
     * Check for required elements to be displayed
     */
    isLoaded(){
        this.btnAmericanExpress.waitForDisplayed({timeout: 15000});
    }

    /**
     * Waits for iframe to be displayed
     */
    iframeIsLoaded() {
        console.log(">>> Esperando a que cargue el iFrame...");
        browser.pause(5000);
        this.inputCC.waitForDisplayed({timeout: 30000});
    }

    /**
     * Fills iframe form
     */
    fillCCData(ccNumber, cvv) {
        this.iframeBody.waitForDisplayed();
        this.inputCC.setValue(ccNumber);
        this.inputCCV.setValue(cvv);
    }
}

module.exports = new TbxoStep3();