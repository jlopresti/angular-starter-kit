// app imports
import Common from './common/common.ts'
import Components from './components/components.ts'

import {App} from './components/app/app.ts'
import AppConfig from './app.config.ts'
import {Config} from './configs/config.ts'
console.log(DataConfig)
// top level angular module for app
angular.module('app', [
  'ngComponentRouter',
  'log.ex.uo',
  'ui.bootstrap',
  Common.name,
  Components.name,
])
.config(AppConfig)
.value('$routerRootComponent', 'app') // top level router component, contains the intial routes and views
.component('app', new App())
.value('TestConfig', DataConfig)

// start angular using code instead of ng-app declaration in the index.html
angular.bootstrap(document, ['app'], {
    strictDi: true
})
