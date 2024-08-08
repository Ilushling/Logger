/**
 * @typedef {object} IDomainLogger
 * @property {(params: DomainLoggerSetupParams) => void} setup
 * 
 * @property {LoggerLevelCallback} trace
 * @property {LoggerLevelCallback} debug
 * @property {LoggerLevelCallback} info
 * @property {LoggerLevelCallback} warn
 * @property {LoggerLevelCallback} error
 * @property {LoggerLevelCallback} fatal
 * 
 * @property {() => LoggerStringLevel[]} getLevels
 * @property {(level: LoggerLevel) => void} setLevel
 * @property {(levels: LoggerStringLevel[]) => void} setLevels
 */

/**
 * @typedef {object} DomainLoggerSetupParams
 * @property {LoggerLevel=} level
 * @property {LoggerStringLevel[]=} levels
 * @property {LoggerOptions=} options
 */

/**
 * @import {
 *  LoggerLevelCallback,
 *  LoggerOptions
 * } from './ILogger.js'
 * 
 * @import {
 *  LoggerLevel,
 *  LoggerStringLevel
 * } from './ILevel.js'
 */
