import {assert, expect} from 'chai';

describe('Component::TabPane', () => {

  // component to run each test against
  let component: any
  let addPaneSpy: Sinon.SinonSpy
  // load app module so we can access everything
  beforeEach(window.module('app'))

  // load app module so we can access everything
  beforeEach(inject(($rootScope, $componentController) => {

    // a scope is always required for a component to attach to
    let locals: any = {
      $scope: $rootScope.$new()
    }
    addPaneSpy = sinon.spy()
    let tabsCtrl = $componentController('tabs',{ $scope: $rootScope.$new()}, {
      addPane: addPaneSpy
    })
    // bindings data to compile component against
    let bindings: any = {
      title: 'hello',
      tabsCtrl: tabsCtrl
    }

    // generate component with angular.mocks helper service
    component = $componentController('tabPane', locals, bindings)

    // trigger init on component, $componentController doesn't currently
    component.$onInit()
  }))

  describe('::constructor()', () => {
    it('should contain a logger', () => {
      assert.isDefined(component.$log)
    })

    it('should be added to tabs', () => {
        expect(addPaneSpy).to.have.been.calledOnce
    })

    it('should be added to tabs', () => {
        addPaneSpy.should.have.been.calledOnce
    })
  })

})
