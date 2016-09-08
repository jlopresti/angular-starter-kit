import './dynamic-component.less'

/**
 *  Component Definition
 *
 * @export
 * @class DynamicComponent
 * @implements {ng.IComponentOptions}
 */
export class DynamicComponent implements ng.IComponentOptions {

  /**
   * Controller used with Component
   *
   * @type {Function}
   */
  public controller: Function = DynamicComponentController

  /**
   * Template used with Component
   *
   * @type {string}
   */
  public template: string = require('./dynamic-component.html').toString()

  /**
   * Object containing pairs Directive Bindings for Component
   *
   * @type {Object}
   */
  public bindings: { [binding: string]: string; } = {
    component: '@',
    data: '<'
  }

  /**
   * Object name used in the view and containing controller scope
   *
   * @type {Object}
   */
  public controllerAs: string = 'vm'
}

/**
 * DynamicComponent - Controller
 *
 * @export
 * @class DynamicComponentController
 */
export class DynamicComponentController {
  private component: string
  private data: any

  /**
   * @param {*} $log Angular Log Service
   * @param {*} AngularServices Angular Services Convenience Service
   * @param {*} AppServices App Services Convenience Service
   */
  /*@ngInject*/
  constructor(public $log: any, public $element:ng.IRootElementService, public $scope: ng.IScope, public $compile: ng.ICompileService) {
    this.$log = $log.getInstance('DynamicComponent');
    this.$log.debug('constructor')
  }

  /**
   * life cycle hooks (road to ng2)
   * Called on each controller after all the controllers on an element have been constructed and had their bindings initialized (and before the pre & post linking functions for the directives on this element).
   */
  public $onInit(): void {
    this.$log.debug('onInit')
    var newScope = this.$scope.$new();
    newScope = angular.merge(newScope, this.data);
    let componentAttributes = ''
    for (const key of Object.keys(this.data)) {
      if(this.data[key] instanceof Function) {
        var args = this.data[key].toString().match(/function\s*(.*?)\s*{/)[1]
        componentAttributes += `${this.dashCase(key)}="${key}${args}" `
      }else {
        var startBrace = this.data[key] instanceof Object ? '' : '{{'
        var endBrace = this.data[key] instanceof Object ? '' : '}}'
        componentAttributes += `${this.dashCase(key)}="${startBrace}::${key}${endBrace}" `
      }
    }
    var html = '<' + this.dashCase(this.component) + ' ' + componentAttributes + '></' + this.dashCase(this.component) + '>';
    this.$element.append(this.$compile(html)(newScope));
  }

  private dashCase(str) {
    return str.replace(/[A-Z]/g, function (match) { return '-' + match.toLowerCase(); });
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
  public $onDestroy(): void {
    this.$log.debug('onDestroy')
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
  }

}
