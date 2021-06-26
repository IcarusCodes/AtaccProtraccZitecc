const { browser } = require("protractor");
const { HomePage } = require("../pages/homepage");
const { SignIn } = require("../pages/signIn");
const { Products } = require("../pages/products");

const homePage = new HomePage();
const signIn = new SignIn();
const products = new Products();

describe("Sign In and add checkout short sleeve tshirt", () => {

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

});