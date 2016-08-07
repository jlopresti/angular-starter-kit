var webpackConfig = require('./webpack-test.config.js');
require('phantomjs-polyfill')
webpackConfig.entry = ""; // you can override anything you want from the project webpack config
if(process.env.KARMA_DEBUG){
  //we remove istanbul from post loader when debugging because sourcemap doesn't work if activated
  webpackConfig.module.postLoaders = null;
}
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [process.env.KARMA_DEBUG ? 'Chrome' : 'PhantomJS'],
    singleRun: true,
    autoWatchBatchDelay: 300,
    captureTimeout: 60000,
    browserNoActivityTimeout: 100000,
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './src/index.test.ts'
    ],
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },
    preprocessors: {
      './src/**/*.ts': ['webpack', 'sourcemap'],
      './src/**/!(*.spec)+(.js)': ['coverage']
    },
    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true
      },
      quiet: true, //reduce spam
      noInfo: true //reduce spam
    },
    webpack: webpackConfig,
    reporters: [
      'spec',
      'coverage'
    ],
    client: {
     mocha: {
        reporter: 'html'
      }
   } ,
    coverageReporter: {
      reporters: [
        {
          dir: './builds/docs/coverage/',
          subdir: '.',
          type: 'html'
        },{
          dir: './builds/docs/coverage/',
          subdir: '.',
          type: 'text-summary',
          file: 'summary.text'
        }
      ]
    },
    plugins:[ 'karma-webpack', 'karma-chrome-launcher', 'karma-phantomjs-launcher', 'karma-mocha',
    'karma-sourcemap-loader', 'karma-chai', 'karma-coverage', 'karma-spec-reporter', 'karma-sinon', 'karma-sinon-chai']
  });
};
