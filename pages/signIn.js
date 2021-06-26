const { element, by } = require("protractor");

class SignIn {
    #emailInput = element(by.id("email"));
    #passInput = element(by.id("passwd"));
    #submitBtn = element(by.id("SubmitLogin"));

    async enterEmail(email = "dibofa8597@bbsaili.com") {
        await this.#emailInput.sendKeys(email);
    }

    async enterPassword(passwd = "Pentest123#") {
        await this.#passInput.sendKeys(passwd);
    }

    async clickSubmitBtn() {
        await this.#submitBtn.click();
    }

}

exports.SignIn = SignIn;