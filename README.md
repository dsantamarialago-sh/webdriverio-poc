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
}]
``` 




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

## DEBUG

For starters, it is very helpful to limit parallelism by settings `maxInstances=1` and targeting only those specs and browsers that need to be debugged.

``wdio.conf.io``

```
const debug = process.env.DEBUG

exports.config = {
    ....
    specs: [
            './test/specs/**/*.js'
        ],
    ....
    maxInstances: debug ? 1 : 10,
    ....
    capabilities: debug ? [{ browserName: 'chrome' }] :
            [{
            maxInstances: 5,
            browserName: 'chrome',
            acceptInsecureCerts: true
        }],
    ...
    mochaOpts: {
            ui: 'bdd',
            timeout: debug ? (60*60*1000) : 60000
        },
```

Use variable DEBUG to change settings during runtime

Use `browser.debug() instructions to pause your test and inspect the browser. Your command line interface will also switch into REPL mode. In REPL mode, you can access the browser object or `$` `$$` functions``.

Execute debug commands

`DEBUG=true npx wdio wdio.conf.js`


`DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/prueba.js`

### Use VsCode to debug JS

Download plugin Javascript Debugger (nightly) for VsCode and create a profile file in `.vscode/launch.json`

```
{
    "name": "description",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal"
},
```

Go to debugger tab and run test. Add breakpoint to pause execution. 

## Dynamic test filters

### Grouping test specs

Define your suites in your WDIO config

```
    // define specific suites
    suites: {
        login: [
            './test/specs/login.success.spec.js',
            './test/specs/login.failure.spec.js'
        ],
        buyFeature: [
            './test/specs/buy.success.spec.js',
            './test/specs/buy.failure.spec.js'
        ],
        ok: [
            './test/specs/login.success.spec.js',
            './test/specs/buy.success.spec.js'
        ],
        error: [
            './test/specs/login.failure.spec.js',
            './test/specs/buy.failure.spec.js'
        ]
    },
```

Run your suites

```
 npx wdio wdio.conf.js --suite login (2 tests)
 npx wdio wdio.conf.js --suite login --suite buyFeature (4 tests)
```

Run selected tests

```
 npx wdio wdio.conf.js --spec ./test/specs/login.success.spec.js (1 test)
 npx wdio wdio.conf.js --spec ./test/specs/login.*.spec.js (2 tests)
 npx wdio wdio.conf.js --spec ./test/specs/login.*.spec.js --spec ./test/specs/buy.success.spec.js (3 tests)
```

Exclude selected test

```
 npx wdio wdio.conf.js --spec ./test/specs/login.success.spec.js (1 test)
 ```
 
 Run Suites and Test Specs
 
 This run execute suite and individual specs
 
 ```
  npx wdio wdio.conf.js --suite login --spec ./test/specs/login.success.spec.js (3 test)
  ```
 


  