import {assert, expect} from 'chai';

describe('Service::DevTools', () => {
  let DevTools: any
  let domains: [string] = ['localhost', '127.0.0.1', 'domain.com']

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

    it('should have a $location service ', () => {
      assert.isDefined(DevTools.$location);
    })
  })

  describe('::isDevelopmentEnvironment()', () => {
    it('should be defined', () => {
      assert.isDefined(DevTools.isDevelopmentEnvironment);
    })

    it('should return true when whitelisted domain is found', () => {
      expect(DevTools.isDevelopmentEnvironment(domains[0])).to.be.true
      expect(DevTools.isDevelopmentEnvironment(domains[1])).to.be.true
      expect(DevTools.isDevelopmentEnvironment(domains[2])).to.be.false
    })
  })

  describe('::togglePerformanceStats()', () => {
    it('should be defined', () => {
      assert.isDefined(DevTools.togglePerformanceStats)
    })

    it('should be be able to be called with only one argument', () => {
      let performanceBarIsVisible = DevTools.togglePerformanceStats(domains[0])
      expect(performanceBarIsVisible).to.be.false
    })

    it('should only allow performance bar to be visible on development environment', () => {
      // valid development domain made visible

      let performanceBarIsVisible = DevTools.togglePerformanceStats(domains[0], true)
      expect(performanceBarIsVisible).to.be.true

      // valid development domain made hidden
      performanceBarIsVisible = DevTools.togglePerformanceStats(domains[1], false)
      expect(performanceBarIsVisible).to.be.false

      // invalid development domain made visible
      performanceBarIsVisible = DevTools.togglePerformanceStats(domains[2], true)
      expect(performanceBarIsVisible).to.be.false
    })
  })

})
