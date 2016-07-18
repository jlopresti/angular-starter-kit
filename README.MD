[View Demo](https://angular-typescript-seed.surge.sh) Hosted by [Surge](http://surge.sh/)

###Features
* [Angular 1.5.5](https://angularjs.org/)
* [Angular Material](https://material.angularjs.org/latest/) w/ [Material Icon Font](https://design.google.com/icons/)
* [Angular Component Router](https://github.com/angular/angular/tree/master/modules/angular1_router)
* [Typescript](http://www.typescriptlang.org/) using [Webpack](https://webpack.github.io/)
* Local Development w/ [Webpack Dev Server](http://webpack.github.io/docs/webpack-dev-server.html)
* [Lodash](https://lodash.com/)
* [Sass](http://sass-lang.com/)
* [Component](https://docs.angularjs.org/guide/component) Based Scaffolding
* Tests w/ [Karma](https://karma-runner.github.io/) & [Jasmine](http://jasmine.github.io/)
* [Istanbul](https://github.com/gotwarlost/istanbul) Code Coverage Reporting
* End to End Tests w/ [Protractor](https://angular.github.io/protractor/#/)
* [TSLint](https://palantir.github.io/tslint/)
* [TSDoc](https://github.com/xperiments/TSDoc) and [SassDoc](http://sassdoc.com/) Generation
* Local JSON Rest API Server for quick Prototyping [Json-Server](https://github.com/typicode/json-server)
* CLI Tool to create boilerplate files for components and services
* Runs tests before commits via [ghooks](https://github.com/gtramontina/ghooks)
* Integrated Local Environment Developer Bar w/ Performance Stats via [ng-stats](http://kentcdodds.com/ng-stats/)
* Type Definitions via [Typings](https://github.com/typings/typings) for [VSCode](https://code.visualstudio.com/)

---

###Installation
`npm install` - install all dependancies, typings and webdriver-manager for protractor

NOTE:  The path to the webdriver-manager in protactor.config.js when running protractor may need to be adjusted if you are using npm2


###Start Webpack Dev Server & Local JSON Rest API
#####http://localhost:8000/webpack-dev-server/
`npm start`

###Release Build
`npm run release` - generate minified js/css + sourcemaps & copies static files (assets, index.html, etc) to ./dist


###Testing
#####coverage stats are located in ./src/coverage
`npm test` - single run of tests

`npm run tests:tdd` - run tests, watch for changes and run tests on changes

`npm run tests:e2e` - run end to end tests (dev server needs to be running so it has a place to hit)


###Docs
#####located in ./builds/docs
`npm run docs:all` - generates typedoc and sassdoc


###Generator
#####CLI Tool to create boilerplate files for components and services based on the seeds file structure
`npm run generator`

* service - generates the boilerplate for an angular service
* component - generates the boilerplate for an angular component
* router component - generates the boilerplate for an angular component with component router life cycle hooks

---

##Other Tooling & Resource Suggestions
* [Angular Testing Patterns](https://github.com/daniellmb/angular-test-patterns) - A High-Quality Guide for Testing Angular 1.x Applications.
* [Elementor](https://github.com/andresdominguez/elementor) - Excellent tool for assisting with writing Protractor E2E tests.
* [NG Inspector](http://ng-inspector.org/) - Angular Debugging Tool.

---

### Recommended VSCode Extensions
* EditorConfig
* NPM Script Runner
* Debugger for Chrome - launch chrome via terminal: /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
* Git History
* TSlint
* Document This
* VSCode Todo
* Stylesheet Formatter
* Prettify JSON
