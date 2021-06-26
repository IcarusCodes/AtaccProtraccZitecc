const { element, by } = require("protractor");

class HomePage {
    signInBtn = element(by.linkText("Sign in"));
    tShirtsBtn = element(by.linkText("T-shirts"));
    dressesBtn = element(by.linkText("Dresses"));
}