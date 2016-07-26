// import common service classes
import {DevTools} from './dev-tools/dev-tools.ts'

// bind common service classes into angular services
export default angular.module('app.common.services', [])
.service('DevTools', DevTools)
