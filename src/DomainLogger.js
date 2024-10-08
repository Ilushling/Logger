/**
 * @import { IDomainLogger } from './IDomainLogger.js'
 * 
 * @import { ILogger, LoggerOptions } from './ILogger.js'
 * 
 * @import {
 *  LoggerLevel,
 *  LoggerStringLevel,
 *  LoggerNumberLevel
 * } from './ILevel.js'
 */

/**
 * @typedef {new (params: DomainLoggerParams) => IDomainLogger} DomainLoggerConstructable
 * @typedef {DomainLoggerDependencies} DomainLoggerParams
 */

/**
 * @implements {IDomainLogger}
 */
export default class DomainLogger {
  /**
   * @typedef {DomainLoggerDependencies
   *  & DomainLoggerConfigs
   *  & DomainLoggerStates
   *  & DomainLoggerConstants} DomainLoggerProperties
   * 
   * @typedef {object} DomainLoggerDependencies
   * @property {ILogger | IDomainLogger} logger
   * 
   * @typedef {object} DomainLoggerConfigs
   * @property {LoggerNumberLevel[]} levels
   * @property {LoggerOptions=} options
   * 
   * @typedef {object} DomainLoggerStates
   * @property {boolean} isEnable
   * 
   * @typedef {object} DomainLoggerConstants
   * @property {Record<LoggerStringLevel, LoggerNumberLevel>} NUMBER_LEVELS
   * @property {Record<LoggerNumberLevel, LoggerStringLevel>} STRING_LEVELS
   * @property {LoggerLevel[]} LEVELS
   * @property {number} MAX_NUMBER_LEVEL
   */

  // Dependencies
  /** @type {DomainLoggerProperties['logger']} */
  #logger;

  // Configs
  /** @type {DomainLoggerProperties['levels']} */
  #levels;

  /** @type {DomainLoggerProperties['options']} */
  #options;

  // States
  /** @type {DomainLoggerProperties['isEnable']} */
  #isEnable;

  // Constants
  /** @type {DomainLoggerProperties['NUMBER_LEVELS']} */
  #NUMBER_LEVELS = {
    trace: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
    fatal: 6
  };

  /** @type {DomainLoggerProperties['STRING_LEVELS']} */
  #STRING_LEVELS = {
    1: 'trace',
    2: 'debug',
    3: 'info',
    4: 'warn',
    5: 'error',
    6: 'fatal'
  };

  /** @type {DomainLoggerProperties['LEVELS']} */
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

  /** @type {DomainLoggerProperties['MAX_NUMBER_LEVEL']} */
  #MAX_NUMBER_LEVEL = 6;

  /** @param {DomainLoggerParams} params */
  constructor({
    logger
  }) {
    this.#logger = logger;

    this.#levels = [];

    this.#isEnable = true;
  }

  //#region Configs
  /** @type {IDomainLogger['setup']} */
  setup({
    level,
    levels,
    options
  }) {
    if (level != null) {
      this.setLevel(level);
    } else if (levels != null) {
      this.setLevels(levels);
    }

    this.#options = options;
  }

  /** @type {IDomainLogger['getLevels']} */
  getLevels() {
    return this.#levels.map(level => this.#numberLevelToString(level));
  }

  /** @type {IDomainLogger['setLevel']} */
  setLevel(level) {
    const LEVELS = this.#LEVELS;

    if (!LEVELS.includes(level)) {
      throw this.#createInvalidLevelError(level);
    }

    this.#isEnable = level !== 'off';

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

  /** @type {IDomainLogger['setLevels']} */
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
      this.#isEnable = false;
      return;
    }

    this.#isEnable = true;

    for (let i = 0, count = levels.length; i < count; i++) {
      const stringLevel = levels[i];
      const numberLevel = this.#stringLevelToNumber(stringLevel);

      currentLevels.push(numberLevel);
    }
  }
  //#endregion

  //#region Interface
  /** @type {IDomainLogger['trace']} */
  async trace(message, options) {
    if (!this.#canLog(this.#NUMBER_LEVELS.trace)) {
      return;
    }

    await this.#logger.trace(message, this.#handleOptions(options));
  }

  /** @type {IDomainLogger['debug']} */
  async debug(message, options) {
    if (!this.#canLog(this.#NUMBER_LEVELS.debug)) {
      return;
    }

    await this.#logger.debug(message, this.#handleOptions(options));
  }

  /** @type {IDomainLogger['info']} */
  async info(message, options) {
    if (!this.#canLog(this.#NUMBER_LEVELS.info)) {
      return;
    }

    await this.#logger.info(message, this.#handleOptions(options));
  }

  /** @type {IDomainLogger['warn']} */
  async warn(message, options) {
    if (!this.#canLog(this.#NUMBER_LEVELS.warn)) {
      return;
    }

    await this.#logger.warn(message, this.#handleOptions(options));
  }

  /** @type {IDomainLogger['error']} */
  async error(message, options) {
    if (!this.#canLog(this.#NUMBER_LEVELS.error)) {
      return;
    }

    await this.#logger.error(message, this.#handleOptions(options));
  }

  /** @type {IDomainLogger['fatal']} */
  async fatal(message, options) {
    if (!this.#canLog(this.#NUMBER_LEVELS.fatal)) {
      return;
    }

    await this.#logger.fatal(message, this.#handleOptions(options));
  }
  //#endregion

  //#region Logic
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

  /**
   * @param {LoggerOptions=} options
   */
  #handleOptions(options) {
    const currentOptions = this.#options;

    if (currentOptions == null) {
      return options;
    }

    const newOptions = Object.assign({}, currentOptions, options);

    if (newOptions.metadata != null) {
      newOptions.metadata = Object.assign({}, currentOptions.metadata, options?.metadata);
    }

    return newOptions;
  }

  /**
   * @param {LoggerNumberLevel} level
   */
  #canLog(level) {
    if (!this.#isEnable) {
      return false;
    }

    const currentLevels = this.#levels;
    if (currentLevels.length > 0 && !currentLevels.includes(level)) {
      return false;
    }

    return true;
  }
  //#endregion
}
