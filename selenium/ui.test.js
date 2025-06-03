const { Builder, By, Key, until } = require('selenium-webdriver');
const TestReporter = require('./utils/TestReporter');
const fs = require('fs');
const path = require('path');
require('colors');

async function removeAds(driver) {
  try {
    // Remove ad iframes and overlays
    await driver.executeScript(`
      const adFrames = document.querySelectorAll('iframe[id*="google_ads"]');
      adFrames.forEach(frame => frame.remove());
      const adDivs = document.querySelectorAll('div[id*="google_ads"]');
      adDivs.forEach(div => div.remove());
    `);
  } catch (err) {
    console.log('Warning: Could not remove ads:', err.message);
  }
}

(async function uiTest() {
    const reporter = new TestReporter();
    let driver = await new Builder().forBrowser('firefox').build();
    const startTime = Date.now();

    try {
        await driver.get('https://demoqa.com/automation-practice-form');
        await removeAds(driver);

        // Fill form fields
        await driver.findElement(By.id('firstName')).sendKeys('John');
        await driver.findElement(By.id('lastName')).sendKeys('Doe');
        await driver.findElement(By.id('userEmail')).sendKeys('john.doe@example.com');
        await driver.sleep(500);
        await driver.findElement(By.xpath("//label[text()='Male']")).click();
        await driver.findElement(By.id('userNumber')).sendKeys('1234567890');
        await driver.findElement(By.xpath("//label[text()='Reading']")).click();
        await driver.findElement(By.xpath("//label[text()='Music']")).click();

        // Select state and city
        await driver.executeScript("arguments[0].scrollIntoView()", await driver.findElement(By.id("state")));
        await driver.findElement(By.id('state')).click();
        await driver.findElement(By.xpath("//div[text()='NCR']")).click();
        await driver.findElement(By.id('city')).click();
        await driver.findElement(By.xpath("//div[text()='Delhi']")).click();

        // Submit form
        await driver.findElement(By.id('submit')).click();
        
        // Wait for and verify modal
        await driver.wait(until.elementLocated(By.id('example-modal-sizes-title-lg')), 5000);
        const modalTitle = await driver.findElement(By.id('example-modal-sizes-title-lg')).getText();
        const executionTime = Date.now() - startTime;

        if (modalTitle === 'Thanks for submitting the form') {
            await reporter.logResult('UI Form Test', 'PASSED', executionTime, null, null, {
                formData: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    gender: 'Male',
                    mobile: '1234567890',
                    hobbies: ['Reading', 'Music'],
                    state: 'NCR',
                    city: 'Delhi'
                }
            });
        } else {
            const screenshotPath = await reporter.captureFailureScreenshot(driver, 'ui-form-verification-failed');
            await reporter.logResult('UI Form Test', 'FAILED', executionTime, 
                new Error(`Unexpected modal title: ${modalTitle}`), 
                screenshotPath
            );
        }

    } catch (err) {
        const executionTime = Date.now() - startTime;
        const screenshotPath = await reporter.captureFailureScreenshot(driver, 'ui-form-error');
        await reporter.logResult('UI Form Test', 'FAILED', executionTime, err, screenshotPath);
    } finally {
        await driver.quit();
    }
})();