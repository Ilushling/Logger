/**
 * @typedef {object} ILogger
 * @property {(params: LoggerSetupParams) => void} setup
 * 
 * @property {LoggerLevelCallback} trace
 * @property {LoggerLevelCallback} debug
 * @property {LoggerLevelCallback} info
 * @property {LoggerLevelCallback} warn
 * @property {LoggerLevelCallback} error
 * @property {LoggerLevelCallback} fatal
 * 
 * @property {() => LoggerStringLevel[]} getLevels
 * @property {(level: LoggerLevel) => void} setLevel
 * @property {(levels: LoggerStringLevel[]) => void} setLevels
 */

/**
 * @typedef {object} LoggerSetupParams
 * @property {LoggerLevel=} level
 * @property {LoggerStringLevel[]=} levels
 */

/**
 * @callback LoggerLevelCallback
 * @param {unknown} message
 * @param {LoggerOptions=} options
 * @returns {Promise<void> | void}
 */

/**
 * @typedef {object} LoggerOptions
 * @property {unknown=} prefix
 * @property {unknown=} postfix
 * @property {LoggerMetadata=} metadata
 * 
 * @typedef {object} LoggerMetadata
 * @property {string=} organization - Organization or project name
 * @property {string=} context - Bounded Context name
 * @property {string=} app - Application name
 * @property {string=} sourceClass - Class name
 * @property {string=} correlationId - Correlation Id
 */

/**
 * @typedef {import('./ILevel.js').LoggerLevel} LoggerLevel
 * @typedef {import('./ILevel.js').LoggerStringLevel} LoggerStringLevel
 * @typedef {import('./ILevel.js').LoggerNumberLevel} LoggerNumberLevel
 */

/**
 * @typedef {import('./channels/IChannel.js').ILoggerChannel} ILoggerChannel
 */
