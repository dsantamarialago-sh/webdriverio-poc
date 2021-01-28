const Listing = require('./modules/Listing');

class EventPage {
  /*******************/
  /** Page Elements **/
  /*******************/

  get listing() { return Listing};

  /******************/
  /** Page actions **/
  /******************/

  /**
  * Opens Home page
  */
  open() {
      return browser.url(`https://www.stubhubstage.es/wicked-san-francisco-san-francisco-tickets-7-29-2021/event/105740119/`);
  }

  /*
  * Checks whether required elements are displayed
  */
  isLoaded() {
      this.listing.isLoaded();
  }

  getListingName(index) {
    return this.listing.getListingName(index);
  }
}

module.exports = new EventPage();
