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
 * @typedef {{
 *  channel: Channel,
 *  level?: Level,
 *  levels?: Level[]
 * }} ChannelParams
 * 
 * @typedef {Record<string, ChannelParams>} Channels
 */

/**
 * @typedef {'all'|StringLevel|'off'} Level
 */

/**
 * @typedef {object} LoggerParams
 * @property {Channels=} channels
 * 
 * @property {Level=} level
 */
export default class Logger {
  /**
   * @typedef {'trace'|'debug'|'info'|'warn'|'error'|'fatal'} StringLevel
   * @typedef {1|2|3|4|5|6} NumberLevel
   */

  /** @type {Channels=} */
  #channels;

  /** @type {StringLevel=} */
  // #stringLevel;

  /** @type {NumberLevel=} */
  #numberLevel;

  /** @type {Record<StringLevel, NumberLevel>} */
  #numberLevels = {
    trace: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
    fatal: 6
  };

  /** @type {Record<NumberLevel, StringLevel>} */
  #stringLevels = {
    1: 'trace',
    2: 'debug',
    3: 'info',
    4: 'warn',
    5: 'error',
    6: 'fatal'
  };

  /** @type {Level[]} */
  #levels = [
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
    channels,

    level = 'off'
  } = {}) {
    this.#channels = channels;

    this.setLevel(level);
  }

  /**
   * @param {Level} level
   */
  setLevel(level) {
    const levels = this.#levels;

    if (typeof level !== 'string' || !levels.includes(level)) {
      this.#throwInvalidLevelError(level);
    }

    if (level === 'off') {
      // this.#stringLevel = undefined;
      this.#numberLevel = undefined;
      return;
    }

    const stringLevel = level === 'all' ? 'trace' : level;

    // this.#stringLevel = stringLevel;
    this.#numberLevel = this.#stringLevelToNumber(stringLevel);
  }

  #getNumberLevel() {
    return this.#numberLevel;
  }

  /**
   * @param {StringLevel} level
   */
  #stringLevelToNumber(level) {
    return this.#numberLevels[level];
  }

  /**
   * @param {NumberLevel} level
   */
  #numberLevelToString(level) {
    return this.#stringLevels[level];
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

  /**
   * @param {string} channelName
   */
  #getChannel(channelName) {
    const channels = this.#getChannels();
    if (channels == null) {
      return;
    }

    return channels[channelName];
  }

  /**
   * @param {string} channelName
   * @param {Level} level
   */
  setChannelLevel(channelName, level) {
    const validLevels = this.#levels;

    if (typeof level !== 'string' || !validLevels.includes(level)) {
      this.#throwInvalidLevelError(level);
    }

    const channel = this.#getChannel(channelName);

    if (channel == null) {
      return;
    }

    channel.level = level;
  }

  /**
   * @param {string} channelName
   * @param {Level[]} levels
   */
  setChannelLevels(channelName, levels) {
    const validLevels = this.#levels;

    for (const level of levels) {
      if (typeof level !== 'string' || !validLevels.includes(level)) {
        this.#throwInvalidLevelError(level);
      }
    }

    const channel = this.#getChannel(channelName);

    if (channel == null) {
      return;
    }

    channel.levels = levels;
  }


  /**
   * @param {unknown} message
   * @param {NumberLevel} numberLevel
   */
  async #log(message, numberLevel) {
    const currentNumberLevel = this.#getNumberLevel();
    if (currentNumberLevel == null) {
      return;
    }

    if (numberLevel < currentNumberLevel) {
      return;
    }

    const channels = this.#getChannels();
    if (channels == null) {
      return;
    }

    const stringLevel = this.#numberLevelToString(numberLevel);

    let promises = [];

    /** @type {keyof typeof channels} */
    let key;
    for (key in channels) {
      const channel = channels[key];

      let channelLevel = channel.level;

      if (channelLevel != null) {
        if (channelLevel === 'off') {
          continue;
        }

        const channelStringLevel = channelLevel === 'all' ? 'trace' : channelLevel;

        const channelNumberLevel = this.#stringLevelToNumber(channelStringLevel);

        if (numberLevel < channelNumberLevel) {
          continue;
        }
      } else if (!channel.levels?.includes(stringLevel)) {
        continue;
      }

      promises.push(channel.channel[stringLevel](message));
    }

    await Promise.allSettled(promises);
  }

  /**
   * @param {unknown} message
   */
  async trace(message) {
    await this.#log(message, this.#numberLevels.trace);
  }

  /**
   * @param {unknown} message
   */
  async debug(message) {
    await this.#log(message, this.#numberLevels.debug);
  }

  /**
   * @param {unknown} message
   */
  async info(message) {
    await this.#log(message, this.#numberLevels.info);
  }

  /**
   * @param {unknown} message
   */
  async warn(message) {
    await this.#log(message, this.#numberLevels.warn);
  }

  /**
   * @param {unknown} message
   */
  async error(message) {
    await this.#log(message, this.#numberLevels.error);
  }

  /**
   * @param {unknown} message
   */
  async fatal(message) {
    await this.#log(message, this.#numberLevels.fatal);
  }

  /**
   * @param {string} level
   */
  #throwInvalidLevelError(level) {
    const levels = this.#levels;

    const levelsMessage = levels.map(level => `'${level}'`).join(', ');

    throw Object.assign(new Error(`Level must be: ${levelsMessage}`), {
      name: 'InvalidLevelError'
    });
  }
}
