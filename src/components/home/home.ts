import './home.less'

/**
 *  Component Definition
 *
 * @export
 * @class home
 * @implements {ng.IComponentOptions}
 */
export class Home implements ng.IComponentOptions {

  /**
   * Controller used with Component
   *
   * @type {Function}
   */
  public controller: Function = HomeController

  public controllerAs: string = 'vm'
  /**
   * Template used with Component
   *
   * @type {string}
   */
  public template: string = require('./home.html').toString()

  /**
   * Object containing pairs Directive Bindings for Component
   *
   * @type {Object}
   */
  public bindings: { [binding: string]: string; } = {
    $router: '<'
  }

  /**
   * Component Router lifecycle hook
   */
  public $canActivate: any = function(): boolean {
    return true
  }

}

/**
 * home - Controller
 *
 * @export
 * @class HomeController
 */
export class HomeController {

  public test: string = 'yosdqsdoo'

  /**
   * @param {*} $log Angular Log Service
   */
  /*@ngInject*/
  constructor(public $log: any) {
    this.$log = $log.getInstance('Home')
    this.$log.debug('constructor')
  }

  public changeValue(): void {
    this.test = 'tezezkdjlfsjdsssstsss'
  }
  /**
   * life cycle hook (road to ng2)
   */
  public $onInit(): void {
    this.$log.debug('onInit')
  }

  public $routerOnActivate(toRoute: any, fromRoute: any): void {
    this.$log.debug('$routerOnActivate', toRoute, fromRoute)
  }

  public $routerCanDeactivate(): boolean {
    this.$log.debug('$routerCanDeactivate', arguments)
    return true
  }

  public $routerOnDeactivate(): void {
    this.$log.debug('$routerOnDeactivate', arguments)
  }
}
