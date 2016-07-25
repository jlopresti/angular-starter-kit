import {assert, expect} from 'chai';

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
        logoImagePath: 'assets/img/angularjs-logo.png',
        version: '1.x',
      }

      // generate component with angular.mocks helper service
      component = $componentController('angularLogo', locals, bindings)

      // trigger init on component, $componentController doesn't currently
      component.$onInit()
    }))

    describe('::constructor()', () => {
      it('should have a $log service ', () => {
        assert.isDefined(component.$log);
      })

      it('should contain AngularServices', () => {
        assert.isDefined(component.AngularServices);
      })

      it('should contain AppServices', () => {
        assert.isDefined(component.AppServices);
      })
    })

    describe('::bindings', () => {
      it('should accept an logoImagePath binding', () => {
        assert.isDefined(component.logoImagePath);
        expect(component.logoImagePath).to.equal('assets/img/angularjs-logo.png')
      })

      it('should accept a version binding', () => {
        assert.isDefined(component.version);
        expect(component.version).to.equal('1.x')
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
          assert.isDefined(component.logoImagePath);
          expect(component.logoImagePath).to.equal('assets/img/angularjs-logo.png')
        })

        it('should contain a default value for version', () => {
          assert.isDefined(component.version);
          expect(component.version).to.equal(angular.version.full)
        })
    })
  })

})
