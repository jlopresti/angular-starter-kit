// import common service classes
import {DevTools} from './dev-tools/dev-tools.ts'
import {CacheService} from './CacheService/CacheService.ts'
import {GreetingServiceProvider} from './provider/helloprovider.ts'

// bind common service classes into angular services
export default angular.module('app.common.services', [])
.service('DevTools', DevTools)
.service('CacheService', CacheService)
.provider("GreetingService", GreetingServiceProvider)
// Configure provider (note the suffix "Provider" here)
.config((GreetingServiceProvider: GreetingServiceProvider) => {
    GreetingServiceProvider.setGreeting("Hello Provider");
})
