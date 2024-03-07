/**
 * @typedef {import('./ILevel.js').LoggerLevel} LoggerLevel
 * @typedef {import('./ILevel.js').LoggerStringLevel} LoggerStringLevel
 * @typedef {import('./ILevel.js').LoggerNumberLevel} LoggerNumberLevel
 */

/**
 * @typedef {import('./channels/IChannel.js').LoggerChannels} LoggerChannels
 * 
 * @typedef {import('./channels/IChannel.js').LoggerChannelConfigs} LoggerChannelConfigs
 * 
 * @typedef {import('./channels/IChannel.js').LoggerChannelConfigsParams} LoggerChannelConfigsParams
 * @typedef {import('./channels/IChannel.js').LoggerChannelsConfigsParams} LoggerChannelsConfigsParams
 */

/**
 * @typedef {object} LoggerDependencies
 * @property {LoggerChannels} channels
 * 
 * @typedef {object} LoggerConfigsParams
 * @property {LoggerLevel=} level
 * @property {LoggerStringLevel[]=} levels
 * @property {LoggerChannelsConfigsParams=} channels
 * 
 * @typedef {object} LoggerConfigs
 * @property {LoggerNumberLevel[]} levels
 * @property {Record<string, LoggerChannelConfigs>} channelsConfigs
 * 
 * @typedef {LoggerDependencies & LoggerConfigs} LoggerProperties
 * 
 * @typedef {LoggerDependencies} LoggerParams
 */

/**
 * @typedef {object} ILogger
 * @property {(params: { configs: LoggerConfigsParams }) => void} setup
 * @property {() => LoggerNumberLevel[]} getLevels
 * @property {(level: LoggerLevel) => void} setLevel
 * @property {(levels: LoggerStringLevel[]) => void} setLevels
 * @property {(channels: LoggerChannels) => void} setChannels
 * @property {(channelName: string, channelConfigs: LoggerChannelConfigsParams) => void} setChannelConfigs
 * @property {(channelsConfigs: LoggerChannelsConfigsParams) => void} setChannelsConfigs
 * 
 * @property {LoggerLevelCallback} trace
 * @property {LoggerLevelCallback} debug
 * @property {LoggerLevelCallback} info
 * @property {LoggerLevelCallback} warn
 * @property {LoggerLevelCallback} error
 * @property {LoggerLevelCallback} fatal
 */

/**
 * @typedef {new (params: LoggerParams) => ILogger} ILoggerConstructable
 */

/**
 * @callback LoggerLevelCallback
 * @param {any} message
 * @param {LoggerMetadata=} metadata
 * @returns {Promise<void>}
 */

/**
 * @typedef {object} LoggerMetadata
 * @property {string=} organization - Organization or project name
 * @property {string=} context - Bounded Context name
 * @property {string=} app - Application name
 * @property {string=} sourceClass - Class name
 * @property {string=} correlationId - Correlation Id
 */
