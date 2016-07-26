/**
 * Utilities for things related to Development
 *
 * @export
 * @class DevTools
 */
export class DevTools {
  public static $inject: [string] = ['$log']

  /**
   * @param {$log} $log - Angular logging Service.
   * @param {$location} $location - Angular Location Service.
   */
  constructor(public $log: any) {
    this.$log = $log.getInstance('DevTools')
    this.$log.debug('constructor')
  }

  /**
   * Check a domain to see if it is a valid development server.
   * @param {string} domain - Domain name of server app is running on.
   * @return {boolean}
   */
  public isDevelopmentEnvironment(domain: string): boolean {
    return __DEV__
  }
}
