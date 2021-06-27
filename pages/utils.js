const fs = require('fs');
const {browser} = require("protractor");

class Utils {

    explicitWaitTime = 10000;
    baseUrl = "http://automationpractice.com/index.php";

    async takeScreenshot(filename) {
        let stream = fs.createWriteStream(`screenshots/${filename}_${await this.getPrettyDate()}.png`);
        await browser.takeScreenshot().then(function (png) {
            stream.write(new Buffer(png, 'base64'));
            stream.end();
        });
    }

    async scrollTo(x, y) {
        await browser.executeScript(`window.scrollTo(${x}, ${y});`);
    }

    async getPrettyDate() {
        let d = new Date().getTime();
        let date = new Date(parseInt(d));

        return date.toLocaleTimeString(Date.prototype.language, {
            hour: '2-digit',
            minute:'2-digit',
            second: '2-digit'
        });
    }
}

exports.Utils = Utils;