/**
 * @typedef {import('../ILevel.js').LoggerLevel} LoggerLevel
 * @typedef {import('../ILevel.js').LoggerStringLevel} LoggerStringLevel
 * @typedef {import('../ILevel.js').LoggerNumberLevel} LoggerNumberLevel
 */

/**
 * @typedef {import('../ILogger.js').LoggerOptions} LoggerOptions
 */

/**
 * @typedef {Record<LoggerStringLevel, LoggerChannelLevelCallback>} ILoggerChannel
 */

/**
 * @callback LoggerChannelLevelCallback
 * @param {any} message
 * @param {LoggerOptions=} options
 * @returns {any}
 * 
 * @typedef {Record<string, ILoggerChannel>} LoggerChannels
 * 
 * @typedef {object} LoggerChannelConfigs
 * @property {LoggerNumberLevel[]} levels
 * 
 * @typedef {object} LoggerChannelConfigParams
 * @property {LoggerLevel=} level
 * @property {LoggerStringLevel[]=} levels
 * 
 * @typedef {Record<string, LoggerChannelConfigParams>} LoggerChannelsConfigParams
 */
