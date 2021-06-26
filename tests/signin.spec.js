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
        await products.changeProductQuantity(3);
        await products.changeProductSize("M");
        await products.addProductToCart();
        await products.proceedToCheckout();
    });

    it("Should successfully complete the order.", async () => {
        await checkout.goToAddress();
        await checkout.goToShipping();
        await checkout.agreeToShippingTerms();
        await checkout.goToPayment();
        await checkout.payByWire();
        await checkout.confirmOrder();
        await browser.sleep(12312321);
    });
});