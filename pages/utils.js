const fs = require('fs');
const {browser} = require("protractor");

class Utils {

    async takeScreenshot(filename) {
        let stream = fs.createWriteStream(`screenshots/${filename}.png`);
        browser.takeScreenshot().then(function (png) {
            stream.write(new Buffer(png, 'base64'));
            stream.end();
        });
    }

    async scrollTo() {
        // @TODO
    }
}

exports.Utils = Utils;