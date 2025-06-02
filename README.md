# UI Test Automation with Selenium WebDriver

This project demonstrates automated UI testing of a web form using Selenium WebDriver and Node.js. The test automates filling out the practice form on the DemoQA website.

## Prerequisites

- Node.js (v12 or higher)
- Firefox browser
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Jasonwill2004/ui-test-form.git
cd ui-test-form
```

2. Install dependencies:
```bash
cd selenium
npm install
```

## Project Structure

```
selenium/
├── ui.test.js        # Main test script
├── package.json      # Node.js dependencies
└── node_modules/     # Installed packages
```

## Test Features

The automated test performs the following actions:
- Navigates to the DemoQA practice form
- Removes advertisement overlays automatically
- Fills in personal information:
  - First name
  - Last name
  - Email address
  - Gender selection
  - Mobile number
- Selects multiple hobbies
- Selects state and city from dropdowns
- Submits the form
- Captures a screenshot of the results

## Running the Tests

Execute the test script using Node.js:

```bash
node ui.test.js
```

## Test Output

- Successful test completion will display: "✅ Test completed. Screenshot saved as test-screenshot.png"
- Failed tests will show: "❌ Test failed:" followed by the error message
- A screenshot is saved as 'test-screenshot.png' upon successful form submission

## Error Handling

The test includes:
- Advertisement removal functionality
- Wait times for element loading
- Try-catch blocks for error handling
- Automatic browser cleanup in the 'finally' block

## Dependencies

- selenium-webdriver: For browser automation
- Firefox WebDriver: Browser driver for Firefox

## Author

Jason William
