// import common service classes
import {ActiveRouterDirective} from './activeRouter.ts'

// bind common service classes into angular services
export default angular.module('app.common.directives', [])
.directive('routerActive', ActiveRouterDirective.Factory())
// .directive('ra',['$rootScope', '$rootRouter', '$parse', ($rootScope, $rootRouter, $parse) => new ActiveRouterDirective($rootScope,$rootRouter,$parse)])
