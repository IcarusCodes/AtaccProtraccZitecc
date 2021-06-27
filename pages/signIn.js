const { browser, element, by, ExpectedConditions } = require("protractor");
const { Utils } = require('../pages/utils');

const utils = new Utils();

class SignIn {
    #emailInput = element(by.id("email"));
    #passInput = element(by.id("passwd"));
    #submitBtn = element(by.id("SubmitLogin"));
    #signInBtn = element(by.linkText("Sign in"));
    #signOutBtn = $('a[title="Log me out"]');

    async enterEmail(email = "dibofa8597@bbsaili.com") {
        await browser.wait(
            ExpectedConditions.visibilityOf(this.#emailInput),
            utils.explicitWaitTime,
            "The email input field #emailInput was not visible."
        );
        await this.#emailInput.sendKeys(email);
    }

    async enterPassword(passwd = "Pentest123#") {
        await browser.wait(
            ExpectedConditions.visibilityOf(this.#passInput),
            utils.explicitWaitTime,
            "The password input field #passInput was not visible."
        );
        await this.#passInput.sendKeys(passwd);
    }

    async clickSubmitBtn() {
        await browser.wait(
            ExpectedConditions.visibilityOf(this.#submitBtn),
            utils.explicitWaitTime,
            "The submit login button #submitBtn was not visible."
        );
        await this.#submitBtn.click();
    }

    async goToLogin() {
        await this.#signInBtn.click();
    }

    async isSignOutDisplayed() {
        expect(await this.#signOutBtn.isDisplayed()).toBe(true, "The login failed.");
    }

    async signInAndVerify(email, pass) {
        await this.goToLogin();
        await this.enterEmail(email);
        await this.enterPassword(pass);
        await this.clickSubmitBtn();

        await this.isSignOutDisplayed();
    }

}

exports.SignIn = SignIn;