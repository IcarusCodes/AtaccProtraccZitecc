const { browser, ExpectedConditions, $, element, by } = require("protractor");
const { Utils } = require('../pages/utils')

const utils = new Utils();

class Products {

    // This should be its own class eventually / a db would be better / or a separate json data file.
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

    // Locators
    #expandedView = element(by.xpath('//*[@id="center_column"]/ul/li/div/div[1]/div/a[1]/img'));
    #moreBtn = element(by.xpath('//a[@title="View"]'));
    #addToCartBtn = element(by.xpath('//button[@name="Submit"]'));
    #proceed2CoBtn = element(by.xpath('//a[@title="Proceed to checkout"]'));

    // Product customization
    #productQuantityField = element(by.id('quantity_wanted'));
    #productSizeDropdown = element(by.id('group_1'));
    #smallSizeBtn = element(by.xpath('//option[@title="S"]'));
    #mediumSizeBtn = element(by.xpath('//option[@title="M"]'));
    #largeSizeBtn = element(by.xpath('//option[@title="L"]'));


    async mouseOverAndClickMore() {
        // Hover over product in order to display more options
        await browser.actions().mouseMove(this.#expandedView).perform();
        // The "More" buttons should now be displayed
        expect(this.#moreBtn.isDisplayed()).toBeTruthy();
        await this.#moreBtn.click();
    }

    async changeProductQuantity(qty) {
        await this.#productQuantityField.clear();
        await this.#productQuantityField.sendKeys(qty);
    }

    async changeProductSize(size="S") {
        await this.#productSizeDropdown.click();
        switch(size) {
            case "S":
                await this.#smallSizeBtn.click();
                break;
            case "M":
                await this.#mediumSizeBtn.click();
                break;
            case "L":
                await this.#largeSizeBtn.click();
                break;
        }
    }

    async addToCart() {
        await this.#addToCartBtn.click();
    }

    async proceedToCheckout() {
        await browser.wait(
            ExpectedConditions.visibilityOf(this.#proceed2CoBtn),
            utils.explicitWaitTime,
            "Could not proceed to checkout, element '#proceed2Co' not visibile."
        );
        await this.#proceed2CoBtn.click();
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
            // This will be removed when we also implement summer dresses
            console.log("Wrong type specified, defaulting to casual dresses.");
            await this.#products['Dresses']['casual']['nav'].click();
        }
    }

    async navigateToProductCategory(prodType) {
        prodType === "" ? await this.goToTshirts() : await this.goToDresses(prodType)
    }

    // Main flow
    async addProductToCart(qty, size, prodType="") {
        await this.navigateToProductCategory(prodType);
        await this.mouseOverAndClickMore();
        await this.changeProductQuantity(qty);
        await this.changeProductSize(size);
        await this.addToCart();
        await this.proceedToCheckout();
    }
}

exports.Products = Products;