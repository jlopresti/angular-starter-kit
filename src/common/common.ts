// import common elements angular modules
import CommonServices from './services/services.ts'
import CommonComponents from './components/components.ts'
import CommonDirectives from './directives/directives.ts'

// bundle common element angular moduels into container module
export default angular.module('app.common', [
  CommonServices.name,
  CommonComponents.name,
  CommonDirectives.name,
])
