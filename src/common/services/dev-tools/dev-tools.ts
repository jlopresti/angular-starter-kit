/**
 * Utilities for things related to Development
 *
 * @export
 * @class DevTools
 */
export class DevTools {
  public static $inject: [string] = ['$log', '$location']

  public performanceBarIsVisible: boolean

  /**
   * @param {$log} $log - Angular logging Service.
   * @param {$location} $location - Angular Location Service.
   */
  constructor(public $log: any, public $location: any) {
    this.$log = $log.getInstance('DevTools', false)
    this.$log.debug('constructor')
    this.performanceBarIsVisible = this.togglePerformanceStats(this.$location.host(), true)
  }

  /**
   * Check a domain to see if it is a valid development server.
   * @param {string} domain - Domain name of server app is running on.
   * @return {boolean}
   */
  public isDevelopmentEnvironment(domain: string): boolean {
    let r: boolean = false
    // check if domain is whitelisted as a development environment
    if (domain === 'localhost' || domain === '127.0.0.1') {
      r = true
    }
    return r
  }

  /**
   * Control visibility of performance stats bar.
   * @param {string} domain - Domain name of server app is running on.
   * @param {boolean} wantsToBeVisible - Visibility state to attempt to apply to performance stats.
   */
  public togglePerformanceStats(domain: string, wantsToBeVisible: boolean = false): boolean {
    let r: boolean = false
    if (wantsToBeVisible) {
      // only make performance stats visible when on a devlopment envionrment
      r = this.isDevelopmentEnvironment(domain)
    }
    return r
  }

}
