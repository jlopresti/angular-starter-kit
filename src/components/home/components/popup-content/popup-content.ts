import './popup-content.less'

/**
 *  Component Definition
 *
 * @export
 * @class PopupContent
 * @implements {ng.IComponentOptions}
 */
export class PopupContent implements ng.IComponentOptions {

  /**
   * Controller used with Component
   *
   * @type {Function}
   */
  public controller: Function = PopupContentController

  /**
   * Template used with Component
   *
   * @type {string}
   */
  public template: string = require('./popup-content.html').toString()

  /**
   * Object containing pairs Directive Bindings for Component
   *
   * @type {Object}
   */
  public bindings: { [binding: string]: string; } = {
    $router: '<'
  }

  /**
   * Object name used in the view and containing controller scope
   *
   * @type {Object}
   */
  public controllerAs: string = 'vm'

  /**
   *  router life cycle hook (road to ng2)
   */
  public $canActivate: any = (): boolean => {
    return true
  }

    public $routeConfig: any = [
    {path: '/', redirectTo: ['submenu1']},
    // {path: '/child', name: 'Child', component: 'dummy'},
    {path: '/submenu1', name: 'Submenu1', component: 'dump'},
    {path: '/submenu2', name: 'Submenu2', component: 'dump'},
    {path: '/submenu3', name: 'Submenu3', component: 'drum'}
  ]

}

/**
 * PopupContent - Controller
 *
 * @export
 * @class PopupContentController
 */
export class PopupContentController {
  public modalApi: any
  public $router:any

  /**
   * @param {*} $log Angular Log Service
   * @param {*} AngularServices Angular Services Convenience Service
   * @param {*} AppServices App Services Convenience Service
   */
  /*@ngInject*/
  constructor(public $log: any, public $window: ng.IWindowService, public $q:ng.IQService) {
    this.$log = $log.getInstance('PopupContent');
    this.$log.debug('constructor')
  }

  /**
   * life cycle hooks (road to ng2)
   * Called on each controller after all the controllers on an element have been constructed and had their bindings initialized (and before the pre & post linking functions for the directives on this element).
   */
  public $onInit(): void {
    this.$log.debug('onInit')
  }

  /**
   * Called whenever one-way bindings are updated.
   * The changesObj is a hash whose keys are the names of the bound properties that have changed, and the values are an object of the form { currentValue, previousValue, isFirstChange() }.
   * Use this hook to trigger updates within a component such as cloning the bound value to prevent accidental mutation of the outer value.
   */
  public $onChanges(changesObj: any): void {
    this.$log.debug('onChanges', changesObj)
  }

  /**
   * Called on a controller when its containing scope is destroyed.
   * Use this hook for releasing external resources, watches and event handlers.
   */
  public $onDestroy(): ng.IPromise<void> {
    this.$log.debug('onDestroy')
    return this.modalApi.dismiss();
  }

  /**
   * Called after this controller's element and its children have been linked.
   * Similar to the post-link function this hook can be used to set up DOM event handlers and do direct DOM manipulation.
   * Note that child elements that contain templateUrl directives will not have been compiled and linked since they are waiting for their template to load asynchronously and their own compilation and linking has been suspended until that occurs.
   * This hook can be considered analogous to the ngAfterViewInit and ngAfterContentInit hooks in Angular 2.
   * Since the compilation process is rather different in Angular 1 there is no direct mapping and care should be taken when upgrading.
   */
  public $postLink(): void {
    this.$log.debug('postLink')
    this.modalApi.open();
  }

  public modalCreated(api){
    this.modalApi = api;
  }
  /**
   * Router Life Cycle Hooks
   */

  /**
   * @param {toRoute} transition to route information obj
   * @param {fromRoute} transition from route information obj
   *
   * Called by the Router at the end of a successful navigation.
   * Only one of $routerOnActivate and $routerOnReuse will be called depending upon the result of a call to $routerCanReuse.
   * NOTE: By returning a promise from $routerOnActivate() we can delay the activation of the Route until the data have arrived successfully.
   * This is similar to how a resolve works in ngRoute.
   *
   */
  public $routerOnActivate(toRoute: any, fromRoute: any): void {
    this.$log.debug('$routerOnActivate', toRoute, fromRoute)
  }

  /**
   * @param {toRoute} transition to route information obj
   * @param {fromRoute} transition from route information obj
   *
   * Called by the Router at the end of a successful navigation.
   * Only one of $routerOnActivate and $routerOnReuse will be called depending upon the result of a call to $routerCanReuse.
   */
  public $routerOnReuse(toRoute: any, fromRoute: any): void {
    this.$log.debug('$routeOnReuse', toRoute, fromRoute)
  }

  /**
   * Called by the Router to determine if a Component can be removed as part of a navigation.
   */
  public $routerCanDeactivate(): ng.IPromise<boolean> {
    this.$log.debug('$routerCanDeactivate', arguments)
    return this.modalApi.dismiss().then(() => true);
  }

  /**
   * Called by the Router before destroying a Component as part of a navigation.
   */
  public $routerOnDeactivate(): void {
    this.$log.debug('$routerOnDeactivate', arguments)
  }

  /**
   * Called to determine whether a Component can be reused across Route Definitions that match the same type of Component, or whether to destroy and instantiate a new Component every time.
   */
  public $routerCanReuse(): boolean {
    this.$log.debug('routerCanReuse')
    return true
  }
}
