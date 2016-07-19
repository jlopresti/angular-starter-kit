import {assert, expect} from 'chai';

describe('Service::AppServices', () => {
    let AppServices: any

    // load app module so we can access everything
    beforeEach(window.module('app'))

    // inject service to test
    beforeEach(inject((_AppServices_: any) => {
        AppServices = _AppServices_
    }))

    describe('::constructor()', () => {
      it('should have a $log service', () => {
          assert.isDefined(AppServices.$log);
      })

      it('should have DevTools', () => {
        assert.isDefined(AppServices.DevTools);
      })
    })

})
