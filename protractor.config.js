exports.config = {
  specs: [
      './src/e2e-tests/**/*.spec.js'
    ],
  framework: 'mocha',
  directConnect: true,
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  seleniumArgs: ['-browserTimeout=60'],
  chromeDriver: '.\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.22.exe',
  getPageTimeout: 10000,
  allScriptsTimeout: 10000,
  baseUrl: 'http://localhost:8000',
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['no-sandbox']
    }
  },
  onPrepare: function() {

  },
  mochaOpts: {
    reporter:'spec',
    slow:3000,
    isVerbose: false,
    showColors: true,
    showTiming: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 30000,
    print: function() {}
  }
};
