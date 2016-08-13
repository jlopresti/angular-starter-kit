/**
 *  <Desription of Service here>
 *
 * @export
 * @class CacheService
 */
export class CacheService {
  private lastHostComponent: string;
  private cache : ng.ICacheObject;
  private parser:any;
  /**
   * @param {$log} $log - Angular logging Service.
   */
  /*@ngInject*/
  constructor(private $rootScope: ng.IRootScopeService, private $rootRouter: RouterExtended,
  $cacheFactory: ng.ICacheFactoryService, public $$directiveIntrospector:any, public $location:any, public $document:any,
   public $injector:any) {
      this.cache = $cacheFactory.get('test') || $cacheFactory('test')
      this.parser = $document[0].createElement('a')
      this.$rootScope.$on('$locationChangeStart', (event, next, prev) => {
        // if(!!this.lastHostComponent && this.lastHostComponent !== this.$rootRouter._childRouter.hostComponent){
        //   this.cache.removeAll();
        // }
        this.parser.href = next;
        let url = this.parser.hash.replace('#', '')
        $rootRouter.recognize(url).then((instr) =>{
          let reuseData = this.canReuseCacheDataOne(instr);
          if(!reuseData){
            this.cache.removeAll();
          }
        });
      });
  }

  private canReuseCacheDataOne(nextInstruction: ng.Instruction): boolean {
     let reuseCacheData = false;
      if (!!nextInstruction.child) {
        reuseCacheData = this.canReuseCacheDataOne(nextInstruction.child);
      }

      if(reuseCacheData === true){
        return true;
      }

      var hook = this.getHook(nextInstruction.component.componentType);
      if(!!hook){
        return hook()
      }

      return false;
  }

  private getHook(directiveName) {
    var factory = this. $$directiveIntrospector.getTypeByName(directiveName);
    let that=this;
    return factory && factory.$canReuseCachedData && function () {
      return that.$injector.invoke(factory.$canReuseCachedData, null, {
      });
    }
  }

}
