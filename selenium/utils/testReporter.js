const fs = require('fs-extra');
const path = require('path');

class TestReporter {
    constructor() {
        this.reportsDir = path.join(__dirname, '../reports');
        this.screenshotsDir = path.join(this.reportsDir, 'screenshots');
        this.setupDirectories();
    }

    setupDirectories() {
        fs.ensureDirSync(this.reportsDir);
        fs.ensureDirSync(this.screenshotsDir);
        
        const reportPath = path.join(this.reportsDir, 'test-report.json');
        if (!fs.existsSync(reportPath)) {
            fs.writeFileSync(reportPath, '[]');
        }
    }

    async captureFailureScreenshot(driver, testName) {
        try {
            const timestamp = Date.now();
            const screenshotPath = path.join(this.screenshotsDir, `${testName}-failure-${timestamp}.png`);
            const screenshot = await driver.takeScreenshot();
            await fs.writeFile(screenshotPath, Buffer.from(screenshot, 'base64'));
            console.log(`Screenshot captured: ${screenshotPath}`.yellow);
            return screenshotPath;
        } catch (err) {
            console.error('Failed to capture failure screenshot:', err);
            return null;
        }
    }

    async captureScreenshot(driver, testName) {
        try {
            const timestamp = Date.now();
            const screenshotPath = path.join(this.screenshotsDir, `${testName}-${timestamp}.png`);
            const screenshot = await driver.takeScreenshot();
            await fs.writeFile(screenshotPath, Buffer.from(screenshot, 'base64'));
            return screenshotPath;
        } catch (err) {
            console.error('Failed to capture screenshot:', err);
            return null;
        }
    }

    async logResult(testName, status, executionTime = null, error = null, screenshotPath = null, additionalData = {}) {
        try {
            const timestamp = new Date().toISOString();
            const result = {
                testName,
                status,
                timestamp,
                executionTime,
                error: error?.message || null,
                screenshot: screenshotPath,
                ...(Object.keys(additionalData).length > 0 && { additionalData })
            };

            const reportPath = path.join(this.reportsDir, 'test-report.json');
            let reports = [];
            
            try {
                const fileContent = fs.readFileSync(reportPath, 'utf8');
                reports = fileContent ? JSON.parse(fileContent) : [];
            } catch (err) {
                console.warn('Could not parse existing report, creating new one');
                reports = [];
            }
            
            reports.push(result);
            await fs.writeFile(reportPath, JSON.stringify(reports, null, 2));
            
            console.log(`${testName}: ${status === 'PASSED' ? status.green : status.red}`);
            if (screenshotPath) {
                console.log(`Screenshot saved: ${screenshotPath}`.cyan);
            }
        } catch (err) {
            console.error('Failed to log test result:', err);
        }
    }
}

module.exports = TestReporter;