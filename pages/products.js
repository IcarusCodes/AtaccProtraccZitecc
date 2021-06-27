const { browser, ExpectedConditions, $, element, by } = require("protractor");
const { Utils } = require('../pages/utils')

const utils = new Utils();

class Products {

    #shippingPrice = '2';

    #products = {
        "Tshirts": {
            "nav": element(by.linkText("T-SHIRTS")),
            "shortSleeve": {
                "locator": $('a[title="Faded Short Sleeve T-shirts"]'),
                "price": 16.51
            }
        },
        "Dresses": {
            "nav": element(by.linkText("DRESSES")),
            "casual": {
                "nav": element(by.linkText("CASUAL DRESSES")),
                "casualPrintedDress": {
                    "locator": element(by.xpath('//img[@title="Printed Dress"]')),
                    "price": 26.00
                }
            },
            "evening": {
                "nav": element(by.linkText("EVENING DRESSES")),
                "eveningPrintedDress": {
                    "locator": element(by.xpath('//img[@title="Printed Dress"]')),
                    "price": 50.99
                }
            }
        }
    }

    // Category Navigation
    #tShirtsBtn = element(by.linkText("T-SHIRTS"));


    // Locators
    #expandedView = element(by.xpath('//*[@id="center_column"]/ul/li/div/div[1]/div/a[1]/img'));
    #moreBtn = element(by.xpath('//a[@title="View"]'));
    #addToCart = element(by.xpath('//button[@name="Submit"]'));
    #proceed2Co = element(by.xpath('//a[@title="Proceed to checkout"]'))

    // Product customization
    #productQuantity = element(by.id('quantity_wanted'));
    #productSize = element(by.id('group_1'));
    #smallSize = element(by.xpath('//option[@title="S"]'));
    #mediumSize = element(by.xpath('//option[@title="M"]'));
    #largeSize = element(by.xpath('//option[@title="L"]'));


    async mouseOverAndClickMore() {
        // Hover over product in order to display more options
        await browser.actions().mouseMove(this.#expandedView).perform();
        // The "More" buttons should now be displayed
        expect(this.#moreBtn.isDisplayed()).toBeTruthy();
        await this.#moreBtn.click();
    }

    async changeProductQuantity(qty) {
        await this.#productQuantity.clear();
        await this.#productQuantity.sendKeys(qty);
    }

    async changeProductSize(size="S") {
        await this.#productSize.click();
        switch(size) {
            case "S":
                await this.#smallSize.click();
                break;
            case "M":
                await this.#mediumSize.click();
                break;
            case "L":
                await this.#largeSize.click();
                break;
        }
    }

    async addToCart() {
        await this.#addToCart.click();
    }

    async proceedToCheckout() {
        await browser.wait(
            ExpectedConditions.visibilityOf(this.#proceed2Co),
            utils.explicitWaitTime,
            "Could not proceed to checkout, element '#proceed2Co' not visibile."
        );
        await this.#proceed2Co.click();
    }

    async goToTshirts() {
        await this.#products['Tshirts']['nav'].click();
    }

    async goToDresses(type) {
        await this.#products['Dresses']['nav'].click();

        if (type === "casual") {
            await this.#products['Dresses']['casual']['nav'].click();
        } else if (type === "evening") {
            await this.#products['Dresses']['evening']['nav'].click();
        } else {
            console.log("Wrong type specified, defaulting to casual dresses.");
            await this.#products['Dresses']['casual']['nav'].click();
        }

    }

    async calculateExpectedPrice(product, qty) {

    }

    async addProductToCart(prod, qty, size, dressType) {
        switch (prod) {
            case "tshirt":
                await this.goToTshirts();
                break;
            case "dresses":
                await this.goToDresses(dressType)
                break;
            default:
                break;
        }
        await this.mouseOverAndClickMore();
        // @TODO await products.checkProductQuantityPrice(1);
        await this.changeProductQuantity(qty);
        // @TODO await products.checkProductQuantityPrice(3);
        await this.changeProductSize(size);
        await this.addToCart();
        await this.proceedToCheckout();
        // @TODO products.checkTotalPrice(3);
    }
}

exports.Products = Products;