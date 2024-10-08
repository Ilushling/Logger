/**
 * @import {
 *  ILogger,
 *  LoggerOptions
 * } from './ILogger.js'
 * 
 * @import { ILoggerChannel } from './channels/IChannel.js'
 * 
 * @import {
 *  LoggerLevel,
 *  LoggerStringLevel,
 *  LoggerNumberLevel
 * } from './ILevel.js'
 */

/**
 * @typedef {new (params: LoggerParams) => ILogger} LoggerConstructable
 * @typedef {LoggerDependencies} LoggerParams
 */

/**
 * @implements {ILogger}
 */
export default class Logger {
  /**
   * @typedef {LoggerDependencies
   *  & LoggerConfigs
   *  & LoggerConstants} LoggerProperties
   * 
   * @typedef {object} LoggerDependencies
   * @property {LoggerChannels} channels
   * 
   * @typedef {object} LoggerConfigs
   * @property {LoggerNumberLevel[]} levels
   * 
   * @typedef {object} LoggerConstants
   * @property {Record<LoggerStringLevel, LoggerNumberLevel>} NUMBER_LEVELS
   * @property {Record<LoggerNumberLevel, LoggerStringLevel>} STRING_LEVELS
   * @property {LoggerLevel[]} LEVELS
   * @property {LoggerNumberLevel} MAX_NUMBER_LEVEL
   */

  /**
   * @typedef {Record<string, ILoggerChannel>} LoggerChannels
   */

  // Dependencies
  /** @type {LoggerProperties['channels']} */
  #channels;

  // Configs
  /** @type {LoggerProperties['levels']} */
  #levels;

  /** @type {LoggerProperties['NUMBER_LEVELS']} */
  #NUMBER_LEVELS = {
    trace: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
    fatal: 6
  };

  /** @type {LoggerProperties['STRING_LEVELS']} */
  #STRING_LEVELS = {
    1: 'trace',
    2: 'debug',
    3: 'info',
    4: 'warn',
    5: 'error',
    6: 'fatal'
  };

  /** @type {LoggerProperties['LEVELS']} */
  #LEVELS = [
    'all',
    'trace',
    'debug',
    'info',
    'warn',
    'error',
    'fatal',
    'off'
  ];

  /** @type {LoggerProperties['MAX_NUMBER_LEVEL']} */
  #MAX_NUMBER_LEVEL = 6;

  /** @param {LoggerParams} params */
  constructor({
    channels
  }) {
    this.#channels = channels;

    this.#levels = [];
  }

  //#region Configs
  /** @type {ILogger['setup']} */
  setup({ level, levels }) {
    if (level != null) {
      this.setLevel(level);
    } else if (levels != null) {
      this.setLevels(levels);
    }
  }

  /** @type {ILogger['getLevels']} */
  getLevels() {
    return this.#levels.map(level => this.#numberLevelToString(level));
  }

  /** @type {ILogger['setLevel']} */
  setLevel(level) {
    const LEVELS = this.#LEVELS;

    if (!LEVELS.includes(level)) {
      throw this.#createInvalidLevelError(level);
    }

    const currentLevels = this.#levels;
    currentLevels.length = 0;

    const numberLevel = this.#levelToNumber(level);

    if (numberLevel == null) {
      return;
    }

    /** @type {LoggerNumberLevel} */
    let i = numberLevel;
    const count = this.#MAX_NUMBER_LEVEL + 1;
    for (; i < count; i++) {
      currentLevels.push(i);
    }
  }

  /** @type {ILogger['setLevels']} */
  setLevels(levels) {
    const NUMBER_LEVELS = this.#NUMBER_LEVELS;

    levels.forEach(level => {
      if (!(level in NUMBER_LEVELS)) {
        throw this.#createInvalidLevelError(level);
      }
    });

    const currentLevels = this.#levels;
    currentLevels.length = 0;

    if (levels.length === 0) {
      return;
    }

    for (let i = 0, count = levels.length; i < count; i++) {
      const stringLevel = levels[i];
      const numberLevel = this.#stringLevelToNumber(stringLevel);

      currentLevels.push(numberLevel);
    }
  }
  //#endregion

  //#region Interface
  /** @type {ILogger['trace']} */
  async trace(message, options) {
    const level = this.#NUMBER_LEVELS.trace;
    if (!this.#canLog(level)) {
      return;
    }

    await this.#log(level, message, options);
  }

  /** @type {ILogger['debug']} */
  async debug(message, options) {
    const level = this.#NUMBER_LEVELS.debug;
    if (!this.#canLog(level)) {
      return;
    }

    await this.#log(level, message, options);
  }

  /** @type {ILogger['info']} */
  async info(message, options) {
    const level = this.#NUMBER_LEVELS.info;
    if (!this.#canLog(level)) {
      return;
    }

    await this.#log(level, message, options);
  }

  /** @type {ILogger['warn']} */
  async warn(message, options) {
    const level = this.#NUMBER_LEVELS.warn;
    if (!this.#canLog(level)) {
      return;
    }

    await this.#log(level, message, options);
  }

  /** @type {ILogger['error']} */
  async error(message, options) {
    const level = this.#NUMBER_LEVELS.error;
    if (!this.#canLog(level)) {
      return;
    }

    await this.#log(level, message, options);
  }

  /** @type {ILogger['fatal']} */
  async fatal(message, options) {
    const level = this.#NUMBER_LEVELS.fatal;
    if (!this.#canLog(level)) {
      return;
    }

    await this.#log(level, message, options);
  }
  //#endregion

  //#region Logic
  //#region Level
  /**
   * @param {LoggerStringLevel} level
   */
  #stringLevelToNumber(level) {
    return this.#NUMBER_LEVELS[level];
  }

  /**
   * @param {LoggerNumberLevel} level
   */
  #numberLevelToString(level) {
    return this.#STRING_LEVELS[level];
  }

  /**
   * @param {LoggerLevel} level
   */
  #levelToNumber(level) {
    const stringLevel = level === 'all' ? 'trace' : level;

    if (stringLevel === 'off') {
      return;
    }

    return this.#NUMBER_LEVELS[stringLevel];
  }

  /**
   * @param {LoggerLevel | LoggerNumberLevel} level
   */
  #createInvalidLevelError(level) {
    const LEVELS = this.#LEVELS;

    const levelsMessage = LEVELS.map(level => `'${level}'`).join(', ');

    return Object.assign(new Error(`Level must be: ${levelsMessage}`), {
      name: 'InvalidLevelError'
    });
  }
  //#endregion

  /**
   * @param {LoggerNumberLevel} level
   */
  #canLog(level) {
    const currentLevels = this.#levels;
    if (!currentLevels.includes(level)) {
      return false;
    }

    return true;
  }

  /**
   * @param {LoggerNumberLevel} numberLevel
   * @param {unknown} message
   * @param {LoggerOptions=} options
   */
  async #log(numberLevel, message, options) {
    const channels = this.#channels;
    if (channels == null) {
      return;
    }

    const stringLevel = this.#numberLevelToString(numberLevel);

    const promises = Object.keys(channels).reduce((acc, name) => {
      const channel = channels[name];

      acc.push(channel[stringLevel](message, options));

      return acc;
    }, /** @type {(Promise<void> | void)[]} */([]));

    await Promise.allSettled(promises);
  }
  //#endregion
}
