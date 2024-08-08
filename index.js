import DomainLogger from './src/DomainLogger.js';
import Logger from './src/Logger.js';

import LoggerFactory from './src/LoggerFactory.js';

import ConsoleLoggerChannel from './src/channels/Console.js';

/**
 * @import {
 *  ILogger,
 *  LoggerSetupParams,
 *  LoggerOptions,
 *  LoggerMetadata
 * } from './src/ILogger.js'
 * @import { IDomainLogger, DomainLoggerSetupParams } from './src/IDomainLogger.js'
 * 
 * @import { ILoggerFactory } from './src/ILoggerFactory.js'
 * 
 * @import {
 *  ILoggerChannel,
 *  LoggerChannelSetupParams
 * } from './src/channels/IChannel.js'
 * 
 * @import {
 *  LoggerLevel,
 *  LoggerStringLevel,
 *  LoggerNumberLevel
 * } from './src/ILevel.js'
 */

export {
  Logger,
  DomainLogger,

  LoggerFactory,

  ConsoleLoggerChannel
};

/**
 * @typedef {ILogger} ILogger
 * @typedef {LoggerSetupParams} LoggerSetupParams
 * 
 * @typedef {IDomainLogger} IDomainLogger
 * @typedef {DomainLoggerSetupParams} DomainLoggerSetupParams
 */

/**
 * @typedef {ILoggerFactory} ILoggerFactory
 */

/**
 * @typedef {ILoggerChannel} ILoggerChannel
 * @typedef {LoggerChannelSetupParams} LoggerChannelSetupParams
 */

/**
 * @typedef {LoggerLevel} LoggerLevel
 * @typedef {LoggerStringLevel} LoggerStringLevel
 * @typedef {LoggerNumberLevel} LoggerNumberLevel
 */

/**
 * @typedef {LoggerOptions} LoggerOptions
 * @typedef {LoggerMetadata} LoggerMetadata
 */
