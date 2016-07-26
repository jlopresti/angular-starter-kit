/**
 *  <Desription of Service here>
 *
 * @export
 * @class <%= captialCaseName %>
 */
export class <%= captialCaseName %> {

  /**
   * @param {$log} $log - Angular logging Service.
   */
  /*@ngInject*/
  constructor(<%= params %>) {
    this.$log = <%= logger %>
    this.$log.debug('constructor');
  }

};
