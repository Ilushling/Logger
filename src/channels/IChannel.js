/**
 * @typedef {object} ILoggerChannel
 * @property {(params: LoggerChannelSetupParams) => void} setup
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
 * @typedef {object} LoggerChannelSetupParams
 * @property {LoggerLevel=} level
 * @property {LoggerStringLevel[]=} levels
 * @property {boolean} isMask
 */

/**
 * @typedef {import('../ILevel.js').LoggerLevel} LoggerLevel
 * @typedef {import('../ILevel.js').LoggerStringLevel} LoggerStringLevel
 */

/**
 * @typedef {import('../ILogger.js').LoggerLevelCallback} LoggerLevelCallback
 */

/**
 * @typedef {Record<string, ILoggerChannel>} LoggerChannels
 */
