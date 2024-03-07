import DomainLogger from './src/DomainLogger.js';
import Logger from './src/Logger.js';

import LoggerFactory from './src/LoggerFactory.js';

export {
  Logger,
  DomainLogger,

  LoggerFactory
};

/**
 * @typedef {import('./src/ILogger.js').ILogger} ILogger
 * @typedef {import('./src/IDomainLogger.js').IDomainLogger} IDomainLogger
 * 
 * @typedef {import('./src/ILoggerFactory.js').ILoggerFactory} ILoggerFactory
 */

/**
 * @typedef {import('./src/ILevel.js').Level} Level
 * @typedef {import('./src/ILevel.js').StringLevel} StringLevel
 * @typedef {import('./src/ILevel.js').NumberLevel} NumberLevel
 */

/**
 * @typedef {import('./src/channels/IChannel.js').ILoggerChannel} ILoggerChannel
 * @typedef {import('./src/channels/IChannel.js').LoggerChannels} LoggerChannels
 * 
 * @typedef {import('./src/channels/IChannel.js').LoggerChannelConfigs} LoggerChannelConfigs
 * 
 * @typedef {import('./src/channels/IChannel.js').LoggerChannelConfigsParams} LoggerChannelConfigsParams
 * @typedef {import('./src/channels/IChannel.js').LoggerChannelsConfigsParams} LoggerChannelsConfigsParams
 */

/**
 * @typedef {import('./src/ILogger.js').LoggerMetadata} LoggerMetadata
 */
