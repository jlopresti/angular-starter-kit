// import app component classes
import {Dummy} from './dummy/dummy.ts'
import {Dump} from './dump/dump.ts'
import {Drum} from './drum/drum.ts'
import {PopupHost} from './popup-host/popup-host.ts'
import {PopupContent} from './popup-content/popup-content.ts'

// bundle component classes into angular components
export default angular.module('app.components.home', [])
.component('dummy', new Dummy())
.component('dump', new Dump())
.component('drum', new Drum())
.component('popupHost', new PopupHost())
.component('popupContent', new PopupContent())
