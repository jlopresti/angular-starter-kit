import './tabs.less'

/**
 *  Component Definition
 *
 * @export
 * @class Tabs
 * @implements {ng.IComponentOptions}
 */
export class Tabs implements ng.IComponentOptions {

  /**
   * Controller used with Component
   *
   * @type {Function}
   */
  public controller: Function = TabsController

  /**
   * Template used with Component
   *
   * @type {string}
   */
  public template: string = require('./tabs.html').toString()

  /**
   * Object containing pairs Directive Bindings for Component
   *
   * @type {Object}
   */
  public bindings: { [binding: string]: string; } = {
    selected: '@',
    tabChanged: '&'
  }

  /**
   * Object name used in the view and containing controller scope
   *
   * @type {Object}
   */
  public controllerAs: string = 'vm'

  public transclude: boolean =  true
}

/**
 * Tabs - Controller
 *
 * @export
 * @class TabsController
 */
export class TabsController {

  public panes: Array<any> = []
  private selected: string
  private tabChanged: (value: any) => void

  /**
   * @param {*} $log Angular Log Service
   * @param {*} AngularServices Angular Services Convenience Service
   * @param {*} AppServices App Services Convenience Service
   */
  /*@ngInject*/
  constructor(public $log: any) {
    this.$log = $log.getInstance('Tabs');
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
    if (changesObj.selected) {
      this.selected = changesObj.selected.currentValue;
      this.invalidateTabSelection()
    }
  }

  private invalidateTabSelection(): void {
     angular.forEach(this.panes, (panel) => {
      if (this.selected === panel.tabId) {
        this.select( panel );
      }
    });
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
    if (this.panes.length === 1) {
        this.select(this.panes[0] );
    }
  }

  public onTabChanged(pane: any): void{
    this.tabChanged({value:pane.tabId})
    this.select( pane );
  }

  private select(pane): void {
    angular.forEach(this.panes, function(panel) {
      panel.hide();
    });
    pane.show();
  }

  public addPane(pane): void {
    this.panes.push( pane );
    if (this.selected === pane.tabId) {
      this.select( pane );
    }
  }
}
