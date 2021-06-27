const { browser, element, by, ExpectedConditions } = require('protractor');
const { Utils } = require('../pages/utils')
const utils = new Utils();

class Checkout {
    #summaryCheckout = element(by.xpath('//span[text()="Proceed to checkout"]'));
    #currentStep = element(by.css('.step_current'));
    #addressCheckout = element(by.name("processAddress"));
    #paymentCheckout = element(by.name("processCarrier"));
    #shippingTerms = element(by.id('cgv'));
    #wirePayment = element(by.xpath('//a[@title="Pay by bank wire"]'));
    #checkPayment = element(by.xpath('//a[@title="Pay by check."]'));
    #confirmOrderBtn = element(by.xpath('//span[text()="I confirm my order"]'));

    #totalPrice = element(by.id('total_price'));
    #totalProductPrice = element(by.id('total_product'));
    #totalShipping = element(by.id('total_shipping'));


    async goToAddress() {
        await browser.wait(
            ExpectedConditions.visibilityOf(this.#summaryCheckout),
            10000,
            "Could not find #summaryCheckout => could not proceed to checkout."
        );
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

    async calculateTotalPrice() {

        let totalProductsPrice = parseFloat(await this.#totalProductPrice.getText().then(txt => {
                return txt.replace('$', '');
            })
        );
        let totalShippingPrice = parseFloat(await this.#totalShipping.getText().then(txt => {
                txt.replace('$', '');
            })
        );
        let totalPrice = parseFloat(await this.#totalPrice.getText().then(txt => {
                txt.replace('$', '');
            })
        );

        expect(totalProductsPrice + totalShippingPrice).toEqual(totalPrice);
    }

    async completeOrder(paymentType) {
        await this.goToAddress();
        await this.goToShipping();
        await this.agreeToShippingTerms();
        await this.goToPayment();
        await utils.takeScreenshot("Cart - Products Overview");
        await this.calculateTotalPrice();
        if (paymentType === "wire") {
            await this.payByWire()
        } else if(paymentType === "check") {
            await this.payByCheck()
        } else {
            console.log("Wrong payment type specified, defaulting to wire.");
            await this.payByWire()
        }
        await this.confirmOrder();
        await utils.takeScreenshot("Cart - Order Complete")
    }

}



exports.Checkout = Checkout;