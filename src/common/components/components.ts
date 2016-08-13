// import common component classes
import {Tabs} from './tabs/tabs.ts'
import TabsComponents from './tabs/components/components.ts'

// bundle component classes into angular components
export default angular.module('app.common.components', [TabsComponents.name])
.component('tabs', new Tabs())
