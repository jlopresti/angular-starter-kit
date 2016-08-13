// import app component classes
import {Home} from './home/home.ts'
import {Search} from './search/search.ts'
import HomeComponents from './home/components/components.ts'
import HomeServices from './home/services/services.ts'

// bundle component classes into angular components
export default angular.module('app.components', [HomeComponents.name, "highcharts-ng",HomeServices.name ])
.component('home', new Home())
.component('search', new Search())
