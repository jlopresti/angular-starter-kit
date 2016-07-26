import './not-found.less'

/**
 *  Component Definition
 *
 * @export
 * @class NotFound
 * @implements {ng.IComponentOptions}
 */
export class NotFound implements ng.IComponentOptions {

  /**
   * Controller used with Component
   *
   * @type {Function}
   */
  public controller: Function = NotFoundController

  /**
   * Template used with Component
   *
   * @type {string}
   */
  public template: string = require('./not-found.html').toString()

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
 * notFound - Controller
 *
 * @export
 * @class NotFoundController
 */
export class NotFoundController {

  /**
   * @param {*} $log Angular Log Service
   */
  /*@ngInject*/
  constructor(public $log: any) {
    this.$log = $log.getInstance('NotFound')
    this.$log.debug('constructor')
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
