// import app component classes
import {AngularLogo} from './angular-logo/angular-logo.ts'
import {Home} from './home/home.ts'
import {Thing} from './thing/thing.ts'
import {NotFound} from './not-found/not-found.ts'

// bundle component classes into angular components
export default angular.module('app.components', [])
.component('home', new Home())
.component('thing', new Thing())
.component('notFound', new NotFound())
.component('angularLogo', new AngularLogo())
