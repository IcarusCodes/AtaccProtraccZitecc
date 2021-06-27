const { browser, element, by, ExpectedConditions } = require('protractor');
const { Utils } = require('../pages/utils')
const utils = new Utils();

class Checkout {
    // Cart steps
    #summaryCheckoutStep = element(by.xpath('//span[text()="Proceed to checkout"]'));
    #addressCheckoutStep = element(by.name("processAddress"));
    #paymentCheckoutStep = element(by.name("processCarrier"));

    #shippingTermsCheckbox = element(by.id('cgv'));
    #wirePaymentBtn = element(by.xpath('//a[@title="Pay by bank wire"]'));
    #checkPaymentBtn = element(by.xpath('//a[@title="Pay by check."]'));
    #confirmOrderBtn = element(by.xpath('//span[text()="I confirm my order"]'));
    #removeProductBtn = element(by.xpath('//a[@title="Delete"]'));
    #emptyShoppingCartWarning = element(by.xpath('//p[@class="alert alert-warning"]'));
    #shoppingCartBtn = element(by.xpath('//a[@title="View my shopping cart"]'));

    #totalPriceValue = element(by.id('total_price'));
    #totalProductPriceValue = element(by.id('total_product'));
    #totalShippingValue = element(by.id('total_shipping'));


    // Navigate to the address step of the cart
    async goToAddress() {
        await browser.wait(
            ExpectedConditions.visibilityOf(this.#summaryCheckoutStep),
            utils.explicitWaitTime,
            "Could not find #summaryCheckoutStep => could not proceed to checkout."
        );
        await this.#summaryCheckoutStep.click();
    }

    // Go to shopping cart
    async goToShoppingCart() {
        await this.#shoppingCartBtn.click()
    }

    // Navigate to the shipping step of the cart
    async goToShipping() {
        await browser.wait(
            ExpectedConditions.visibilityOf(this.#addressCheckoutStep),
            utils.explicitWaitTime,
            "Could not find #addressCheckout => could not proceed to shipping."
        );
        await this.#addressCheckoutStep.click();
    }

    // Navigate to the payment step of the cart
    async goToPayment() {
        await browser.wait(
            ExpectedConditions.visibilityOf(this.#paymentCheckoutStep),
            utils.explicitWaitTime,
            "Could not find #paymentCheckout => could not proceed to payment."
        );
        await this.#paymentCheckoutStep.click();
    }

    async removeProductFromCart() {
        await this.#removeProductBtn.click()
    }

    // Verify that the empty cart warning is displayed and has the valid message
    async isEmptyCartWarningDisplayed() {
        await browser.wait(
            ExpectedConditions.visibilityOf(this.#emptyShoppingCartWarning),
            utils.explicitWaitTime,
            "The error #emptyShoppingCartWarning was not properly displayed."
        ).then(async(present) => {
            if (present) {
                await this.#emptyShoppingCartWarning.getText().then(txt =>
                    expect(txt).toEqual("Your shopping cart is empty.")
                ).catch(err => {
                    console.log("Caught an error boss ", err)
                })
            } else {
                console.log("The error #emptyShoppingCartWarning was not properly displayed.")
            }
        })
    }

    // Select wire payment method
    async payByWire() {
        await browser.wait(
            ExpectedConditions.visibilityOf(this.#wirePaymentBtn),
            utils.explicitWaitTime,
            "Could not find #wirePayment."
        );
        await this.#wirePaymentBtn.click();
    }

    // Select check payment method
    async payByCheck() {
        await browser.wait(
            ExpectedConditions.visibilityOf(this.#checkPaymentBtn),
            utils.explicitWaitTime,
            "Could not find #checkPayment"
        );
        await this.#checkPaymentBtn.click();
    }

    // Place the order by confirming it
    async confirmOrder() {
        await browser.wait(
            ExpectedConditions.visibilityOf(this.#confirmOrderBtn),
            utils.explicitWaitTime,
            "Could not find the #confirmOrderBtn."
        );
        await this.#confirmOrderBtn.click();
    }

    // Agree to the shipping terms and conditions
    async agreeToShippingTerms() {
        await this.#shippingTermsCheckbox.click();
    }

    // Grab the price of all products added to cart and make sure the total is properly calculated
    async calculateTotalPrice(expectedPrice) {

        let totalProductsPrice = parseFloat(await this.#totalProductPriceValue.getText().then(txt => {
                return txt.replace('$', '');
            })
        );
        let totalShippingPrice = parseFloat(await this.#totalShippingValue.getText().then(txt => {
                return txt.replace('$', '');
            })
        );
        let totalPrice = parseFloat(await this.#totalPriceValue.getText().then(txt => {
                return txt.replace('$', '');
            })
        );

        expect(totalProductsPrice + totalShippingPrice).toEqual(totalPrice);
        expect(totalPrice).toEqual(expectedPrice)
    }


    async shouldAgreeShippingTerms(shippingTerms) {
        shippingTerms === true ? await this.agreeToShippingTerms() : await this.dontAgreeToShippingTerms()
    }

    async determinePaymentTypeAndSelect(paymentType) {
        // If the paymentType is check -> pay by check, for any other value pay by wire
        paymentType === "check" ? await this.payByCheck() : await this.payByWire()
    }

    /*
        paymentType - could be check or wire, although if not specified the default will be wire;
        expectedPrice - the total price of our cart we want to verify
     */
    async completeOrder(paymentType, expectedPrice) {
        await this.goToAddress();
        await this.goToShipping();
        await this.agreeToShippingTerms()
        await this.goToPayment();
        await utils.scrollTo(0, 500);
        await utils.takeScreenshot("Cart - Products Overview");
        await this.calculateTotalPrice(expectedPrice);
        await this.determinePaymentTypeAndSelect(paymentType);
        await this.confirmOrder();
        await utils.takeScreenshot("Cart - Order Complete")
    }
}

exports.Checkout = Checkout;