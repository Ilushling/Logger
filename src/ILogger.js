/**
 * @typedef {{
*  trace: (message: any) => any,
*  debug: (message: any) => any,
*  info: (message: any) => any,
*  warn: (message: any) => any,
*  error: (message: any) => any,
*  fatal: (message: any) => any
* }} Channel
* 
* @typedef {Record<string, Channel>} Channels
* 
* @typedef {object} ChannelConfigs
* @property {NumberLevel[]} levels
* 
* @typedef {object} ChannelConfigsParams
* @property {Level=} level
* @property {StringLevel[]=} levels
* 
* @typedef {Record<string, ChannelConfigsParams>} ChannelsConfigsParams
*/

/**
* @typedef {'all'|StringLevel|'off'} Level
* @typedef {'trace'|'debug'|'info'|'warn'|'error'|'fatal'} StringLevel
* @typedef {1|2|3|4|5|6} NumberLevel
*/

/**
* @typedef {object} LoggerDependencies
* @property {Channels} channels
* 
* @typedef {object} LoggerConfigsParams
* @property {Level=} level
* @property {StringLevel[]=} levels
* @property {ChannelsConfigsParams=} channels
* 
* @typedef {LoggerDependencies & {
*  levels: NumberLevel[],
*  channelsConfigs: Record<string, ChannelConfigs>
* }} LoggerProperties
* 
* @typedef {LoggerDependencies} LoggerParams
*/

/**
* @typedef {object} ILogger
* @property {(params: { configs: LoggerConfigsParams }) => void} setup
* @property {() => NumberLevel[]} getLevels
* @property {(level: Level) => void} setLevel
* @property {(levels: StringLevel[]) => void} setLevels
* @property {(channels: Channels) => void} setChannels
* @property {(channelName: string, channelConfigs: ChannelConfigsParams) => void} setChannelConfigs
* @property {(channelsConfigs: ChannelsConfigsParams) => void} setChannelsConfigs
* 
* @property {(message: unknown) => Promise<void>} trace
* @property {(message: unknown) => Promise<void>} debug
* @property {(message: unknown) => Promise<void>} info
* @property {(message: unknown) => Promise<void>} warn
* @property {(message: unknown) => Promise<void>} error
* @property {(message: unknown) => Promise<void>} fatal
*/