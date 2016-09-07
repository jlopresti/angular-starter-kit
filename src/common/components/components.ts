// import common component classes
import {Tabs} from './tabs/tabs.ts'
import {Modal} from './modal/modal.ts'
import {DynamicComponent} from './dynamic-component/dynamic-component.ts'
import TabsComponents from './tabs/components/components.ts'
import ModalComponents from './modal/components/components.ts'

// bundle component classes into angular components
export default angular.module('app.common.components', [TabsComponents.name, ModalComponents.name])
.component('tabs', new Tabs())
.component('modal', new Modal())
.component('dynamicComponent', new DynamicComponent())
