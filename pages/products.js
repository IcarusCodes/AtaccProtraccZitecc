const { browser, ExpectedConditions, $, element, by } = require("protractor");

class Products {
    #tShirtShortSleeve = $('a[title="Faded Short Sleeve T-shirts"]');
    #expandedView = element(by.xpath('//*[@id="center_column"]/ul/li/div/div[1]/div/a[1]/img'));
    #moreBtn = element(by.xpath('//a[@title="View"]'));
    #addToCart = element(by.xpath('//button[@name="Submit"]'));
    #proceed2Co = element(by.xpath('//a[@title="Proceed to checkout"]'))

    #productQuantity = element(by.id('quantity_wanted'));
    #productSize = element(by.id('group_1'));
    #smallSize = element(by.xpath('//option[@title="S"]'));
    #mediumSize = element(by.xpath('//option[@title="M"]'));
    #largeSize = element(by.xpath('//option[@title="L"]'));

    #productColorOrange = element(by.id('color_13'));
    #productColorBlue = element(by.id('color_14'));

    async goToShortSleeve() {
        await this.#tShirtShortSleeve.click();
    }

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

    async addProductToCart() {
        await this.#addToCart.click();
    }

    async proceedToCheckout() {
        await browser.wait(ExpectedConditions.visibilityOf(this.#proceed2Co), 10000);
        await this.#proceed2Co.click();
    }
}

exports.Products = Products;