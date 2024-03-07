/**
 * @typedef {import('./ILogger.js').LoggerLevelCallback} LoggerLevelCallback
 */

/**
 * @typedef {import('./ILogger.js').LoggerMetadata} LoggerMetadata
 */

/**
 * @typedef {import('./ILogger.js').ILogger} ILogger
 */

/**
 * @typedef {object} DomainLoggerProperties
 * @property {ILogger} logger
 * 
 * @property {LoggerMetadata} metadata
 * 
 * @typedef {DomainLoggerProperties} DomainLoggerParams
 */

/**
 * @typedef {object} IDomainLogger
 * @property {LoggerLevelCallback} trace
 * @property {LoggerLevelCallback} debug
 * @property {LoggerLevelCallback} info
 * @property {LoggerLevelCallback} warn
 * @property {LoggerLevelCallback} error
 * @property {LoggerLevelCallback} fatal
 */

/**
 * @typedef {new (params: DomainLoggerParams) => IDomainLogger} IDomainLoggerConstructable
 */
