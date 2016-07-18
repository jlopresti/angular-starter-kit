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
      expect(DevTools.$log).toBeDefined()
    })

    it('should have a $location service ', () => {
      expect(DevTools.$location).toBeDefined()
    })
  })

  describe('::isDevelopmentEnvironment()', () => {
    it('should be defined', () => {
      expect(DevTools.isDevelopmentEnvironment).toBeDefined()
    })

    it('should return true when whitelisted domain is found', () => {
      expect(DevTools.isDevelopmentEnvironment(domains[0])).toBe(true)
      expect(DevTools.isDevelopmentEnvironment(domains[1])).toBe(true)
      expect(DevTools.isDevelopmentEnvironment(domains[2])).toBe(false)
    })
  })

  describe('::togglePerformanceStats()', () => {
    it('should be defined', () => {
      expect(DevTools.togglePerformanceStats).toBeDefined()
    })

    it('should be be able to be called with only one argument', () => {
      let performanceBarIsVisible = DevTools.togglePerformanceStats(domains[0])
      expect(performanceBarIsVisible).toBe(false)
    })

    it('should only allow performance bar to be visible on development environment', () => {
      // valid development domain made visible

      let performanceBarIsVisible = DevTools.togglePerformanceStats(domains[0], true)
      expect(performanceBarIsVisible).toBe(true)

      // valid development domain made hidden
      performanceBarIsVisible = DevTools.togglePerformanceStats(domains[1], false)
      expect(performanceBarIsVisible).toBe(false)

      // invalid development domain made visible
      performanceBarIsVisible = DevTools.togglePerformanceStats(domains[2], true)
      expect(performanceBarIsVisible).toBe(false)
    })
  })

})
