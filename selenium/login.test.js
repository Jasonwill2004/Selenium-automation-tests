const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const TestReporter = require('./utils/TestReporter');
require('colors');

(async function loginTest() {
    const reporter = new TestReporter();
    let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options()).build();

    try {
        await driver.get('https://the-internet.herokuapp.com/login');

        await driver.findElement(By.id('username')).sendKeys('tomsmith');
        await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');
        await driver.findElement(By.css('button[type="submit"]')).click();

        let flash = await driver.wait(until.elementLocated(By.css('.flash.success')), 5000);
        let message = await flash.getText();

        if (message.includes('You logged into a secure area!')) {
            await reporter.logResult('Login Test', 'PASSED');
        } else {
            const screenshotPath = await reporter.captureScreenshot(driver, 'login-failure');
            await reporter.logResult('Login Test', 'FAILED', new Error('Login validation failed'), screenshotPath);
        }

    } catch (err) {
        const screenshotPath = await reporter.captureScreenshot(driver, 'login-error');
        await reporter.logResult('Login Test', 'ERROR', err, screenshotPath);
    } finally {
        await driver.quit();
    }
})();