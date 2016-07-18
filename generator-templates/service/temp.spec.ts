describe('Service::<%= captialCaseName %>', () => {
    let <%= captialCaseName %>

    // load app module so we can access everything
    beforeEach(window.module('app'))

    // inject service to test
    beforeEach(inject((_<%= captialCaseName %>_) => {
        <%= captialCaseName %> = _<%= captialCaseName %>_
    }))

    describe('::constructor()', () => {
      it('should have a $log service', ()=>{
          expect(<%= captialCaseName %>.$log).toBeDefined()
      })
    })

})
