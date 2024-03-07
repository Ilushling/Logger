/**
 * @typedef {import('./ILogger.js').ILogger} ILogger
 * @typedef {import('./ILogger.js').LoggerParams} LoggerParams
 * 
 * @typedef {import('./IDomainLogger.js').IDomainLogger} IDomainLogger
 * @typedef {import('./IDomainLogger.js').DomainLoggerParams} DomainLoggerParams
 */

/**
 * @typedef {object} LoggerFactoryProperties
 * @property {import('./ILogger.js').ILoggerConstructable} Logger
 * @property {import('./IDomainLogger.js').IDomainLoggerConstructable} DomainLogger
 * 
 * @typedef {LoggerFactoryProperties} LoggerFactoryParams
 */

/**
 * @typedef {object} ILoggerFactory
 * @property {(params: LoggerParams) => ILogger} create
 * @property {(params: DomainLoggerParams) => IDomainLogger} createDomain
 * 
 * @typedef {object} ILoggerFactoryProperties
 * @property {import('./ILogger.js').ILoggerConstructable} Logger
 * @property {import('./IDomainLogger.js').IDomainLoggerConstructable} DomainLogger
 * 
 * @typedef {ILoggerFactoryProperties} ILoggerFactoryParams
 */
