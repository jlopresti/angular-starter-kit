import './thing.less'

/**
 *  Component Definition
 *
 * @export
 * @class Thing
 * @implements {ng.IComponentOptions}
 */
export class Thing implements ng.IComponentOptions {

  /**
   * Controller used with Component
   *
   * @type {Function}
   */
  public controller: Function = ThingController

  /**
   * Template used with Component
   *
   * @type {string}
   */
  public template: string = require('./thing.html').toString()

  /**
   * Object containing pairs Directive Bindings for Component
   *
   * @type {Object}
   */
  public bindings: { [binding: string]: string; } = {
    $router: '<'
  }

  public $canActivate: any = (): boolean => {
    return true
  }
}

/**
 * about - Controller
 *
 * @export
 * @class ThingController
 */
export class ThingController {

  /**
   * $inject to make angular DI minifiication safe
   *
   * @static
   * @type {Array<string>}
   */
  public static $inject: [string] = ['$log', 'AngularServices', 'AppServices']
  public id: Number = 0

  /**
   * @param {*} $log Angular Log Service
   * @param {*} AngularServices Angular Services Convenience Service
   * @param {*} AppServices App Services Convenience Service
   */
  constructor(public $log: any, public AngularServices: any, public AppServices: any) {
    this.$log = $log.getInstance('Thing', false)
    this.$log.debug('constructor')
  }

  /**
   * life cycle hook (road to ng2)
   */
  public $onInit(): void {
    this.$log.debug('onInit')
  }

  public $routerOnActivate($nextInstruction: any, $prevInstruction: any): void {
    this.$log.debug('$routerOnActivate', $nextInstruction, $prevInstruction)
    this.id = $nextInstruction.params.id
  }

  public $routerCanDeactivate(): void {
    this.$log.debug('$routerCanDeactivate', arguments)
  }

  public $routerOnDeactivate(): void {
    this.$log.debug('$routerOnDeactivate', arguments)
  }
}
