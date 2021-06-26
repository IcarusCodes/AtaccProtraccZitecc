describe('Protractor Test', function() {
  it('should have a title', function() {
    browser.ignoreSynchronization = true; // Because the application doesn't use angular
    browser.get('http://automationpractice.com/index.php');

    expect(browser.getTitle()).toEqual('My Store');
  });
});