import {assert} from 'chai';

describe('Component::DeveloperBar', () => {

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
    let bindings: any = {}

    // generate component with angular.mocks helper service
    component = $componentController('developerBar', locals, bindings)

    // trigger init on component, $componentController doesn't currently
    component.$onInit()
  }))

  describe('::constructor()', () => {
    it('should have a $log service ', () => {
      assert.isDefined(component.$log);
    })
  })

  describe('::internals', () => {
    it('should have a list of links', () => {
      assert.isDefined(component.links);
    })
  })

})


