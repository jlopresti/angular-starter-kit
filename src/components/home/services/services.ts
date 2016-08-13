// import app component classes
import {DummyService} from './dummy/dummy.ts'

// bundle component classes into angular components
export default angular.module('app.components.home.services', [])
.service('DummyService', DummyService)
