import './developer-bar.less'

/**
 *  Component Definition
 *
 * @export
 * @class AngularLogo
 * @implements {ng.IComponentOptions}
 */
export class DeveloperBar implements ng.IComponentOptions {

  /**
   * Controller used with Component
   *
   * @type {Function}
   */
  public controller: Function = DeveloperBarController

  /**
   * Template used with Component
   *
   * @type {string}
   */
  public template: string = require('./developer-bar.html').toString()

  /**
   * Object containing pairs Directive Bindings for Component
   *
   * @type {Object}
   */
  public bindings: { [binding: string]: string; } = {}
}

/**
 * DeveloperBar - Controller
 *
 * @export
 * @class AngularLogoController
 */
class DeveloperBarController {

  /**
   * $inject to make angular DI minifiication safe
   *
   * @static
   * @type {Array<string>}
   */
  public static $inject: Array<string> = ['$log']

  /**
   * List of Developer Helper Links
   *
   * @private
   * @type {Array<object>}
   */
  public links: [any]

  /**
   * @param {*} $log Angular Log Service
   */
  constructor(public $log: any) {
    this.$log = $log.getInstance('developerBar', false)
    this.$log.debug('constructor')
  }

  /**
   *  life cycle hook (road to ng2)
   */
  public $onInit(): void {
    this.$log.debug('onInit')

    // links to render in the bar
    this.links = [
      { path: 'docs/typedoc/index.html', title: 'TypeDoc' },
      { path: 'docs/sassdoc/index.html', title: 'SassDoc' },
      { path: 'docs/coverage/index.html', title: 'Code Coverage' },
      { path: 'https://material.angularjs.org/latest/', title: 'Angular Material' },
      { path: 'https://design.google.com/icons/', title: 'Material Icons' },
    ]
  }

}
