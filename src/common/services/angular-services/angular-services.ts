/**
 * Utility to combine the most common angular services into a single DI point to manage complex DI chains in features & components.
 *
 * @export
 * @class AngularServices
 */
export class AngularServices {
  public static $inject: [string] = [
    '$log',
    '$document',
    '$filter',
    '$http',
    '$interval',
    '$location',
    '$q',
    '$rootScope',
    '$timeout',
    '$window',
  ]

  /**
   * @param {$log} $log - Angular logging Service.
   * @param {$document} $document - Angular Document Service.
   * @param {$filter} $filter - Angular Filter Service.
   * @param {$http} $http - Angular HTTP Request Service.
   * @param {$interval} $interval - Angular Interval Service.
   * @param {$location} $location - Angular Location Service.
   * @param {$q} $q - Angular Promise Implementation Service.
   * @param {$rootScope} $rootScope - Angular RootScope Service.
   * @param {$timeout} $timeout - Angular Timeout Service.
   * @param {$window} $window - Angular Window Service.
   */
  constructor(
    public $log: any,
    public $document: any,
    public $filter: any,
    public $http: any,
    public $interval: any,
    public $location: any,
    public $q: any,
    public $rootScope: any,
    public $timeout: any,
    public $window: any) {

    // can't use $log here as we want $log not $log.getInstance used by anything using AngularServices.$log
    this.$log = $log.getInstance('AngularServices', false)
    this.$log.debug('constructor')
  }

}
