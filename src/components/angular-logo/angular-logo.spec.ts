describe('Component::AngularLogo', () => {

  // run tests against component with binding data passed in
  describe('::with binding data', () => {

    // component to run each test against
    let component: any

    // load app module so we can access everything
    beforeEach(window.module('app'))

    // inject required DI for test and component
    beforeEach(inject(($rootScope: any, $componentController: any) => {
      // a scope is always required for a component to attach to
      let locals: any = {
        $scope: $rootScope.$new()
      }

      // bindings data to compile component against
      let bindings: any = {
        logoImagePath: 'assets/angularjs-logo.png',
        version: '1.x',
      }

      // generate component with angular.mocks helper service
      component = $componentController('angularLogo', locals, bindings)

      // trigger init on component, $componentController doesn't currently
      component.$onInit()
    }))

    describe('::constructor()', () => {
      it('should have a $log service ', () => {
        expect(component.$log).toBeDefined()
      })

      it('should contain AngularServices', () => {
        expect(component.AngularServices).toBeDefined()
      })

      it('should contain AppServices', () => {
        expect(component.AppServices).toBeDefined()
      })
    })

    describe('::bindings', () => {
      it('should accept an logoImagePath binding', () => {
        expect(component.logoImagePath).toBeDefined()
        expect(component.logoImagePath).toEqual('assets/angularjs-logo.png')
      })

      it('should accept a version binding', () => {
        expect(component.version).toBeDefined()
        expect(component.version).toEqual('1.x')
      })
    })
  })

  // run tests against component with any default bindings
  describe('::with default bindings', () => {

    // component to run each test against
    let component: any

    // load app modules so we access everything
    beforeEach(window.module('app'))

    beforeEach(inject(($rootScope: any, $componentController: any) => {
      // a scope is always required to attach a component to
      let locals: any = {
        $scope: $rootScope.$new()
      }

      // bindings data to compile component against
      let bindings: any = {}

      // generate component with angular.mocks helper service
      component = $componentController('angularLogo', locals, bindings)

      // trigger init on component, $componentController doesn't currently
      component.$onInit()
    }))

    describe('::bindings', () => {
        // confirm default bindings work as expected
        it('should contain a default value for logoImagePath', () => {
          expect(component.logoImagePath).toBeDefined()
          expect(component.logoImagePath).toEqual('assets/angularjs-logo.png')
        })

        it('should contain a default value for version', () => {
          expect(component.version).toBeDefined()
          expect(component.version).toEqual(angular.version.full)
        })
    })
  })

})
