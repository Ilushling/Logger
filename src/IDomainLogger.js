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
 * @typedef {object} DomainLoggerConfigParams
 * @property {LoggerMetadata} metadata
 * 
 * @typedef {object} DomainLoggerProperties
 * @property {ILogger} logger
 * 
 * @property {LoggerMetadata=} metadata
 * 
 * @typedef {object} DomainLoggerParams
 * @property {ILogger} logger
 */

/**
 * @typedef {object} IDomainLogger
 * @property {(params: { configs: DomainLoggerConfigParams }) => void} setup
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
