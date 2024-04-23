/**
 * @implements {ILogger}
 */
export default class Logger {
  /**
   * @typedef {import('./ILevel.js').LoggerLevel} LoggerLevel
   * @typedef {import('./ILevel.js').LoggerStringLevel} LoggerStringLevel
   * @typedef {import('./ILevel.js').LoggerNumberLevel} LoggerNumberLevel
   */

  /**
   * @typedef {import('./ILogger.js').LoggerProperties} LoggerProperties
   * @typedef {import('./ILogger.js').LoggerParams} LoggerParams
   */

  /**
   * @typedef {import('./ILogger.js').LoggerOptions} LoggerOptions
   */

  /**
   * @typedef {import('./ILogger.js').ILogger} ILogger
   */

  // Dependencies
  /** @type {LoggerProperties['channels']} */
  #channels;

  // Configs
  /** @type {LoggerProperties['levels']} */
  #levels;

  /** @type {LoggerProperties['channelsConfigs']} */
  #channelsConfigs;

  // Constants
  /** @type {Record<LoggerStringLevel, LoggerNumberLevel>} */
  #NUMBER_LEVELS = {
    trace: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
    fatal: 6
  };

  /** @type {Record<LoggerNumberLevel, LoggerStringLevel>} */
  #STRING_LEVELS = {
    1: 'trace',
    2: 'debug',
    3: 'info',
    4: 'warn',
    5: 'error',
    6: 'fatal'
  };

  /** @type {LoggerLevel[]} */
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

  /** @type {number} */
  #MAX_NUMBER_LEVEL = 6;

  /** @param {LoggerParams} params */
  constructor({
    channels
  }) {
    this.#channels = channels;

    this.#levels = [];
    this.#channelsConfigs = Object.keys(channels).reduce(
      (acc, name) => {
        acc[name] = {
          levels: []
        };

        return acc;
      },
      /** @type {LoggerProperties['channelsConfigs']} */({})
    );
  }

  //#region Configs
  /** @type {ILogger['setup']} */
  setup({
    level,
    levels,
    channels
  }) {
    if (level != null) {
      this.setLevel(level);
    } else if (levels != null) {
      this.setLevels(levels);
    }

    if (channels != null) {
      this.setChannelsConfigs(channels);
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
    let count = this.#MAX_NUMBER_LEVEL + 1;
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

  /** @type {ILogger['setChannels']} */
  setChannels(channels) {
    this.#channels = channels;
  }

  /** @type {ILogger['setChannelConfigs']} */
  setChannelConfigs(channelName, channelConfigs) {
    const currentChannelsConfigs = this.#channelsConfigs;

    if (currentChannelsConfigs[channelName] == null) {
      currentChannelsConfigs[channelName] = {
        levels: []
      };
    }

    const currentChannelConfigs = currentChannelsConfigs[channelName];

    if (currentChannelConfigs.levels == null) {
      currentChannelConfigs.levels = [];
    }

    const currentChannelLevels = currentChannelConfigs.levels;

    currentChannelLevels.length = 0;

    const channelLevel = channelConfigs.level;
    const channelLevels = channelConfigs.levels;
    if (channelLevel != null) {
      const LEVELS = this.#LEVELS;

      if (!LEVELS.includes(channelLevel)) {
        throw this.#createInvalidLevelError(channelLevel);
      }

      const numberLevel = this.#levelToNumber(channelLevel);

      if (numberLevel == null) {
        return;
      }

      /** @type {LoggerNumberLevel} */
      let i = numberLevel;
      let count = this.#MAX_NUMBER_LEVEL + 1;
      for (; i < count; i++) {
        currentChannelLevels.push(i);
      }
    } else if (channelLevels != null) {
      for (let i = 0, count = channelLevels.length; i < count; i++) {
        const stringLevel = channelLevels[i];
        const numberLevel = this.#stringLevelToNumber(stringLevel);

        currentChannelLevels.push(numberLevel);
      }
    }
  }

  /** @type {ILogger['setChannelsConfigs']} */
  setChannelsConfigs(channelsConfigs) {
    for (const channelName in channelsConfigs) {
      const channelConfigs = channelsConfigs[channelName];

      this.setChannelConfigs(channelName, channelConfigs)
    }
  }
  //#endregion

  //#region Interface
  /** @type {ILogger['trace']} */
  async trace(message, options) {
    await this.#log(this.#NUMBER_LEVELS.trace, message, options);
  }

  /** @type {ILogger['debug']} */
  async debug(message, options) {
    await this.#log(this.#NUMBER_LEVELS.debug, message, options);
  }

  /** @type {ILogger['info']} */
  async info(message, options) {
    await this.#log(this.#NUMBER_LEVELS.info, message, options);
  }

  /** @type {ILogger['warn']} */
  async warn(message, options) {
    await this.#log(this.#NUMBER_LEVELS.warn, message, options);
  }

  /** @type {ILogger['error']} */
  async error(message, options) {
    await this.#log(this.#NUMBER_LEVELS.error, message, options);
  }

  /** @type {ILogger['fatal']} */
  async fatal(message, options) {
    await this.#log(this.#NUMBER_LEVELS.fatal, message, options);
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
   * @param {string} channelName
   * @param {LoggerNumberLevel} numberLevel
   */
  #canChannelLog(channelName, numberLevel) {
    const channelConfigs = this.#channelsConfigs[channelName];

    const channelLevels = channelConfigs.levels;
    if (!channelLevels.includes(numberLevel)) {
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
    if (!this.#canLog(numberLevel)) {
      return;
    }

    const channels = this.#channels;
    if (channels == null) {
      return;
    }

    const stringLevel = this.#numberLevelToString(numberLevel);

    const promises = [];

    /** @type {keyof typeof channels} */
    let channelName;
    for (channelName in channels) {
      if (!this.#canChannelLog(channelName, numberLevel)) {
        continue;
      }

      const channel = channels[channelName];

      promises.push(channel[stringLevel](message, options));
    }

    await Promise.allSettled(promises);
  }
  //#endregion
}
