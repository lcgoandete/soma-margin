// const path = require('path');
const { Builder } = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

let driver = '';

const browser = async () => {
  if (!driver) {
    chrome.setDefaultService = new chrome.ServiceBuilder(chromedriver.path).build;
    const options = new chrome.Options();
    // options.headless();
    // options.addExtensions(path.join(__dirname, 'extension', 'captha.crx'));
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  }
  return driver;
};

module.exports = {
  browser,
};
