/**
 * @implements {ILoggerChannel}
 */
export default class ConsoleLoggerChannel {
  /**
   * @typedef {import('./IChannel.js').ILoggerChannel} ILoggerChannel
   */

  /** @type {string} */
  #lineBreak;

  /** @type {string} */
  #lineTab;

  constructor() {
    this.#lineBreak = '\n';
    this.#lineTab = '  ';
  }

  /**
   * @typedef {import('../ILevel.js').LoggerStringLevel} LoggerStringLevel
   * @typedef {import('../ILogger.js').LoggerOptions} LoggerOptions
   */

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

  /**
   * @param {unknown} value
   * @returns {any}
   */
  #plainValue(value) {
    if (value == null) {
      return value;
    }

    const typeofValue = typeof value;

    if (typeofValue === 'object') {
      if (value instanceof Error) {
        const plainError = this.#plainError(value);

        return this.#serizalize(plainError);

        // return this.#buildErrorMessage(value);
      }

      if (value instanceof Map) {
        const object = /** @type {Record<PropertyKey, any>} */({});

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
        }, /** @type {Record<PropertyKey, any>} */({}));
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
      } else if (Object.getPrototypeOf(currentCause)?.isPrototypeOf(Object)) {
        currentError.cause = this.#plainErrorCause(
          /** @type {Record<PropertyKey, unknown>} */(currentCause)
        );

        break;
      } else {
        currentError.cause = currentCause;

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
   * @param {Record<PropertyKey, unknown>} cause
   */
  #plainErrorCause(cause) {
    return Object.entries(cause)
      .reduce((acc, [key, value]) => {
        if (value instanceof Error) {
          acc[key] = this.#plainError(value);

          return acc;
        }

        if (value != null && Object.getPrototypeOf(value)?.isPrototypeOf(Object)) {
          acc[key] = this.#plainErrorCause(/** @type {Record<PropertyKey, unknown>} */(value));

          return acc;
        }

        acc[key] = value;

        return acc;
      },
      /** @type {Record<PropertyKey, unknown>} */({})
      );
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
      if (Object.getPrototypeOf(errorCause)?.isPrototypeOf(Object)) {
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

            if (value != null && Object.getPrototypeOf(value)?.isPrototypeOf(Object)) {
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

  /**
   * @param {unknown} message
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
