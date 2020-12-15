# WebdriverIO-poc

Proof of concept for WebdriverIO: browser and mobile automation test framework for Node.js

## Installation

Once the repository has been downloaded, only the following will be necessary to run the tests:
- Java v1.8
- Node v14.15.1

Install WebdriverIO CLI:

```groovy
$ npm i --save-dev @wdio/cli
```

Start the TestRunner:
```groovy
$ npx wdio wdio.conf.js
```

To launch the tests in a specific browser
```groovy
 npm run test:chrome
```
## Usage

### Execute in different browser parallely

*File wdio.conf.js*

###### ``` maxInstances: 10 ``` 
How many spec can you execute simultaneously. If you have 10 spec files and maxInstance=10, then all spec files will get tested at the same time in 10 processes


###### Capabilities
Array of browser you want to execute your test suite 
 ```    
capabilities: [{
     browserName: 'chrome',
     acceptInsecureCerts: true
     },{            
     browserName: 'firefox',
     'moz:firefoxOptions': {
       binary: '/Applications/Firefox.app/Contents/MacOS/firefox'
      }
     },{
     browserName: 'safari'
}],``` 




### Page Object Pattern

By introducing the "elements as first class citizens" principle, it is now possible to build up large test suites using this pattern. There are no additional packages required to create page objects.

The goal of using page objects is to abstract any page information away from the actual tests. Ideally, you should store all selectors or specific instructions that are unique for a certain page in a page object, so that you still can run your test after you've completely redesigned your page.

### Making a Page Object: HomePage example

This class will define the specific components and methods of this page. If there any component of the page that will be reused, such as the header and the footer, it is advisable that they be defined in differentiated modules.
In this way we can import them into different Page Class using the command
```groovy
get header() {return Header};
```

Home Page own methods:
```groovy
    /**
    * Opens Home page
    */
    open() {
        return browser.url(`https://www.stubhubstage.com`);
    }

    /*
    * Checks whether required elements are displayed
    */
    isLoaded() {
        this.header.isLoaded();
        this.footer.isLoaded();
        this.jumbotron.waitForDisplayed({timeout:15000});
            
    }
```

It will be necessary to export the Page using the instruction

```groovy
module.exports = new HomePage();
```
and import it into the tests - spec folder

```groovy
const homePage = require('../pageobjects/HomePage');
```
...


