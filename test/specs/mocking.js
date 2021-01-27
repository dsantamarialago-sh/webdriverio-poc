const eventsRecommendation = require('./mocks/eventsRecommendation');
const homePage = require('../pageobjects/HomePage');

describe('testing mocking feature for home', () => {
  it('API responses', () => {
    const mock = browser.mock('**/bfx/api/search/catalog/events/v3/eventGroupings**', {
      method: 'get'
    });
    mock.respond(eventsRecommendation);
    homePage.open();
    $('.genre-module--entity-list-container').waitForExist();
    browser.saveScreenshot('./screenshots/image-api-mock.png');
  })
});
