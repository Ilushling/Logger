/**
 * @import { ILoggerFactory } from './ILoggerFactory.js'
 * 
 * @import { LoggerConstructable } from './Logger.js'
 * @import { DomainLoggerConstructable } from './DomainLogger.js'
 */

/**
 * @implements {ILoggerFactory}
 */
export default class LoggerFactory {
  /**
   * @typedef {LoggerFactoryDependencies} LoggerFactoryParams
   * @typedef {LoggerFactoryDependencies} LoggerFactoryProperties
   * 
   * @typedef {object} LoggerFactoryDependencies
   * @property {LoggerConstructable} Logger
   * @property {DomainLoggerConstructable} DomainLogger
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
