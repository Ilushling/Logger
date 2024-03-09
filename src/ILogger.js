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
 * @typedef {import('./channels/IChannel.js').LoggerChannelConfigParams} LoggerChannelConfigParams
 * @typedef {import('./channels/IChannel.js').LoggerChannelsConfigParams} LoggerChannelsConfigParams
 */

/**
 * @typedef {object} LoggerDependencies
 * @property {LoggerChannels} channels
 * 
 * @typedef {object} LoggerConfigParams
 * @property {LoggerLevel=} level
 * @property {LoggerStringLevel[]=} levels
 * @property {LoggerChannelsConfigParams=} channels
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
 * @property {(params: { configs: LoggerConfigParams }) => void} setup
 * @property {() => LoggerStringLevel[]} getLevels
 * @property {(level: LoggerLevel) => void} setLevel
 * @property {(levels: LoggerStringLevel[]) => void} setLevels
 * @property {(channels: LoggerChannels) => void} setChannels
 * @property {(channelName: string, channelConfigs: LoggerChannelConfigParams) => void} setChannelConfigs
 * @property {(channelsConfigs: LoggerChannelsConfigParams) => void} setChannelsConfigs
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
