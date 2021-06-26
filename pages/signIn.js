const { element, by } = require("protractor");

class SignIn {
    emailInput = element(by.id("email"));
    passInput = element(by.id("passwd"));
    submitBtn = element(by.id("SubmitLogin"));
}