/**
 * @typedef {import('../ILevel.js').LoggerLevel} LoggerLevel
 * @typedef {import('../ILevel.js').LoggerStringLevel} LoggerStringLevel
 * @typedef {import('../ILevel.js').LoggerNumberLevel} LoggerNumberLevel
 */

/**
 * @typedef {import('../ILogger.js').LoggerMetadata} LoggerMetadata
 */

/**
 * @typedef {Record<LoggerStringLevel, LoggerChannelLevelCallback>} ILoggerChannel
 */

/**
 * @callback LoggerChannelLevelCallback
 * @param {any} message
 * @param {LoggerMetadata=} metadata
 * @returns {any}
 * 
 * @typedef {Record<string, ILoggerChannel>} LoggerChannels
 * 
 * @typedef {object} LoggerChannelConfigs
 * @property {LoggerNumberLevel[]} levels
 * 
 * @typedef {object} LoggerChannelConfigsParams
 * @property {LoggerLevel=} level
 * @property {LoggerStringLevel[]=} levels
 * 
 * @typedef {Record<string, LoggerChannelConfigsParams>} LoggerChannelsConfigsParams
 */
