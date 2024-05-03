/**
 * @implements {ILoggerFactory}
 */
export default class LoggerFactory {
  /**
   * @typedef {import('./ILoggerFactory.js').LoggerFactoryProperties} LoggerFactoryProperties
   * @typedef {import('./ILoggerFactory.js').LoggerFactoryParams} LoggerFactoryParams
   */

  /**
   * @typedef {import('./ILoggerFactory.js').ILoggerFactory} ILoggerFactory
   */

  /** @type {LoggerFactoryProperties['Logger']} */
  #Logger;

  /** @type {LoggerFactoryProperties['DomainLogger']} */
  #DomainLogger;

  /** @param {LoggerFactoryParams} params */
  constructor({
    Logger,
    DomainLogger
  }) {
    this.#Logger = Logger;
    this.#DomainLogger = DomainLogger;
  }

  /** @type {ILoggerFactory['create']} */
  create(params) {
    return new this.#Logger(params);
  }

  /** @type {ILoggerFactory['createDomain']} */
  createDomain(params) {
    return new this.#DomainLogger(params);
  }
}
