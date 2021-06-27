const { $, element, by } = require("protractor");

class HomePage {
    #signInBtn = element(by.linkText("Sign in"));
    #tShirtsBtn = element(by.linkText("T-SHIRTS"));
    #dressesBtn = element(by.linkText("Dresses"));
    #dresses = $('a[title="Dresses"]');
    #signOut = $('a[title="Log me out"]');

    baseUrl = "http://automationpractice.com/index.php";
    waitTime = 10000;

    async goToLogin() {
        await this.#signInBtn.click();
    }

    async goToTshirts() {
        await this.#tShirtsBtn.click();
    }

    async isSignOutDisplayed() {
        expect(await this.#signOut.isDisplayed()).toBe(true, "The login failed.");
    }

}

exports.HomePage = HomePage;