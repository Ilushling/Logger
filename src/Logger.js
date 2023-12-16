/**
 * @typedef {Record<StringLevel, (message: unknown) => any>} Channel
 * @typedef {Channel[]} Channels
 */

/**
 * @typedef {'all'|'trace'|'debug'|'info'|'warn'|'error'|'fatal'|'off'} Level
 */

/**
 * @typedef {object} LoggerParams
 * @property {Channels} channels
 * 
 * @property {Level} level
 */
export default class Logger {
  /**
   * @typedef {'trace'|'debug'|'info'|'warn'|'error'|'fatal'} StringLevel
   * @typedef {1|2|3|4|5|6} NumberLevel
   */

  /** @type {Channels} */
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

  /** @param {LoggerParams} params */
  constructor({
    channels,

    level = 'off'
  }) {
    this.#channels = channels;

    this.setLevel(level);
  }

  /**
   * @param {'all'|StringLevel|'off'} level
   */
  setLevel(level) {
    const stringLevels = ['all', 'trace', 'debug', 'info', 'warn', 'error', 'fatal', 'off'];
    if (typeof level !== 'string' || !stringLevels.includes(level)) {
      const levelsMessage = stringLevels.map(level => `'${level}'`).join(', ');
      throw Object.assign(new Error(`Level must be: ${levelsMessage}`), {
        name: 'InvalidLevelError'
      });
    }

    if (level === 'off') {
      // this.#stringLevel = undefined;
      this.#numberLevel = undefined;
      return;
    }

    /** @type {StringLevel} */
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
    if (channels == null || channels.length === 0) {
      return;
    }

    const stringLevel = this.#numberLevelToString(numberLevel);

    await Promise.allSettled(channels.map(channel => channel[stringLevel](message)));
  }

  /**
   * @param {unknown} message
   */
  async trace(message) {
    await this.#log(message, 1);
  }

  /**
   * @param {unknown} message
   */
  async debug(message) {
    await this.#log(message, 2);
  }

  /**
   * @param {unknown} message
   */
  async info(message) {
    await this.#log(message, 3);
  }

  /**
   * @param {unknown} message
   */
  async warn(message) {
    await this.#log(message, 4);
  }

  /**
   * @param {unknown} message
   */
  async error(message) {
    await this.#log(message, 5);
  }

  /**
   * @param {unknown} message
   */
  async fatal(message) {
    await this.#log(message, 6);
  }
}
