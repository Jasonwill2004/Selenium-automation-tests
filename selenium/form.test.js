const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const TestReporter = require('./utils/TestReporter');
const path = require('path');
const fs = require('fs-extra');
require('colors');


(async function submitFormTest() {
    const reporter = new TestReporter();
    const driver = await new Builder().forBrowser('firefox').build();
    const startTime = Date.now();

    try {
        await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

        // Fill form
        await driver.findElement(By.name('my-text')).sendKeys('John Doe');
        await driver.findElement(By.name('my-password')).sendKeys('password123');
        await driver.findElement(By.name('my-textarea')).sendKeys('This is a test message.');

        // Submit form
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Verify submission with explicit wait
        const messageElement = await driver.wait(
            until.elementLocated(By.id('message')), 
            5000, 
            'Timeout waiting for confirmation message'
        );

        const message = await messageElement.getText();
        const executionTime = Date.now() - startTime;

        if (message === 'Received!') { // Changed to exact match
            // console.log('Form Submission Test:'.cyan, 'PASSED'.green); removed this because since TestReporter will handle it
            await reporter.logResult('Form Submission Test', 'PASSED', executionTime, null, null, {
                formFields: {
                    text: 'John Doe',
                    message: 'This is a test message'
                }
            });
        } else {
            const screenshotPath = await reporter.captureFailureScreenshot(driver, 'form-submission-failed');
            // console.log('Form Submission Test:'.cyan, 'FAILED'.red);
            
            await reporter.logResult(
                'Form Submission Test', 
                'FAILED', 
                executionTime,
                new Error(`Form submission failed. Expected 'Received!' but got '${message}'`),
                screenshotPath,
                {
                    formFields: {
                        text: 'John Doe',
                        message: 'This is a test message'
                    },
                    actualMessage: message
                }
            );
        }
    } catch (err) {
        const executionTime = Date.now() - startTime;
        const screenshotPath = await reporter.captureFailureScreenshot(driver, 'form-unexpected-error');
        console.log('Form Submission Test:'.cyan, 'ERROR'.red);
        
        await reporter.logResult(
            'Form Submission Test', 
            'ERROR', 
            executionTime,
            err,
            screenshotPath,
            {
                errorDetails: {
                    name: err.name,
                    message: err.message,
                    stack: err.stack
                }
            }
        );
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
})();