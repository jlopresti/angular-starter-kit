import {assert, expect} from 'chai';

describe('Service::DevTools', () => {
  let DevTools: any

  // load app module so we can access everything
  beforeEach(window.module('app'))

  // inject service to test
  beforeEach(inject((_DevTools_) => {
    DevTools = _DevTools_
  }))

  describe('::constructor()', () => {
    it('should have a $log service ', () => {
      assert.isDefined(DevTools.$log);
    })
  })

  describe('::isDevelopmentEnvironment()', () => {
    it('should be defined', () => {
      assert.isDefined(DevTools.isDevelopmentEnvironment);
    })

    it('should return true when whitelisted domain is found', () => {
      expect(DevTools.isDevelopmentEnvironment()).to.be.equals(__DEV__)
    })
  })

})
