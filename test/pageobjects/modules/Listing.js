class Listing {
  /*******************/
  /** Page Elements **/
  /*******************/

  get listing() {return $('.RoyalTicketList__container')};
  getListingElement(index) {return $(`div.RoyalTicketListPanel.RoyalTicketListPanel__${index}`)};
  getListingName(index) {return $(`.RoyalTicketListPanel.RoyalTicketListPanel__${index} .SectionRowSeat__sectionTitle.RoyalTicketListPanel__SectionName`)}

  isLoaded() {
    return this.listing.waitForDisplayed();
  }
}

module.exports = new Listing();