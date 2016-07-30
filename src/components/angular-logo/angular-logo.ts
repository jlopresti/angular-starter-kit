import './angular-logo.less'

/**
 *  Component Definition
 *
 * @export
 * @class AngularLogo
 * @implements {ng.IComponentOptions}
 */
export class AngularLogo implements ng.IComponentOptions {

  /**
   * Controller used with Component
   *
   * @type {Function}
   */
  public controller: Function = AngularLogoController

  /**
   * Template used with Component
   *
   * @type {string}
   */
  public template: string = require('./angular-logo.html').toString()

  /**
   * Object containing pairs Directive Bindings for Component
   *
   * @type {Object}
   */
  public bindings: { [binding: string]: string; } = {
    logoImagePath: '@?', // optional binding
    version: '@?', // optional binding
  }
}

/**
 * AngularLogo - Controller
 *
 * @export
 * @class AngularLogoController
 */
export class AngularLogoController {

  /**
   * image path to a logo asset
   *
   * @private
   * @type {string}
   */
  private logoImagePath: any

  /**
   * semantic version to display beneath the logo
   *
   * @private
   * @type {string}
   */
  private version: string

  /**
   * @param {*} $log Angular Log Service
   */
  /*@ngInject*/
  constructor(public $log: any) {
    this.$log = $log.getInstance('AngularLogo')
    this.$log.debug('constructor')
    this.logoImagePath = angular.isDefined(this.logoImagePath) ? this.logoImagePath : require('assets/img/angularjs-logo.png')
    this.version = angular.isDefined(this.version) ? this.version : angular.version.full
  }

  /**
   * life cycle hook (road to ng2)
   */
  public $onInit(): void {
    this.$log.debug('onInit')
  }
}
