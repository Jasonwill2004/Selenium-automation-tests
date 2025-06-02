const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

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
  let driver = await new Builder().forBrowser('firefox').build();

  try {
    await driver.get('https://demoqa.com/automation-practice-form');

    await removeAds(driver);

    await driver.findElement(By.id('firstName')).sendKeys('John');

    await driver.findElement(By.id('lastName')).sendKeys('Doe');

    await driver.findElement(By.id('userEmail')).sendKeys('john.doe@example.com');

    await driver.sleep(500);

    await driver.findElement(By.xpath("//label[text()='Male']")).click();

    await driver.findElement(By.id('userNumber')).sendKeys('1234567890');

    await driver.findElement(By.xpath("//label[text()='Reading']")).click();
    await driver.findElement(By.xpath("//label[text()='Music']")).click();

    await driver.executeScript("arguments[0].scrollIntoView()", await driver.findElement(By.id("state")));
    await driver.findElement(By.id('state')).click();
    await driver.findElement(By.xpath("//div[text()='NCR']")).click();

    await driver.findElement(By.id('city')).click();
    await driver.findElement(By.xpath("//div[text()='Delhi']")).click();

    await driver.findElement(By.id('submit')).click();

    await driver.wait(until.elementLocated(By.id('example-modal-sizes-title-lg')), 5000);

    let screenshot = await driver.takeScreenshot();
    fs.writeFileSync('test-screenshot.png', screenshot, 'base64');

    console.log("✅ Test completed. Screenshot saved as test-screenshot.png");
  } catch (err) {
    console.error("❌ Test failed:", err);
  } finally {
    await driver.quit();
  }
})();
