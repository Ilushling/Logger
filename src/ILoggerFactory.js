/**
 * @typedef {object} ILoggerFactory
 * @property {(params: LoggerParams) => ILogger} create
 * @property {(params: DomainLoggerParams) => IDomainLogger} createDomain
 */

/**
 * @typedef {LoggerFactoryProperties} LoggerFactoryParams
 * 
 * @typedef {object} LoggerFactoryProperties
 * @property {LoggerConstructable} Logger
 * @property {IDomainLoggerConstructable} DomainLogger
 */

/**
 * @typedef {import('./ILogger.js').ILogger} ILogger
 * @typedef {import('./Logger.js').LoggerConstructable} LoggerConstructable
 * @typedef {import('./Logger.js').LoggerParams} LoggerParams
 * 
 * @typedef {import('./IDomainLogger.js').IDomainLogger} IDomainLogger
 * @typedef {import('./DomainLogger.js').IDomainLoggerConstructable} IDomainLoggerConstructable
 * @typedef {import('./DomainLogger.js').DomainLoggerParams} DomainLoggerParams
 */
