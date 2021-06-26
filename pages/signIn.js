const { browser, element, by, ExpectedConditions } = require("protractor");

class SignIn {
    #emailInput = element(by.id("email"));
    #passInput = element(by.id("passwd"));
    #submitBtn = element(by.id("SubmitLogin"));

    async enterEmail(email = "dibofa8597@bbsaili.com") {
        await browser.wait(ExpectedConditions.visibilityOf(this.#emailInput), 10000)
        await this.#emailInput.sendKeys(email);
    }

    async enterPassword(passwd = "Pentest123#") {
        await browser.wait(ExpectedConditions.visibilityOf(this.#passInput), 10000)
        await this.#passInput.sendKeys(passwd);
    }

    async clickSubmitBtn() {
        await browser.wait(ExpectedConditions.visibilityOf(this.#submitBtn), 10000)
        await this.#submitBtn.click();
    }

}

exports.SignIn = SignIn;