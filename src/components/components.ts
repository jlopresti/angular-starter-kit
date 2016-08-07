// import app component classes
import {Home} from './home/home.ts'
import HomeComponents from './home/components/components.ts'

// bundle component classes into angular components
export default angular.module('app.components', [HomeComponents.name, "highcharts-ng"])
.component('home', new Home())
