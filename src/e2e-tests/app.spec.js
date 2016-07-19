var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

// This is a page object, used to keep test code for the page cleaner
// Can be shared between tests
var AppView = function() {
  // create shortcuts to various page elements required by tests
  // Example:  this.loadButton = element(by.css('.load-button'))

  this.get = function(url) {
    browser.get(url)
  }
}

describe('the application', function() {
    var view

    beforeEach(function() {
        view = new AppView()
    })

    it('should have loaded', function() {
        view.get('http://localhost:8000/')
        var title = browser.getTitle()
        expect(title).to.eventually.equal('Angular 1.5 Typescript Seed')
    })

})
