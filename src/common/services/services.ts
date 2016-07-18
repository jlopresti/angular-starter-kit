// import common service classes
import {AngularServices} from './angular-services/angular-services.ts'
import {DevTools} from './dev-tools/dev-tools.ts'
import {AppServices} from './app-services/app-services.ts'

// bind common service classes into angular services
export default angular.module('app.common.services', [])
.service('AngularServices', AngularServices)
.service('DevTools', DevTools)
.service('AppServices', AppServices)
