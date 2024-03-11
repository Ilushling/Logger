/**
 * @typedef {import('../ILevel.js').LoggerStringLevel} LoggerStringLevel
 * @typedef {import('../ILogger.js').LoggerOptions} LoggerOptions
 */

/**
 * @typedef {import('./IChannel.js').ILoggerChannel} ILoggerChannel
 * @implements {ILoggerChannel}
 */
export default class ConsoleLoggerChannel {
  /**
   * @param {Uppercase<LoggerStringLevel>} level
   * @param {any} message
   * @param {LoggerOptions=} options
   */
  #buildLoggerMessage(level, message, options) {
    const loggerMessageParts = [];

    const dateTime = (new Date()).toISOString();

    const { prefix, postfix, metadata } = options ?? {};

    const {
      organization,
      context,
      app,
      sourceClass,
      correlationId
    } = metadata ?? {};

    const label = (() => {
      if (organization != null && context != null && app != null) {
        return `${organization}.${context}.${app}`;
      }
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
   * @param {any} message
   */
  #buildMessage(message) {
    if (message == null) {
      return;
    }

    if (typeof message === 'object') {
      const plainMessage = this.#plainValue(message);

      return this.#serizalize(plainMessage);
    }

    return message;
  }

  /**
   * @param {any} value
   * @returns {any}
   */
  #plainValue(value) {
    if (value == null) {
      return value;
    }

    if (typeof value === 'object') {
      if (value instanceof Error) {
        return this.#buildErrorMessage(value);
      }

      if (value instanceof Map) {
        const object = /** @type {Record<string | number | symbol, any>} */({});

        for (const [key, el] of value) {
          const plainKey = this.#plainValue(key);
          let serializedKey = typeof plainKey === 'object' ? this.#serizalize(plainKey) : plainKey;

          object[serializedKey] = this.#plainValue(el);
        }

        return object;
      }

      if (value instanceof Set) {
        return [...value.values()].map(el => this.#plainValue(el));
      }

      if (Object.getPrototypeOf(value)?.isPrototypeOf(Object)) {
        return Object.entries(value).reduce((acc, [key, el]) => {
          acc[key] = this.#plainValue(el);

          return acc;
        }, /** @type {Record<string | number | symbol, any>} */({}));
      }

      if (Array.isArray(value)) {
        return value.map(el => this.#plainValue(el));
      }

      return value;
    }

    if (typeof value === 'bigint') {
      return +value.toString();
    }


    if (typeof value === 'symbol') {
      return value.toString();
    }

    return value;
  }

  /**
   * @param {Error} error
   */
  #buildErrorMessage(error) {
    let resultMessage = '';
    const delimiter = '\n';

    let currentError = error;
    while (currentError != null) {
      const name = error.name;
      const message = error.message;

      resultMessage += `${name}: ${message}`;

      const stack = error.stack;
      if (stack != null) {
        resultMessage += delimiter + stack;
      }

      const cause = currentError.cause;
      if (!(cause instanceof Error)) {
        break;
      }

      resultMessage += delimiter + 'Caused by: ';

      currentError = cause;
    }

    return resultMessage;
  }

  /**
   * @param {any} message
   */
  #serizalize(message) {
    return JSON.stringify(message);
  }

  /** @type {ILoggerChannel['trace']} */
  trace(message, options) {
    console.debug(this.#buildLoggerMessage('TRACE', message, options));
  }

  /** @type {ILoggerChannel['debug']} */
  debug(message, options) {
    console.debug(this.#buildLoggerMessage('DEBUG', message, options));
  }

  /** @type {ILoggerChannel['info']} */
  info(message, options) {
    console.info(this.#buildLoggerMessage('INFO', message, options));
  }

  /** @type {ILoggerChannel['warn']} */
  warn(message, options) {
    console.warn(this.#buildLoggerMessage('WARN', message, options));
  }

  /** @type {ILoggerChannel['error']} */
  error(message, options) {
    console.error(this.#buildLoggerMessage('ERROR', message, options));
  }

  /** @type {ILoggerChannel['fatal']} */
  fatal(message, options) {
    console.error(this.#buildLoggerMessage('FATAL', message, options));
  }
}
