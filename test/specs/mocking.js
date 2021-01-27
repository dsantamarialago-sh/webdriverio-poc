const eventsRecommendation = require('./mocks/eventsRecommendation');
const homePage = require('../pageobjects/HomePage');

describe('testing mocking feature for home', () => {
  const mockResponse = (url, response) => {
    const mock = browser.mock(url);
    mock.respond(response);
  }
  it('API responses', () => {
    mockResponse('**/bfx/api/search/catalog/events/v3/eventGroupings**', eventsRecommendation);
    homePage.open();
    $('.genre-module--entity-list-container').waitForExist();
    browser.saveScreenshot('./screenshots/image-api-mock.png');
  })

  it('Mock resources', () => {
    mockResponse('**/home.**.css', './test/specs/mocks/cssMock.css');
    homePage.open();
    browser.saveScreenshot('./screenshots/image-resource-mock.png');
  })
});
