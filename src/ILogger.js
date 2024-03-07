/**
 * @typedef {import('./ILevel.js').Level} Level
 * @typedef {import('./ILevel.js').StringLevel} StringLevel
 * @typedef {import('./ILevel.js').NumberLevel} NumberLevel
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
 * @property {Level=} level
 * @property {StringLevel[]=} levels
 * @property {LoggerChannelsConfigsParams=} channels
 * 
 * @typedef {object} LoggerConfigs
 * @property {NumberLevel[]} levels
 * @property {Record<string, LoggerChannelConfigs>} channelsConfigs
 * 
 * @typedef {LoggerDependencies & LoggerConfigs} LoggerProperties
 * 
 * @typedef {LoggerDependencies} LoggerParams
 */

/**
 * @typedef {object} ILogger
 * @property {(params: { configs: LoggerConfigsParams }) => void} setup
 * @property {() => NumberLevel[]} getLevels
 * @property {(level: Level) => void} setLevel
 * @property {(levels: StringLevel[]) => void} setLevels
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
