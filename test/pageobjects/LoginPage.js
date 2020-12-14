class LoginPage { 
    /*******************/
    /** Page Elements **/
    /*******************/

    get inputUsername () { return $('[name="email"]') }
    get inputPassword () { return $('[name="new-password"]') }
    get btnSubmit () { return $('button[type="submit"]') }


    /******************/
    /** Page actions **/
    /******************/

    /**
     * Opens login page
     * @param {*} redirectUrl Url to be redirected after successful login
     */
    open(redirectUrl){
        const url = `https://www.stubhubstage.com/login?redirect=${redirectUrl}`
        console.log(`>>> Navigating to ${url}`);
        return browser.url(url);
    }

    /**
     * Opens login page in new tab
     * @param {*} redirectUrl Url to be redirected after successful login
     */
    openInNewTab(redirectUrl){
        const url = `https://www.stubhubstage.com/login?redirect=${redirectUrl}`;
        console.log(`>>> Navigating to ${url}`);
        browser.newWindow(url);   
        browser.pause(2000);    
    }

    /**
     * Performs login
     */
    login (username, password) {
        this.inputUsername.setValue(username);
        this.inputPassword.setValue(password);
        this.btnSubmit.click(); 
    }

    /**
     * Performs login
     * @param {*} username User email
     * @param {*} password User pass
     */
    isLoaded(){
        this.inputPassword.waitForDisplayed({timeout:15000});
        this.inputUsername.waitForDisplayed();
    }
}

module.exports = new LoginPage();
