// import app component classes
import {Dummy} from './dummy/dummy.ts'
import {Dump} from './dump/dump.ts'
import {Drum} from './drum/drum.ts'

// bundle component classes into angular components
export default angular.module('app.components.home', [])
.component('dummy', new Dummy())
.component('dump', new Dump())
.component('drum', new Drum())
