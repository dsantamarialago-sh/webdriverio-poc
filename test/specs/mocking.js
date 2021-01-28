const eventsRecommendation = require('./mocks/eventsRecommendation');
const homePage = require('../pageobjects/HomePage');
const eventPage = require('../pageobjects/EventPage');

describe('testing mocking feature for home', () => {
  const mockResponse = (url, response) => {
    const mock = browser.mock(url);
    mock.respond(response);
  }
  it('API responses', () => {
    mockResponse('**/bfx/api/search/inventory/v2/listings?**', eventsRecommendation);
    eventPage.open();
    eventPage.isLoaded();
    for(let i = 0; i < eventsRecommendation.listing.length; i++){
      const section = eventPage.getListingName(i);
      const expectedSectionName = eventsRecommendation.listing[i].sectionName;
      expect(section).toHaveText(expectedSectionName);
    }
    browser.saveScreenshot('./screenshots/image-api-mock.png');
  })

  it('Mock resources', () => {
    mockResponse('**/home.**.css', './test/specs/mocks/cssMock.css');
    homePage.open();
    browser.saveScreenshot('./screenshots/image-resource-mock.png');
  })
});
