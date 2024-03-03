/**
 * @typedef {import('./ILogger.js').Channel} Channel
 * @typedef {import('./ILogger.js').Channels} Channels
 * 
 * @typedef {import('./ILogger.js').ChannelConfigsParams} ChannelConfigsParams
 * @typedef {import('./ILogger.js').ChannelsConfigsParams} ChannelsConfigsParams
 */

/**
 * @typedef {import('./ILogger.js').Level} Level
 * @typedef {import('./ILogger.js').StringLevel} StringLevel
 * @typedef {import('./ILogger.js').NumberLevel} NumberLevel
 */

/**
 * @typedef {import('./ILogger.js').LoggerConfigsParams} LoggerConfigsParams
 * @typedef {import('./ILogger.js').LoggerProperties} LoggerProperties
 * @typedef {import('./ILogger.js').LoggerParams} LoggerParams
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

  // Const
  /** @type {Record<StringLevel, NumberLevel>} */
  #NUMBER_LEVELS = {
    trace: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
    fatal: 6
  };

  /** @type {Record<NumberLevel, StringLevel>} */
  #STRING_LEVELS = {
    1: 'trace',
    2: 'debug',
    3: 'info',
    4: 'warn',
    5: 'error',
    6: 'fatal'
  };

  /** @type {Level[]} */
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

    /** @type {NumberLevel} */
    let i = numberLevel;
    for (i = numberLevel; i < 7; i++) {
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

  /**
   * @param {Channels} channels
   */
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

      /** @type {NumberLevel} */
      let i = numberLevel;
      for (i = numberLevel; i < 7; i++) {
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
   * @param {StringLevel} level
   */
  #stringLevelToNumber(level) {
    return this.#NUMBER_LEVELS[level];
  }

  /**
   * @param {NumberLevel} level
   */
  #numberLevelToString(level) {
    return this.#STRING_LEVELS[level];
  }

  /**
   * @param {Level} level
   */
  #levelToNumber(level) {
    const stringLevel = level === 'all' ? 'trace' : level;

    if (stringLevel === 'off') {
      return;
    }

    return this.#NUMBER_LEVELS[stringLevel];
  }

  /**
   * @param {Level|NumberLevel} level
   */
  #createInvalidLevelError(level) {
    const LEVELS = this.#LEVELS;

    const levelsMessage = LEVELS.map(level => `'${level}'`).join(', ');

    return Object.assign(new Error(`Level must be: ${levelsMessage}`), {
      name: 'InvalidLevelError'
    });
  }

  /**
   * @param {unknown} message
   * @param {NumberLevel} numberLevel
   */
  async #log(message, numberLevel) {
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

      promises.push(channel[stringLevel](message));
    }

    await Promise.allSettled(promises);
  }

  /**
   * @type {ILogger['trace']}
   */
  async trace(message) {
    await this.#log(message, this.#NUMBER_LEVELS.trace);
  }

  /**
   * @type {ILogger['debug']}
   */
  async debug(message) {
    await this.#log(message, this.#NUMBER_LEVELS.debug);
  }

  /**
   * @type {ILogger['info']}
   */
  async info(message) {
    await this.#log(message, this.#NUMBER_LEVELS.info);
  }

  /**
   * @type {ILogger['warn']}
   */
  async warn(message) {
    await this.#log(message, this.#NUMBER_LEVELS.warn);
  }

  /**
   * @type {ILogger['error']}
   */
  async error(message) {
    await this.#log(message, this.#NUMBER_LEVELS.error);
  }

  /**
   * @type {ILogger['fatal']}
   */
  async fatal(message) {
    await this.#log(message, this.#NUMBER_LEVELS.fatal);
  }
}
