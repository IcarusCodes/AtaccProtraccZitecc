const { browser } = require("protractor");
const { HomePage } = require("../pages/homepage");
const { SignIn } = require("../pages/signIn");
const { Products } = require("../pages/products");
const { Checkout } = require("../pages/checkout");
const { Utils } = require('../pages/utils')

const homePage = new HomePage();
const signIn = new SignIn();
const products = new Products();
const checkout = new Checkout();
const utils = new Utils();

describe("Cart Regression Suites", () => {

    beforeAll(async () => {
        browser.ignoreSynchronization = true;
        await browser.driver.manage().window().maximize();
        await browser.get(homePage.baseUrl);
        await signIn.signInAndVerify();
    });

    it("Should complete a valid order using wire payment, for 3 orange M shirts.", async () => {
        await products.addProductToCart("tshirt", 3, "M");
        await checkout.completeOrder();
    });

    it("Should complete a valid order using check payment, for 5 L printed dresses.", async () => {
        await products.addProductToCart("dresses", 5, "L", "casual" );
        await checkout.completeOrder();
    });

    it("Should complete a valid order using wire payment for 3 S tshirts and 2 M evening dresses.", async() => {
        await products.addProductToCart("tshirt", 3, "S");
        await products.addProductToCart("dresses", 2, "M", "evening");
        await checkout.completeOrder();
    })

});