const { browser } = require("protractor");
const { HomePage } = require("../pages/homepage");
const { SignIn } = require("../pages/signIn");
const { Products } = require("../pages/products");
const { Checkout } = require("../pages/checkout");

const homePage = new HomePage();
const signIn = new SignIn();
const products = new Products();
const checkout = new Checkout();

describe("Complete a valid order using wire payment, for 3 orange M shirts.", () => {

    beforeAll(async () => {
        browser.ignoreSynchronization = true;
        await browser.driver.manage().window().maximize();
        await browser.get(homePage.baseUrl);
    });

    it("Should Sign In", async () => {
        await homePage.goToLogin();
        await signIn.enterEmail();
        await signIn.enterPassword();
        await signIn.clickSubmitBtn();

        await homePage.isSignOutDisplayed();
    });

    it("Should add 3 orange M Shirts to the cart", async () => {
        await homePage.goToTshirts();
        await products.mouseOverAndClickMore();
        // @TODO await products.checkProductQuantityPrice(1);
        await products.changeProductQuantity(3);
        // @TODO await products.checkProductQuantityPrice(3);
        await products.changeProductSize("M");
        await products.addProductToCart();
        await products.proceedToCheckout();
        // @TODO products.checkTotalPrice(3);
    });

    it("Should successfully complete the order.", async () => {
        // A price check could've been done here, but I have decided to do it in the final checkout step instead.
        await checkout.goToAddress();
        await checkout.goToShipping();
        // @TODO await checkout.getShippingPrice();
        await checkout.agreeToShippingTerms();
        await checkout.goToPayment();
        // @TODO homepage.screenshot
        // @TODO await checkout.getTotalProductsPrice
        // @TODO await checkout.getTotalShippingPrice
        // @TODO await checkout.getTotalPrice
        await checkout.payByWire();
        await checkout.confirmOrder();
        // @TODO homepage.screenshot
    });
});