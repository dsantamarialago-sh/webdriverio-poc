/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
     * Page Elements
     */

    get searchBox() {return $('.SearchBar > input')}    
    get jumbotron() {return $('.BrazeJumbotronCarousel')}

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`https://www.stubhubstage.com`);
    }

    isLoaded() {
        return this.assert.elementIsVisible(this.searchBox) && this.assert.elementIsVisible(this.jumbotron)
    }
}
