import {assert, expect} from 'chai';

describe('Service::AngularServices', () => {
  let AngularServices: any

  // load app module so we can access everything
  beforeEach(window.module('app'))

  // inject service to test
  beforeEach(inject((_AngularServices_: any) => {
    AngularServices = _AngularServices_
  }))

  describe('::constructor()', () => {
    it('should have the $document service', () => {
      assert.isDefined(AngularServices.$document);
    })

    it('should have the $filter service', () => {
      assert.isDefined(AngularServices.$filter);
    })

    it('should have the $http service', () => {
      assert.isDefined(AngularServices.$http);
    })

    it('should have the $interval service', () => {
      assert.isDefined(AngularServices.$interval);
    })

    it('should have the $log service', () => {
      assert.isDefined(AngularServices.$log);
    })

    it('should have the $location service', () => {
      assert.isDefined(AngularServices.$location);
    })

    it('should have the $q service', () => {
      assert.isDefined(AngularServices.$q);
    })

    it('should have the $rootScope service', () => {
      assert.isDefined(AngularServices.$rootScope);
    })

    it('should have the $timeout service', () => {
      assert.isDefined(AngularServices.$timeout);
    })

    it('should have the $window service', () => {
      assert.isDefined(AngularServices.$window);
    })
  })
})
