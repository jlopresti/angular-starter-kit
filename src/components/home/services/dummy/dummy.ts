import {CacheService} from '../../../../common/services/CacheService/CacheService.ts'
/**
 *  <Desription of Service here>
 *
 * @export
 * @class Dummy
 */
export class DummyService {
  private cache: ng.ICacheObject
  /**
   * @param {$log} $log - Angular logging Service.
   */
  /*@ngInject*/
  constructor(private $log: any, $cacheFactory: ng.ICacheFactoryService, CacheService:CacheService) {
    this.$log = $log.getInstance('Dummy');
    this.$log.debug('constructor');
    this.cache =  $cacheFactory.get('test') || $cacheFactory('test')
  }

  public getDummy() : string {
    var data =  this.cache.get<string>('dummy');
    if(!!data){
      return data + 'Loaded from cache';
    }

    data = 'Hello dummy';
    this.cache.put('dummy', data);
    return data;
  }

  public getDrum() : string {
    var data =  this.cache.get<string>('drum');
    if(!!data){
      return data + 'Loaded from cache';
    }

    data = 'Hello drum';
    this.cache.put('drum', data);
    return data;
  }

  public getDump() : string {
    var data =  this.cache.get<string>('dump');
    if(!!data){
      return data + 'Loaded from cache';
    }

    data = 'Hello dump';
    this.cache.put('dump', data);
    return data;
  }
};
