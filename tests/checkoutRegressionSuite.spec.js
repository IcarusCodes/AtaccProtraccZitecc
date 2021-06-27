const { browser } = require("protractor");
const { SignIn } = require("../pages/signIn");
const { Products } = require("../pages/products");
const { Checkout } = require("../pages/checkout");
const { Utils } = require('../pages/utils')

const signIn = new SignIn();
const products = new Products();
const checkout = new Checkout();
const utils = new Utils();

describe("Cart Regression Suites", () => {

    beforeAll(async () => {
        browser.ignoreSynchronization = true;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
        await browser.driver.manage().window().maximize();
        await browser.get(utils.baseUrl);
        await signIn.signInAndVerify();
    });

    // it("Should complete a valid order using wire payment, for 3 orange M shirts.", async () => {
    //     await products.addProductToCart( 3, "M");
    //     await checkout.completeOrder("wire", 51.53);
    // });
    //
    // it("Should complete a valid order using check payment, for 5 L printed dresses.", async () => {
    //     await products.addProductToCart(5, "L","casual");
    //     await checkout.completeOrder("check", 132);
    // });
    //
    // it("Should complete a valid order using wire payment for 3 S shirts and 2 M evening dresses.", async () => {
    //     await products.addProductToCart(3, "S");
    //     await products.addProductToCart(2, "M","evening");
    //     await checkout.completeOrder("wire", 153.51);
    // })
    //
    //
    // it("Negative should try adding -5 T-Shirts to cart", async () => {
    //     await products.addProductToCart(-5, "L");
    //     await checkout.completeOrder("check", 84.55);
    // });

    it("Negative should remove the product from cart and try to proceed to checkout", async () => {
        await products.addProductToCart(4, "L");
        await checkout.removeProductFromCart();
        await checkout.isEmptyCartWarningDisplayed();
    });

    // it("Negative should proceed to checkout with an empty cart");

    // it("Negative should not be logged in");

});