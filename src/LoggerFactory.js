/**
 * @typedef {import('./ILoggerFactory.js').LoggerFactoryProperties} LoggerFactoryProperties
 * @typedef {import('./ILoggerFactory.js').LoggerFactoryParams} LoggerFactoryParams
 */

/**
 * @typedef {import('./ILoggerFactory.js').ILoggerFactory} ILoggerFactory
 * @implements {ILoggerFactory}
 */
export default class LoggerFactory {
  /** @type {LoggerFactoryProperties['Logger']} */
  #Class;

  /** @type {LoggerFactoryProperties['DomainLogger']} */
  #DomainClass;

  /** @param {LoggerFactoryParams} params */
  constructor({
    Logger,
    DomainLogger
  }) {
    this.#Class = Logger;
    this.#DomainClass = DomainLogger;
  }

  /** @type {ILoggerFactory['create']} */
  create(params) {
    return new this.#Class(params);
  }

  /** @type {ILoggerFactory['createDomain']} */
  createDomain(params) {
    return new this.#DomainClass(params);
  }
}
