const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");
const should = require("chai").should();
const TestReporter = require("./utils/TestReporter");

describe("add todo tests", function () {
  const reporter = new TestReporter();
  let driver;
  let startTime;

  beforeEach(async function() {
    startTime = Date.now();
    driver = await new Builder().forBrowser("firefox").build();
  });

  it("should add a todo and mark it as completed", async function () {
    try {
      await driver.get("https://lambdatest.github.io/sample-todo-app/");

      await driver
        .findElement(By.id("sampletodotext"))
        .sendKeys("test todo", Key.RETURN);

      let todoText = await driver
        .findElement(By.xpath("//li[last()]"))
        .getText();

      todoText.should.equal("test todo");

      await driver.findElement(By.xpath("//li[last()]/input")).click();

      const duration = Date.now() - startTime;
      reporter.logTestResult("Add Todo Test", "PASSED", duration);
      console.log("✅ Test completed successfully");
    } catch (error) {
      const screenshotPath = await reporter.captureScreenshot(driver, "todo-test-failure");
      const duration = Date.now() - startTime;
      reporter.logTestResult("Add Todo Test", "FAILED", duration, error, screenshotPath);
      throw error;
    }
  });

  afterEach(async function() {
    await driver.quit();
  });
});