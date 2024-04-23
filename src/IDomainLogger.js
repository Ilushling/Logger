/**
 * @typedef {object} IDomainLogger
 * @property {(params: DomainLoggerSetupParams) => void} setup
 * @property {() => LoggerStringLevel[]} getLevels
 * @property {(level: LoggerLevel) => void} setLevel
 * @property {(levels: LoggerStringLevel[]) => void} setLevels
 * @property {LoggerLevelCallback} trace
 * @property {LoggerLevelCallback} debug
 * @property {LoggerLevelCallback} info
 * @property {LoggerLevelCallback} warn
 * @property {LoggerLevelCallback} error
 * @property {LoggerLevelCallback} fatal
 */

/**
 * @typedef {object} DomainLoggerDependencies
 * @property {ILogger | IDomainLogger} logger
 * 
 * @typedef {DomainLoggerDependencies & DomainLoggerConfigs} DomainLoggerProperties
 * 
 * @typedef {DomainLoggerDependencies} DomainLoggerParams
 * 
 * @typedef {object} DomainLoggerSetupParams
 * @property {LoggerLevel=} level
 * @property {LoggerStringLevel[]=} levels
 * @property {LoggerOptions=} options
 * 
 * @typedef {object} DomainLoggerConfigs
 * @property {LoggerNumberLevel[]} levels
 * @property {LoggerOptions=} options
 */

/**
 * @typedef {new (params: DomainLoggerParams) => IDomainLogger} IDomainLoggerConstructable
 */

/**
 * @typedef {import('./ILogger.js').LoggerLevelCallback} LoggerLevelCallback
 */

/**
 * @typedef {import('./ILogger.js').ILogger} ILogger
 */

/**
 * @typedef {import('./ILogger.js').LoggerOptions} LoggerOptions
 * 
 * @typedef {import('./ILevel.js').LoggerLevel} LoggerLevel
 * @typedef {import('./ILevel.js').LoggerNumberLevel} LoggerNumberLevel
 * @typedef {import('./ILevel.js').LoggerStringLevel} LoggerStringLevel
 */
