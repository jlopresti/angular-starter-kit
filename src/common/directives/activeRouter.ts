export class ActiveRouterDirective implements ng.IDirective {
    public restrict = 'A';
    public require = '?^^ngOutlet';

    public static Factory() {
      /*@ngInject*/
      let directive = ($rootScope: ng.IRootScopeService, $rootRouter: ng.Router, $parse: ng.IParseService) => {
        return new ActiveRouterDirective($rootScope, $rootRouter, $parse);
      }
      return directive;
    }

    constructor(private $rootScope: ng.IRootScopeService, private $rootRouter: ng.Router, private $parse: ng.IParseService) {
    }

    public link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: RouterActiveAttributes, ctrl: any) => {
      let router: ng.Router = (ctrl && ctrl.$$router) || this.$rootRouter;
      if (!router) {
          return;
      }

      let link = this.findNgLink(attrs, element);

      let routeParamsGetter = this.$parse(link);
      let params = routeParamsGetter(scope);
      let instruction = router.generate(params);
      let className = attrs.routerActive || 'active';

      let off = this.$rootScope.$on('$routeChangeSuccess', () => {
          let isActive: boolean = router.isRouteActive(instruction);

          if (isActive) {
              element.addClass(className);
          } else {
              element.removeClass(className);
          }
      });

      scope.$on('$destroy', off);
    }

    private findNgLink(attrs: RouterActiveAttributes, element: ng.IAugmentedJQuery): string {
        let result = '';
        if (attrs.ngLink) {
            return attrs.ngLink;
        }

        let link = angular.element(element[0].querySelector('[ng-link]'));
        if (link) {
            let ngLink = link[0].attributes['ng-link'];

            if (ngLink) {
                result = ngLink.value;
            }
        }
        return result;
    }

}
