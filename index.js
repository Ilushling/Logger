import DomainLogger from './src/DomainLogger.js';
import Logger from './src/Logger.js';

import LoggerFactory from './src/LoggerFactory.js';

import ConsoleLoggerChannel from './src/channels/Console.js';

export {
  Logger,
  DomainLogger,

  LoggerFactory,

  ConsoleLoggerChannel
};

/**
 * @typedef {import('./src/ILogger.js').ILogger} ILogger
 * @typedef {import('./src/ILogger.js').LoggerSetupParams} LoggerSetupParams
 * 
 * @typedef {import('./src/IDomainLogger.js').IDomainLogger} IDomainLogger
 * @typedef {import('./src/IDomainLogger.js').DomainLoggerSetupParams} DomainLoggerSetupParams
 */

/**
 * @typedef {import('./src/ILoggerFactory.js').ILoggerFactory} ILoggerFactory
 */

/**
 * @typedef {import('./src/ILevel.js').LoggerLevel} LoggerLevel
 * @typedef {import('./src/ILevel.js').LoggerStringLevel} LoggerStringLevel
 * @typedef {import('./src/ILevel.js').LoggerNumberLevel} LoggerNumberLevel
 */

/**
 * @typedef {import('./src/channels/IChannel.js').ILoggerChannel} ILoggerChannel
 * @typedef {import('./src/channels/IChannel.js').LoggerChannelSetupParams} LoggerChannelSetupParams
 * 
 * @typedef {import('./src/channels/IChannel.js').LoggerChannels} LoggerChannels
 */

/**
 * @typedef {import('./src/ILogger.js').LoggerOptions} LoggerOptions
 * @typedef {import('./src/ILogger.js').LoggerMetadata} LoggerMetadata
 */
