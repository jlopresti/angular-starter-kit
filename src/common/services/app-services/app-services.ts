/**
 * Utility to combine the Apps Services into a single DI point to manage complex DI chains in App Components and Services.
 *
 * @export
 * @class AppServices
 */
export class AppServices {
  public static $inject: [string] = ['$log', 'DevTools']

  /**
   * @param {$log} $log - Angular logging Service.
   */
  constructor(public $log: any, public DevTools: any) {
    this.$log = $log.getInstance('AppServices', false)
    this.$log.debug('constructor')
  }

}
