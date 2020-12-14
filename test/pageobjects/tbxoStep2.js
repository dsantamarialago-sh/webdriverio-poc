class TbxoStep2 {

    /*******************/
    /** Page Elements **/
    /*******************/

    get btnGoToLogin() {return $('[data-qa="link-login"]')}; 

    // Modal login
    get inputEmail() {return $('[data-qa="modal-login-email"]')};
    get inputPass() {return $('[data-qa="modal-login-password"]')};
    get btnLogin() {return $('#login-btn-submit')};
    

    /******************/
    /** Page actions **/
    /******************/

    /**
     * Check for required elements to be displayed
     */
    isLoaded(){
        this.btnGoToLogin.waitForDisplayed({timeout:15000});
    }

    /**
     * Performs login
     * @param {*} username User email
     * @param {*} password User pass
     */
    login (username, password) {
        //browser.debug();
        this.inputEmail.setValue(username);
        this.inputPass.setValue(password);
        this.btnLogin.click(); 
    }

    /**
     * Waits for login modal to be displayed
     */
    waitForModalDisplayed() {        
        this.inputEmail.waitForDisplayed();
        this.inputPass.waitForDisplayed();
        this.btnLogin.waitForDisplayed();
    }
}

module.exports = new TbxoStep2();