/**
 * @typedef {import('../ILevel.js').Level} Level
 * @typedef {import('../ILevel.js').StringLevel} StringLevel
 * @typedef {import('../ILevel.js').NumberLevel} NumberLevel
 */

/**
 * @typedef {import('../ILogger.js').LoggerMetadata} LoggerMetadata
 */

/**
 * @typedef {Record<StringLevel, LoggerChannelLevelCallback>} ILoggerChannel
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
 * @property {NumberLevel[]} levels
 * 
 * @typedef {object} LoggerChannelConfigsParams
 * @property {Level=} level
 * @property {StringLevel[]=} levels
 * 
 * @typedef {Record<string, LoggerChannelConfigsParams>} LoggerChannelsConfigsParams
 */
