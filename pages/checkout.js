const { browser, element, by, ExpectedConditions } = require('protractor');

class Checkout {
    #summaryCheckout = element(by.xpath('//span[text()="Proceed to checkout"]'));
    #currentStep = element(by.css('.step_current'));
    #addressCheckout = element(by.name("processAddress"));
    #paymentCheckout = element(by.name("processCarrier"));
    #shippingTerms = element(by.id('cgv'));
    #wirePayment = element(by.xpath('//a[@title="Pay by bank wire"]'));
    #checkPayment = element(by.xpath('//a[@title="Pay by check."]'));
    #confirmOrderBtn = element(by.xpath('//span[text()="I confirm my order"]'));



    async goToAddress() {
        await browser.wait(ExpectedConditions.visibilityOf(this.#summaryCheckout), 10000);
        await this.#summaryCheckout.click();
    }

    async goToShipping() {
        await browser.wait(ExpectedConditions.visibilityOf(this.#addressCheckout), 10000);
        await this.#addressCheckout.click();
    }

    async goToPayment() {
        await browser.wait(ExpectedConditions.visibilityOf(this.#paymentCheckout), 10000);
        await this.#paymentCheckout.click();
    }

    async payByWire() {
        await browser.wait(ExpectedConditions.visibilityOf(this.#wirePayment), 10000);
        await this.#wirePayment.click();
    }

    async payByCheck() {
        await browser.wait(ExpectedConditions.visibilityOf(this.#checkPayment), 10000);
        await this.#checkPayment.click();
    }

    async confirmOrder() {
        await browser.wait(ExpectedConditions.visibilityOf(this.#confirmOrderBtn), 10000);
        await this.#confirmOrderBtn.click();
    }

    async agreeToShippingTerms() {
        await this.#shippingTerms.click();
    }

    async getCurrentStep() {
        await this.#currentStep.getText().then(txt => {
            return txt;
        });
    }
}



exports.Checkout = Checkout;