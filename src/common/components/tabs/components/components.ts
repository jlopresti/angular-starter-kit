// import common component classes
import {TabPane} from './tab-pane/tab-pane.ts'

// bundle component classes into angular components
export default angular.module('app.common.components.tabs', [])
.component('tabPane', new TabPane())
