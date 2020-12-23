# WebdriverIO-poc

Proof of concept for WebdriverIO: browser and mobile automation test framework for Node.js

## Installation

Once the repository has been downloaded, only the following will be necessary to run the tests:
- Java v1.8
- Node v14.15.1

Install WebdriverIO CLI:

```javascript
$ npm i --save-dev @wdio/cli
```

Start the TestRunner:
```javascript
$ npx wdio wdio.conf.js
```

To launch the tests in a specific browser
```javascript
 npm run test:chrome
```
## Usage

### Execute in different browser parallely

*File wdio.conf.js*

###### ``` maxInstances: 10 ``` 
How many spec can you execute simultaneously. If you have 10 spec files and maxInstance=10, then all spec files will get tested at the same time in 10 processes


###### Capabilities
Array of browser you want to execute your test suite 
 ```javascript    
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
```javascript
get header() {return Header};
```

Home Page own methods:
```javascript
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

```javascript
module.exports = new HomePage();
```
and import it into the tests - spec folder

```javascript
const homePage = require('../pageobjects/HomePage');
```
...

## DEBUG

For starters, it is very helpful to limit parallelism by settings `maxInstances=1` and targeting only those specs and browsers that need to be debugged.

``wdio.conf.io``

```javascript
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

```javascript
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

## Remote execution

Tests can be executed on a remote Selenium Grid. In order to do so, some config is required:

### Set environment variable for proxy

As conection between your computer and the Grid located in GCP is only available through a proxy, an environment variable should be set for the tests to go through that proxy (SLCD000MGT001). [Global Agent](https://github.com/gajus/global-agent) library will handle the proxy connection from your tests. 

```export GLOBAL_AGENT_HTTP_PROXY=http://10.131.71.31:80```

### Add Selenium Grid specific config in your config file

This variables should be set in your wdio conf file:

```javascript
    // Selenium Grid Options
    protocol: 'http',           // Protocol to connect to Selenium hub ("http" or "https")
    hostname: '10.180.18.129',  // Selenium hub's IP || Selenium hub's URL
    port: 4444,                 // Selenium hub's port
    path: '/wd/hub',            // Selenium hub's register path
```
You can also make use of *wdio.grid.conf.js* included in this repo. 

### Running the tests on the grid

In order to run the tests, just use this command:

```npx wdio ./config/wdio.grid.conf.js```

Or you can use the script included in this repo's *package.json*

```npm run tests:remote```

### Debugging tests on the grid

If your tests are failing and you want to see their live execution, we setup for you another hub with VNC capabilities. To run it there you should use **wdio.grid.debug.conf.js config** (or change Hub's IP to 10.180.18.130). The nodes connected to this hub have port 5900 (chrome) and 5901 (firefox) opened to incoming connections using VNC viewer. Follow these steps:

- Open [VNC-Viewer](https://www.realvnc.com/en/connect/download/viewer/) app and open a connection to 10.180.18.130:5900 for Chrome debug or port 5901 for Firefox.
- Enter **"secret"** (without quotes) as password when prompted.
- Run your tests against this nodes using config file or this command:

```npm run tests:remote:debug```

You will be able to see the execution on these machines...
