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
 * @typedef {import('./ILogger.js').LoggerMetadata} LoggerMetadata
 */

/**
 * @typedef {import('./ILogger.js').ILogger} ILogger
 * @implements {ILogger}
 */
export default class Logger {
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
    this.#channelsConfigs = Object.keys(channels).reduce((acc, name) => {
      acc[name] = {
        levels: []
      };

      return acc;
    }, /** @type {LoggerProperties['channelsConfigs']} */({}));
  }

  /** @type {ILogger['setup']} */
  setup({ configs }) {
    if (configs.level != null) {
      this.setLevel(configs.level);
    } else if (configs.levels != null) {
      this.setLevels(configs.levels);
    }

    if (configs.channels != null) {
      this.setChannelsConfigs(configs.channels);
    }
  }

  getLevels() {
    return this.#levels;
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

  #getChannels() {
    return this.#channels;
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
   * @param {LoggerLevel|LoggerNumberLevel} level
   */
  #createInvalidLevelError(level) {
    const LEVELS = this.#LEVELS;

    const levelsMessage = LEVELS.map(level => `'${level}'`).join(', ');

    return Object.assign(new Error(`Level must be: ${levelsMessage}`), {
      name: 'InvalidLevelError'
    });
  }

  /**
   * @param {LoggerNumberLevel} numberLevel
   * @param {unknown} message
   * @param {LoggerMetadata=} metadata
   */
  async #log(numberLevel, message, metadata) {
    const currentLevels = this.#levels;
    if (!currentLevels.includes(numberLevel)) {
      return;
    }

    const channels = this.#getChannels();
    if (channels == null) {
      return;
    }

    const stringLevel = this.#numberLevelToString(numberLevel);

    const promises = [];

    /** @type {keyof typeof channels} */
    let channelName;
    for (channelName in channels) {
      const channel = channels[channelName];
      const channelConfigs = this.#channelsConfigs[channelName];

      const channelLevels = channelConfigs.levels;
      if (!channelLevels.includes(numberLevel)) {
        continue;
      }

      promises.push(channel[stringLevel](message, metadata));
    }

    await Promise.allSettled(promises);
  }

  /** @type {ILogger['trace']} */
  async trace(message, metadata) {
    await this.#log(this.#NUMBER_LEVELS.trace, message, metadata);
  }

  /** @type {ILogger['debug']} */
  async debug(message, metadata) {
    await this.#log(this.#NUMBER_LEVELS.debug, message, metadata);
  }

  /** @type {ILogger['info']} */
  async info(message, metadata) {
    await this.#log(this.#NUMBER_LEVELS.info, message, metadata);
  }

  /** @type {ILogger['warn']} */
  async warn(message, metadata) {
    await this.#log(this.#NUMBER_LEVELS.warn, message, metadata);
  }

  /** @type {ILogger['error']} */
  async error(message, metadata) {
    await this.#log(this.#NUMBER_LEVELS.error, message, metadata);
  }

  /** @type {ILogger['fatal']} */
  async fatal(message, metadata) {
    await this.#log(this.#NUMBER_LEVELS.fatal, message, metadata);
  }
}
