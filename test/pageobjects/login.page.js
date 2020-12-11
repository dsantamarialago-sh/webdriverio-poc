class LoginPage { 
    /*******************/
    /** Page Elements **/
    /*******************/

    get inputUsername () { return $('#username') }
    get inputPassword () { return $('#password') }
    get btnSubmit () { return $('button[type="submit"]') }


    /******************/
    /** Page actions **/
    /******************/

    /**
     * Performs login
     */
    login (username, password) {
        this.inputUsername.setValue(username);
        this.inputPassword.setValue(password);
        this.btnSubmit.click(); 
    }

}

module.exports = new LoginPage();
