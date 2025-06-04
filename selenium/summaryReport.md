# 🧪 Selenium Automation Tests – Week 2 Summary Report

## 📅 Week 2: Frontend Testing and Automation

This repository documents the progress, challenges, and learnings during **Week 2** of frontend automation testing using **Selenium** and **Mocha** with JavaScript. The week was focused on practical hands-on tasks involving browser automation, login flows, form validation, and UI interaction, along with professional test reporting and screenshot capturing.


---

## 🧠 Weekly Breakdown & Learnings

### 🔹 Day 7 – Introduction to Selenium with JavaScript

- **Objective**: Understand the basics of Selenium WebDriver in a Node.js environment.
- **What I Did**:
  - Installed `selenium-webdriver` via npm.
  - Wrote a test to launch a browser, navigate to a page, and log its title.
- **Challenges**: Setting up the Selenium WebDriver with the correct browser driver path.
- **Deliverables**:
  - ✅ `sample.test.js`
  - 📸 Screenshot of the browser running successfully.

---

### 🔹 Day 8 – Automating Login Functionality

- **Objective**: Write an automation test that logs into a web application.
- **What I Did**:
  - Wrote a login test using selectors for username, password, and login button.
  - Used Mocha for test structure and assertions.
- **Challenges**: Finding correct selectors and managing wait conditions.
- **Deliverables**:
  - ✅ `login.test.js`
  - 📸 Screenshot after successful login.

---

### 🔹 Day 9 – Form Submission and Validation

- **Objective**: Automate a full form submission and validate its success.
- **What I Did**:
  - Simulated user input: filling fields, selecting from dropdowns, checking boxes.
  - Validated successful form submission using assertions.
- **Challenges**: Managing dynamic form behavior and alert handling.
- **Deliverables**:
  - ✅ `form.test.js`
  - 📸 Screenshot showing form submission result.

---

### 🔹 Day 10 – UI Element Interaction

- **Objective**: Test interaction with UI components such as checkboxes, buttons, and radio inputs.
- **What I Did**:
  - Automated interaction with multiple types of UI elements.
  - Used parameterized test inputs for better test coverage.
- **Challenges**: Handling element visibility and asynchronous timing issues.
- **Deliverables**:
  - ✅ `ui.test.js`
  - 📸 Screenshot showing interaction output.

---

### 🔹 Day 11 – Test Reporting and Screenshot Capture

- **Objective**: Add professional test reporting and screenshots for failed tests.
- **What I Did**:
  - Integrated [Mochawesome](https://github.com/adamgruber/mochawesome) for stylish test reports.
  - Captured screenshots using `afterEach` hooks for failed tests.
  - Generated both JSON and HTML reports.
- **Challenges**: Ensuring screenshots were taken only on failures without breaking test flow.
- **Deliverables**:
  - ✅ `mochawesome.html`
  - ✅ Screenshots stored in `/screenshots`
  - ✅ Tests integrated with reporting config.

---

## 📸 Test Execution & Reporting

- **Mochawesome HTML Report**: [mochawesome.html](./mochawesome.html)
- **Screenshot Folder**: `/screenshots`
- **Reporting Trigger**: Automatically runs with `npm test` using Mocha hooks.

---

## 🔧 Tools & Libraries Used

| Tool           | Purpose                           |
|----------------|------------------------------------|
| Selenium       | Browser automation                 |
| Mocha          | Test framework                     |
| Chai           | Assertions                         |
| Mochawesome    | Visual HTML report for test cases  |
| Node.js        | Runtime environment                |

---

## 🧠 Key Learnings

- Setting up and running Selenium tests in a Node.js environment.
- Simulating real user interactions like logins, clicks, and input.
- Capturing and debugging failed tests via screenshots.
- Integrating test reports with `mochawesome` for better readability.

---

## 🧪 PR Details

- 🔗 **PR #1 – Basic Test Scripts**  
  [View PR](https://github.com/Jasonwill2004/Selenium-automation-tests/pull/1)  
  Contains sample, login, form, and UI tests.

- 🔗 **PR #2 – Test Reporting and Screenshot Capture**  
  [View PR](https://github.com/Jasonwill2004/Selenium-automation-tests/pull/2)  
  Includes reporting setup, hooks for screenshots, and mochawesome integration.

---

## 🚀 Future Enhancements

- Add headless browser testing using ChromeDriver.
- CI/CD test integration using GitHub Actions.
- Implement E2E testing with Cypress or Playwright for more robust coverage.
- Store reports and screenshots as test artifacts on cloud CI.

---

## ✅ Final Note

This repository summarizes the **entire frontend test automation journey** for the week and showcases:
- Practical automation test files
- Failure-proof screenshots
- Professional HTML reports
- Well-documented test structure

It was a great learning experience to combine **browser automation** with **developer-grade reporting** and debugging practices.

---



