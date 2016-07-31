// import app component classes
import {ChildHome} from './child-home/child-home.ts'
import {Profile} from './profile/profile.ts'

// bundle component classes into angular components
export default angular.module('app.components.home', [])
.component('childHome', new ChildHome())
.component('profile', new Profile())
