This repository contains a sample of testing the [TodoMVC](https://todomvc.com/examples/angular2/) web application.

#### Frameworks and technologies used:
* JavaScript
* [TestCafe](https://testcafe.io/)

#### Tests
Positive and negative scenarios have been implemented, which check the basic functionality of the application: adding, editing, deleting a task, as well as checking the operation of the counter and interface elements.
Tests are grouped based on the item being tested and the actions taken on the item.

#### Patterns
The standard Page Object pattern, commonly used in web testing, was implemented. This pattern abstracts the interaction with web pages and encapsulates web page elements within separate page objects. It helps eliminate code duplication, simplifies updates in case of page element changes, isolates tests from page implementation details, and facilitates reusability of these objects.

#### Reporting
The results of the tests are displayed in the console and are also saved in the Allure format. To generate Allure reports, the [testcafe-reporter-allure](https://www.npmjs.com/package/testcafe-reporter-allure) library is used

#### Prerequisites
Latest LTS version of [Node.js](https://nodejs.org/en)

#### Setup
`npm i`

#### Execution
`testcafe`