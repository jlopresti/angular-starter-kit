// import common component classes
import {DeveloperBar} from './developer-bar/developer-bar.ts'

// bundle component classes into angular components
export default angular.module('app.common.components', [])
.component('developerBar', new DeveloperBar())
