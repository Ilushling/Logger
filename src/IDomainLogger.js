/**
 * @typedef {import('./ILogger.js').LoggerLevelCallback} LoggerLevelCallback
 */

/**
 * @typedef {import('./ILogger.js').LoggerOptions} LoggerOptions
 */

/**
 * @typedef {import('./ILogger.js').ILogger} ILogger
 */

/**
 * @typedef {object} DomainLoggerDependencies
 * @property {ILogger | IDomainLogger} logger
 * 
 * @typedef {DomainLoggerDependencies & {
 *  configs?: DomainLoggerConfigs
 * }} DomainLoggerProperties
 * 
 * @typedef {DomainLoggerDependencies} DomainLoggerParams
 * 
 * @typedef {object} DomainLoggerSetupParams
 * @property {DomainLoggerConfigParams} configs
 * 
 * @typedef {object} DomainLoggerConfigParams
 * @property {LoggerOptions} options
 * 
 * @typedef {DomainLoggerConfigParams} DomainLoggerConfigs
 */

/**
 * @typedef {object} IDomainLogger
 * @property {(params: DomainLoggerSetupParams) => void} setup
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
