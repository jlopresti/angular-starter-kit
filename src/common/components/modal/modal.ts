import './modal.less'

/**
 *  Component Definition
 *
 * @export
 * @class Modal
 * @implements {ng.IComponentOptions}
 */
export class Modal implements ng.IComponentOptions {

  /**
   * Controller used with Component
   *
   * @type {Function}
   */
  public controller: Function = ModalController

  /**
   * Template used with Component
   *
   * @type {string}
   */
  public template: string = require('./modal.html').toString()

  /**
   * Object containing pairs Directive Bindings for Component
   *
   * @type {Object}
   */
  public bindings: { [binding: string]: string; } = {
    $router: '<',
    modalBackdrop: '<',
    modalKeyboard: '<',
    modalClass: '@',
    modalCreated: '&',
    modalShown: '&',
    modalHidden: '&',
    modalAnimation: '@',
    navigateOnClosing: '<'
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

  public transclude: boolean = true
}

/**
 * Modal - Controller
 *
 * @export
 * @class ModalController
 */
export class ModalController {
  private $modal: any
  private $backdrop: any
  private $router: ng.Router
  private visible: boolean
  private navigateOnClosing: any[]
  private result: ModalResult
  private modalKeyboard: boolean
  private modalBackdrop: boolean | string
  private modalAnimation: string
  private modalClass: string
  private modalCreated: Function
  private modalShown: Function
  private modalHidden: Function

  /**
   * @param {*} $log Angular Log Service
   * @param {*} AngularServices Angular Services Convenience Service
   * @param {*} AppServices App Services Convenience Service
   */
  /*@ngInject*/
   constructor(public $log: any, public $window: ng.IWindowService, public $q: ng.IQService,public $element:ng.IRootElementService,public $attrs:ng.IAttributes) {
    this.$log = $log.getInstance('Modal');
    this.$log.debug('constructor')
    this.$modal = $element.children('#modal')
    this.modalBackdrop = this.modalBackdrop || true
    this.modalKeyboard = this.modalKeyboard || true
    this.modalAnimation = this.modalAnimation || 'in'
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
    return this.hide().then(() => {
          if (this.$modal) {
              this.$modal.off('shown.bs.modal', this.onModalShown)
              this.$modal.off('hidden.bs.modal', this.onModalHidden)
              this.$modal.data('bs.modal', null);
              this.$modal.remove();
          }
      });
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
    this.$modal.on('shown.bs.modal', this.onModalShown)
    this.$modal.on('hidden.bs.modal', this.onModalHidden)
    this.modalCreated({ api : {
        close:() =>  { return this.close() },
        dismiss:() =>  { return this.dismiss() },
        open:() =>  { return this.open() }
      }
    })
  }

  public open(): ng.IPromise<void> {
    return this.show();
  }

  public close(): ng.IPromise<ModalResult> {
    this.result = ModalResult.Close;
    return this.hide();
  }

  public dismiss(): ng.IPromise<ModalResult> {
    this.result = ModalResult.Dismiss;
    return this.hide();
  }

  public getCssClasses(): string {
    let classes: string[] = [];

    if (this.modalAnimation !== '') {
        classes.push(this.modalAnimation);
    }

    if (this.modalClass !== '') {
        classes.push(this.modalClass);
    }

    return classes.join(' ');
  }

  private onModalShown = () => {
    this.visible = true;
  }

  private onModalHidden = () => {
    this.result = (!this.result || this.result === ModalResult.None)
                ? ModalResult.Close : this.result;

    this.visible = false;
    this.modalHidden({reason: this.result});
    if(!!this.navigateOnClosing && this.result !== ModalResult.Dismiss) {
      this.$router.navigate(this.navigateOnClosing)
    }
  }

  private show(): ng.IPromise<void> {
    let defer = this.$q.defer<void>()
    this.$modal.one('shown.bs.modal', () => {
        this.modalShown();
        defer.resolve()
    })
    this.$modal.modal();
    return defer.promise;
  }

  private hide(): ng.IPromise<ModalResult> {
    let defer = this.$q.defer<ModalResult>()
    if (this.$modal && this.visible) {
        this.$modal.one('hidden.bs.modal', () => {
            defer.resolve()
        })
        this.$modal.modal('hide');
    }else{
      defer.resolve(this.result)
    }
    return defer.promise;
  }
}

export enum ModalResult {
    None,
    Close,
    Dismiss
}
