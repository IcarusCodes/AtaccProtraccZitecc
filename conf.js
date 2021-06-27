let browser = require("protractor");
const jasmineReporters = require('jasmine-reporters');
const fs = require('fs-extra');

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // @TODO maybe set everything up into suites?
  // suites: {
  //   okspec: 'suites/ok_spec.js',
  //   okmany: ['suites/ok_spec.js', 'suites/ok_2_spec.js'],
  //   failingtest: 'suites/always_fail_spec.js'
  // },
  specs: ['tests/checkoutRegressionSuite.spec.js'],
  SELENIUM_PROMISE_MANAGER: false,
  onPrepare: function(){
    // Getting CLI report
    const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
    //Getting XML report

    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      filePrefix: './reports/guitest-xmloutput',
      savePath: '.'
    }));

    //Getting screenshots
    fs.emptyDir('screenshots/', function (err) {
      console.log(err);
    });

    jasmine.getEnv().addReporter({
      specDone: function(result) {
        if (result.status == 'failed') {
          browser.browser.driver.getCapabilities().then(function (caps) {
            let browserName = caps.get('browserName');
            browser.browser.takeScreenshot().then(function (png) {
              let stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName+ '.png');
              stream.write(new Buffer.from(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });
  },
  onComplete: function() {
    //Getting HTML report
    let browserName, browserVersion;
    let capsPromise = browser.browser.driver.getCapabilities();
    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('browserVersion');
      let platform = caps.get('platformName');
      let HTMLReport = require('protractor-html-reporter-2');
      let testConfig = {
          reportTitle: 'Protractor Test Execution Report',
          outputPath: './reports',
          outputFilename: 'ProtractorTestReport',
          screenshotPath: './screenshots',
          testBrowser: browserName,
          browserVersion: browserVersion,
          modifiedSuiteName: false,
          screenshotsOnlyOnFailure: true,
          testPlatform: platform
      };
      new HTMLReport().from('./reports/guitest-xmloutput.xml', testConfig);
    });
  }
}
