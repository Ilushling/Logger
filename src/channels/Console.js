/**
 * @typedef {new () => ILoggerChannel} ConsoleLoggerChannelConstructable
 */

/**
 * @implements {ILoggerChannel}
 */
export default class ConsoleLoggerChannel {
  /**
   * @typedef {import('./IChannel.js').ILoggerChannel} ILoggerChannel
   * 
   * @typedef {ConsoleLoggerChannelConfigs & ConsoleLoggerChannelConstants} ConsoleLoggerChannelProperties
   * 
   * @typedef {object} ConsoleLoggerChannelConfigs
   * @property {LoggerNumberLevel[]} levels
   * @property {boolean} isMask
   * 
   * @typedef {object} ConsoleLoggerChannelConstants
   * @property {string} lineBreak
   * @property {string} lineTab
   * @property {Record<LoggerStringLevel, LoggerNumberLevel>} NUMBER_LEVELS
   * @property {Record<LoggerNumberLevel, LoggerStringLevel>} STRING_LEVELS
   * @property {LoggerLevel[]} LEVELS
   * @property {LoggerNumberLevel} MAX_NUMBER_LEVEL
   */

  /**
   * @typedef {import('../ILevel.js').LoggerLevel} LoggerLevel
   * @typedef {import('../ILevel.js').LoggerStringLevel} LoggerStringLevel
   * @typedef {import('../ILevel.js').LoggerNumberLevel} LoggerNumberLevel
   */

  /**
   * @typedef {import('../ILogger.js').LoggerOptions} LoggerOptions
   */

  // Configs
  /** @type {ConsoleLoggerChannelProperties['levels']} */
  #levels;

  /** @type {ConsoleLoggerChannelProperties['isMask']} */
  #isMask;

  // Constants
  /** @type {ConsoleLoggerChannelProperties['lineBreak']} */
  #lineBreak;

  /** @type {ConsoleLoggerChannelProperties['lineTab']} */
  #lineTab;

  /** @type {ConsoleLoggerChannelProperties['NUMBER_LEVELS']} */
  #NUMBER_LEVELS = {
    trace: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
    fatal: 6
  };

  /** @type {ConsoleLoggerChannelProperties['STRING_LEVELS']} */
  #STRING_LEVELS = {
    1: 'trace',
    2: 'debug',
    3: 'info',
    4: 'warn',
    5: 'error',
    6: 'fatal'
  };

  /** @type {ConsoleLoggerChannelProperties['LEVELS']} */
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

  /** @type {ConsoleLoggerChannelProperties['MAX_NUMBER_LEVEL']} */
  #MAX_NUMBER_LEVEL = 6;

  constructor() {
    this.#levels = [];
    this.#isMask = false;

    this.#lineBreak = '\n';
    this.#lineTab = '  ';
  }

  /** @type {ILoggerChannel['setup']} */
  setup({ level, levels, isMask }) {
    if (level != null) {
      this.setLevel(level);
    } else if (levels != null) {
      this.setLevels(levels);
    }

    this.#isMask = isMask;
  }

  //#region Interface
  /** @type {ILoggerChannel['trace']} */
  trace(message, options) {
    if (!this.#canLog(this.#NUMBER_LEVELS.trace)) {
      return;
    }

    console.debug(this.#buildLoggerMessage('TRACE', message, options));
  }

  /** @type {ILoggerChannel['debug']} */
  debug(message, options) {
    if (!this.#canLog(this.#NUMBER_LEVELS.debug)) {
      return;
    }

    console.debug(this.#buildLoggerMessage('DEBUG', message, options));
  }

  /** @type {ILoggerChannel['info']} */
  info(message, options) {
    if (!this.#canLog(this.#NUMBER_LEVELS.info)) {
      return;
    }

    console.info(this.#buildLoggerMessage('INFO', message, options));
  }

  /** @type {ILoggerChannel['warn']} */
  warn(message, options) {
    if (!this.#canLog(this.#NUMBER_LEVELS.warn)) {
      return;
    }

    console.warn(this.#buildLoggerMessage('WARN', message, options));
  }

  /** @type {ILoggerChannel['error']} */
  error(message, options) {
    if (!this.#canLog(this.#NUMBER_LEVELS.error)) {
      return;
    }

    console.error(this.#buildLoggerMessage('ERROR', message, options));
  }

  /** @type {ILoggerChannel['fatal']} */
  fatal(message, options) {
    if (!this.#canLog(this.#NUMBER_LEVELS.fatal)) {
      return;
    }

    console.error(this.#buildLoggerMessage('FATAL', message, options));
  }
  //#endregion

  //#region Configs
  /** @type {ILoggerChannel['getLevels']} */
  getLevels() {
    return this.#levels.map(level => this.#numberLevelToString(level));
  }

  /** @type {ILoggerChannel['setLevel']} */
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

  /** @type {ILoggerChannel['setLevels']} */
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

  //#region Message
  /**
   * @param {Uppercase<LoggerStringLevel>} level
   * @param {unknown} message
   * @param {LoggerOptions=} options
   */
  #buildLoggerMessage(level, message, options) {
    const loggerMessageParts = [];

    const currentDate = new Date();
    const dateTime = currentDate.toISOString();

    const { prefix, postfix, metadata } = options ?? {};

    const {
      organization,
      context,
      app,
      sourceClass,
      correlationId
    } = metadata ?? {};

    const label = (() => {
      const parts = [];

      if (organization != null) {
        parts.push(organization);
      }
      if (context != null) {
        parts.push(context);
      }
      if (app != null) {
        parts.push(app);
      }

      return parts.join('.');
    })();

    if (label != null) {
      loggerMessageParts.push(`[${label}]`);
    }

    loggerMessageParts.push(dateTime);

    if (correlationId != null) {
      loggerMessageParts.push(`(${correlationId})`);
    }

    if (level != null) {
      loggerMessageParts.push(level);
    }

    if (sourceClass != null) {
      loggerMessageParts.push(`[${sourceClass}]`);
    }

    if (prefix != null) {
      loggerMessageParts.push(this.#buildMessage(prefix));
    }

    if (message != null) {
      loggerMessageParts.push(this.#buildMessage(message));
    }

    if (postfix != null) {
      loggerMessageParts.push(this.#buildMessage(postfix));
    }

    return loggerMessageParts.join(' ');
  }

  /**
   * @param {unknown} message
   */
  #buildMessage(message) {
    if (message == null) {
      return message;
    }

    if (typeof message === 'object') {
      const plainMessage = this.#plainValue(message);

      return this.#serizalize(plainMessage);
    }

    return message;
  }
  //#endregion

  //#region Plain
  /**
   * @param {unknown} value
   * @returns {unknown}
   */
  #plainValue(value) {
    if (value == null) {
      return value;
    }

    const typeofValue = typeof value;

    if (typeofValue === 'object') {
      if (value instanceof Error) {
        return this.#plainError(value);
      }

      if (value instanceof Map) {
        const object = /** @type {Record<PropertyKey, unknown>} */({});

        for (const [key, el] of value) {
          const plainKey = this.#plainValue(key);

          const serializedKey = typeof plainKey === 'object'
            ? this.#serizalize(plainKey)
            : `${plainKey}`;

          object[serializedKey] = this.#plainValue(el);
        }

        return object;
      }

      if (value instanceof Set) {
        return [...value.values()].map(el => this.#plainValue(el));
      }

      if (this.#isModel(value)) {
        return this.#plainModel(value);
      }

      if (this.#isPlainObject(value)) {
        return Object.entries(value).reduce((acc, [key, el]) => {
          acc[key] = this.#plainValue(el);

          return acc;
        }, /** @type {Record<PropertyKey, unknown>} */({}));
      }

      if (Array.isArray(value)) {
        return value.map(el => this.#plainValue(el));
      }

      return value;
    }

    if (typeofValue === 'bigint') {
      return +value.toString();
    }

    if (typeofValue === 'symbol') {
      return value.toString();
    }

    return value;
  }

  /**
   * @typedef {{ getProperties?: function(): unknown; getMaskedProperties?: function(): unknown; }} Model
   * @param {unknown} value
   * @returns {value is Model}
   */
  #isModel(value) {
    if (value == null) {
      return false;
    }

    if (typeof value !== 'object') {
      return false;
    }

    return 'getProperties' in value && typeof value.getProperties === 'function'
      && 'getMaskedProperties' in value && typeof value.getMaskedProperties === 'function'
  }

  /**
   * @param {Model} model
   */
  #plainModel(model) {
    const isMask = this.#getIsMask();

    if (isMask) {
      return model.getMaskedProperties?.();
    }

    return model.getProperties?.();
  }

  #getIsMask() {
    return this.#isMask;
  }

  //#region Plain error
  /**
   * @typedef {{
   *  name: string;
   *  message: string;
   *  stack?: string;
   *  cause?: unknown;
   * }} PlainError
   * @param {Error} error
   */
  #plainError(error) {
    let currentError = this.#plainErrorObject(error);

    const result = currentError;
    let currentCause = currentError.cause;

    while (currentCause != null) {
      if (currentCause instanceof Error) {
        const currentErrorCause = this.#plainErrorObject(currentCause);

        currentError.cause = currentErrorCause;

        currentError = currentErrorCause;
        currentCause = currentError.cause;
      } else {
        currentError.cause = this.#plainValue(currentCause);

        break;
      }
    }

    return result;
  }

  /**
   * @param {Error} error
   * @returns {PlainError}
   */
  #plainErrorObject(error) {
    /** @type {PlainError} */
    const result = {
      name: error.name,
      message: error.message
    };
    'stack' in error && (result.stack = error.stack);
    'cause' in error && (result.cause = error.cause);

    return result;
  }

  /**
   * @param {unknown} value
   */
  #isPlainObject(value) {
    if (value == null) {
      return false;
    }

    if (!Object.getPrototypeOf(value)?.isPrototypeOf(Object)) {
      return false;
    }

    return true;
  }
  //#endregion
  //#endregion

  /**
   * @param {unknown} message
   */
  #serizalize(message) {
    return JSON.stringify(message);
  }

  /**
   * @param {Error} error
   */
  #buildErrorMessage(error) {
    let result = '';

    const lineBreak = this.#lineBreak;
    const lineTab = this.#lineTab;

    const {
      name,
      message,
      stack
    } = error;

    result += `${name}: ${message}`;
    stack != null && (result += `${lineBreak}${lineTab}${stack}`);

    if ('cause' in error) {
      result += this.#buildErrorCauseMessage(error.cause);
    }

    return result;
  }

  /**
   * @param {unknown} errorCause
   */
  #buildErrorCauseMessage(errorCause) {
    const lineBreak = this.#lineBreak;
    const lineTab = this.#lineTab;

    let result = lineBreak + 'Caused by: ';

    if (errorCause == null) {
      return result;
    }

    const isError = typeof errorCause === 'object'
      && 'name' in errorCause
      && 'message' in errorCause
      && 'stack' in errorCause;

    if (isError) {
      const {
        name,
        message,
        stack
      } = /** @type {Error} */ (errorCause);

      result += `${name}: ${message}`;
      stack != null && (result += `${lineBreak}${lineTab}${stack}`);

      if ('cause' in errorCause) {
        result += this.#buildErrorCauseMessage(errorCause.cause);
      }
    } else {
      if (this.#isPlainObject(errorCause)) {
        return this.#serizalize(Object.entries(errorCause)
          .reduce((acc, [key, value]) => {
            const isError = typeof value === 'object'
              && 'name' in value
              && 'message' in value
              && 'stack' in value;

            if (isError) {
              acc[key] = this.#plainError(value);

              return acc;
            }

            if (this.#isPlainObject(value)) {
              acc[key] = this.#buildErrorCauseMessage(
                /** @type {Record<PropertyKey, unknown>} */(value)
              );

              return acc;
            }

            acc[key] = value;

            return acc;
          },
          /** @type {Record<PropertyKey, unknown>} */({})
          ));
      } else {
        result += errorCause;
      }
    }

    return result;
  }
  //#endregion
}
